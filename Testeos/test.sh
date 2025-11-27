#!/bin/bash

# ============================================================================
# Script de Pruebas Automatizadas - Sistema de Registro de Eventos
# Proyecto: La Pica De La Isa
# ============================================================================

# NO detener en errores - queremos ver todos los resultados
# set -e  

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URLs base
USER_API="http://localhost:3000/user/api"
EVENT_API="http://localhost:3000/event/api"

# Variables globales
TOKEN=""
USER_ID=""
EVENT_ID=""

# ============================================================================
# FUNCIONES DE UTILIDAD
# ============================================================================

print_header() {
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ ERROR: $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Función para generar datos aleatorios
generate_random_string() {
    cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 8 | head -n 1
}

# ============================================================================
# FUNCIONES DE PRUEBA
# ============================================================================

# Test 1: Registro de usuario
test_register_user() {
    print_header "TEST 1: REGISTRO DE USUARIO"
    
    local timestamp=$(date +%s)
    local random_str=$(generate_random_string)
    
    USERNAME="testuser_${random_str}"
    EMAIL="test_${random_str}@example.com"
    PASSWORD="Test123456"
    NAME="Test"
    LASTNAME="User"
    
    print_info "Registrando usuario: $USERNAME"
    print_info "Email: $EMAIL"
    print_info "Password: $PASSWORD"
    
    local response=$(curl -s -w "\n%{http_code}" -X POST "${USER_API}/register" \
        -H "Content-Type: application/json" \
        -d '{
            "username": "'$USERNAME'",
            "name": "'$NAME'",
            "lastname": "'$LASTNAME'",
            "email": "'$EMAIL'",
            "password": "'$PASSWORD'"
        }')
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response Body:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    
    if [ "$status_code" -eq 200 ] || [ "$status_code" -eq 201 ]; then
        print_success "Usuario registrado exitosamente"
        # Intentar extraer el ID del usuario si está disponible
        USER_ID=$(echo "$body" | jq -r '._id // .id // .user._id // .user.id // empty' 2>/dev/null)
        if [ -n "$USER_ID" ]; then
            print_info "User ID extraído: $USER_ID"
        fi
        return 0
    else
        print_error "Falló el registro (Status: $status_code)"
        return 1
    fi
}

# Test 2: Login de usuario
test_login_user() {
    print_header "TEST 2: INICIO DE SESIÓN"
    
    print_info "Intentando login con:"
    print_info "Email: $EMAIL"
    print_info "Password: $PASSWORD"
    
    local response=$(curl -s -w "\n%{http_code}" -X POST "${USER_API}/login" \
        -H "Content-Type: application/json" \
        -c cookies.txt \
        -d '{
            "email": "'$EMAIL'",
            "password": "'$PASSWORD'"
        }')
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response Body:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    
    if [ "$status_code" -eq 200 ]; then
        # Extraer token de la cookie
        if [ -f cookies.txt ]; then
            echo "Contenido de cookies.txt:"
            cat cookies.txt
            TOKEN=$(grep -oP 'token\s+\K[^\s]+' cookies.txt 2>/dev/null || echo "")
        fi
        
        # Si no se obtuvo de la cookie, intentar extraer del body
        if [ -z "$TOKEN" ]; then
            TOKEN=$(echo "$body" | jq -r '.token // empty' 2>/dev/null)
        fi
        
        # Extraer ID de usuario
        if [ -z "$USER_ID" ]; then
            USER_ID=$(echo "$body" | jq -r '._id // .id // .userId // .user._id // .user.id // empty' 2>/dev/null)
        fi
        
        if [ -n "$TOKEN" ]; then
            print_success "Login exitoso - Token obtenido"
            print_info "Token: ${TOKEN:0:50}..."
            [ -n "$USER_ID" ] && print_info "User ID: $USER_ID"
            return 0
        else
            print_error "Login exitoso pero no se obtuvo token"
            print_info "Revisando si el token está en las cookies..."
            [ -f cookies.txt ] && cat cookies.txt
            return 1
        fi
    else
        print_error "Falló el login (Status: $status_code)"
        return 1
    fi
}

# Test 3: Verificar token
test_verify_token() {
    print_header "TEST 3: VERIFICACIÓN DE TOKEN"
    
    if [ -z "$TOKEN" ]; then
        print_error "No hay token disponible"
        return 1
    fi
    
    local response=$(curl -s -w "\n%{http_code}" -X GET "${USER_API}/verify" \
        -H "Cookie: token=$TOKEN" \
        -b cookies.txt)
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response Body:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    
    if [ "$status_code" -eq 200 ]; then
        print_success "Token válido"
        
        # Extraer USER_ID si aún no lo tenemos
        if [ -z "$USER_ID" ]; then
            USER_ID=$(echo "$body" | jq -r '.id // ._id // .userId // .user.id // .user._id // empty' 2>/dev/null)
            if [ -n "$USER_ID" ]; then
                print_info "User ID extraído de verify: $USER_ID"
            fi
        fi
        return 0
    else
        print_error "Token inválido (Status: $status_code)"
        return 1
    fi
}

# Test 4: Crear evento
test_create_event() {
    print_header "TEST 4: CREAR EVENTO"
    
    if [ -z "$TOKEN" ]; then
        print_error "No hay token disponible"
        return 1
    fi
    
    if [ -z "$USER_ID" ]; then
        print_error "No hay USER_ID disponible. Se necesita para crear eventos."
        return 1
    fi
    
    local event_title="Evento de Prueba $(date +%Y%m%d_%H%M%S)"
    local event_date=$(date -d "+7 days" +%Y-%m-%dT%H:%M:%S.000Z)
    
    print_info "Creando evento: $event_title"
    print_info "Fecha del evento: $event_date"
    print_info "USER_ID: $USER_ID"
    
    # Construir el JSON correctamente
    local json_payload=$(cat <<EOF
{
  "title": "$event_title",
  "note": "Este es un evento de prueba automatizada del script de testing",
  "date": "$event_date",
  "status": "init",
  "firstPay": false,
  "secondPay": false
}
EOF
)
    
    # CORREGIDO: endpoint sin el USER_ID en la ruta
    local endpoint="${EVENT_API}/eventuser"
    print_info "Endpoint: $endpoint"
    
    echo "Payload JSON:"
    echo "$json_payload" | jq '.' 2>/dev/null || echo "$json_payload"
    
    local response=$(curl -s -w "\n%{http_code}" -X POST "$endpoint" \
        -H "Content-Type: application/json" \
        -H "Cookie: token=$TOKEN" \
        -b cookies.txt \
        -d "$json_payload")
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response Body:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    
    if [ "$status_code" -eq 200 ] || [ "$status_code" -eq 201 ]; then
        EVENT_ID=$(echo "$body" | jq -r '._id // .id // .eventId // .event._id // .event.id // empty' 2>/dev/null)
        print_success "Evento creado exitosamente"
        [ -n "$EVENT_ID" ] && print_info "Event ID: $EVENT_ID"
        return 0
    else
        print_error "Falló la creación del evento (Status: $status_code)"
        return 1
    fi
}

# Test 5: Obtener eventos del usuario
test_get_user_events() {
    print_header "TEST 5: OBTENER EVENTOS DEL USUARIO"
    
    if [ -z "$TOKEN" ]; then
        print_error "No hay token disponible"
        return 1
    fi
    
    # CORREGIDO: usar /eventusers (plural) para obtener todos
    local response=$(curl -s -w "\n%{http_code}" -X GET "${EVENT_API}/eventusers" \
        -H "Cookie: token=$TOKEN" \
        -b cookies.txt)
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response Body:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    
    if [ "$status_code" -eq 200 ]; then
        local event_count=$(echo "$body" | jq '. | length' 2>/dev/null || echo "0")
        print_success "Eventos obtenidos: $event_count"
        return 0
    else
        print_error "Falló la obtención de eventos (Status: $status_code)"
        return 1
    fi
}

# Test 6: Actualizar evento
test_update_event() {
    print_header "TEST 6: ACTUALIZAR EVENTO"
    
    if [ -z "$TOKEN" ] || [ -z "$EVENT_ID" ]; then
        print_error "No hay token o ID de evento disponible"
        print_info "TOKEN: ${TOKEN:0:20}..."
        print_info "EVENT_ID: $EVENT_ID"
        return 1
    fi
    
    print_info "Actualizando evento: $EVENT_ID"
    
    # Construir JSON correctamente
    local json_payload=$(cat <<EOF
{
  "title": "Evento Actualizado - Testing",
  "note": "Nota actualizada por prueba automatizada",
  "status": "inProgress",
  "firstPay": true
}
EOF
)
    
    echo "Payload JSON:"
    echo "$json_payload" | jq '.' 2>/dev/null || echo "$json_payload"
    
    # CORREGIDO: usar /eventuser/:id
    local response=$(curl -s -w "\n%{http_code}" -X PUT "${EVENT_API}/eventuser/${EVENT_ID}" \
        -H "Content-Type: application/json" \
        -H "Cookie: token=$TOKEN" \
        -b cookies.txt \
        -d "$json_payload")
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    echo "Response Body:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    
    if [ "$status_code" -eq 200 ]; then
        print_success "Evento actualizado exitosamente"
        return 0
    else
        print_error "Falló la actualización del evento (Status: $status_code)"
        return 1
    fi
}

# Test 7: Eliminar evento
test_delete_event() {
    print_header "TEST 7: ELIMINAR EVENTO"
    
    if [ -z "$TOKEN" ] || [ -z "$EVENT_ID" ]; then
        print_error "No hay token o ID de evento disponible"
        return 1
    fi
    
    print_info "Eliminando evento: $EVENT_ID"
    
    # CORREGIDO: usar /eventuser/:id
    local response=$(curl -s -w "\n%{http_code}" -X DELETE "${EVENT_API}/eventuser/${EVENT_ID}" \
        -H "Cookie: token=$TOKEN" \
        -b cookies.txt)
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    echo "Status Code: $status_code"
    if [ -n "$body" ]; then
        echo "Response Body:"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    fi
    
    if [ "$status_code" -eq 200 ] || [ "$status_code" -eq 204 ]; then
        print_success "Evento eliminado exitosamente"
        return 0
    else
        print_error "Falló la eliminación del evento (Status: $status_code)"
        return 1
    fi
}

# Test 8: Logout
test_logout() {
    print_header "TEST 8: CERRAR SESIÓN"
    
    if [ -z "$TOKEN" ]; then
        print_error "No hay token disponible"
        return 1
    fi
    
    local response=$(curl -s -w "\n%{http_code}" -X POST "${USER_API}/logout" \
        -H "Cookie: token=$TOKEN" \
        -b cookies.txt)
    
    local body=$(echo "$response" | head -n -1)
    local status_code=$(echo "$response" | tail -n 1)
    
    if [ "$status_code" -eq 200 ]; then
        print_success "Logout exitoso"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
        return 0
    else
        print_error "Falló el logout (Status: $status_code)"
        echo "$body"
        return 1
    fi
}

# ============================================================================
# FUNCIÓN PRINCIPAL
# ============================================================================

main() {
    print_header "INICIANDO PRUEBAS AUTOMATIZADAS"
    echo ""
    
    local tests_passed=0
    local tests_failed=0
    
    # Verificar dependencias
    if ! command -v curl &> /dev/null; then
        print_error "curl no está instalado"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        print_info "jq no está instalado - la salida será menos legible"
    fi
    
    # Ejecutar pruebas con manejo de errores mejorado
    echo ""
    
    if test_register_user; then 
        ((tests_passed++))
    else 
        ((tests_failed++))
        print_error "Deteniendo pruebas debido a fallo en registro"
        exit 1
    fi
    echo ""
    sleep 2
    
    if test_login_user; then 
        ((tests_passed++))
    else 
        ((tests_failed++))
        print_error "Deteniendo pruebas debido a fallo en login"
        print_info "Credenciales usadas - Email: $EMAIL, Password: $PASSWORD"
        exit 1
    fi
    echo ""
    sleep 2
    
    if test_verify_token; then 
        ((tests_passed++))
    else 
        ((tests_failed++))
        print_error "Token no válido, continuando con pruebas..."
    fi
    echo ""
    sleep 2
    
    if test_create_event; then 
        ((tests_passed++))
    else 
        ((tests_failed++))
        print_error "No se pudo crear evento, pero continuando..."
    fi
    echo ""
    sleep 2
    
    if test_get_user_events; then 
        ((tests_passed++))
    else 
        ((tests_failed++))
    fi
    echo ""
    sleep 2
    
    if [ -n "$EVENT_ID" ]; then
        if test_update_event; then 
            ((tests_passed++))
        else 
            ((tests_failed++))
        fi
        echo ""
        sleep 2
        
        if test_delete_event; then 
            ((tests_passed++))
        else 
            ((tests_failed++))
        fi
        echo ""
        sleep 2
    else
        print_info "Saltando tests de actualización/eliminación (no hay EVENT_ID)"
        ((tests_failed+=2))
    fi
    
    if test_logout; then 
        ((tests_passed++))
    else 
        ((tests_failed++))
    fi
    echo ""
    
    # Resumen
    print_header "RESUMEN DE PRUEBAS"
    echo -e "Tests ejecutados: $((tests_passed + tests_failed))"
    echo -e "${GREEN}Tests exitosos: $tests_passed${NC}"
    echo -e "${RED}Tests fallidos: $tests_failed${NC}"
    echo ""
    
    # Mostrar información de debug
    print_info "Variables finales:"
    echo "  USERNAME: $USERNAME"
    echo "  EMAIL: $EMAIL"
    echo "  USER_ID: $USER_ID"
    echo "  TOKEN: ${TOKEN:0:30}..."
    echo "  EVENT_ID: $EVENT_ID"
    echo ""
    
    # Limpiar archivos temporales
    rm -f cookies.txt
    
    if [ $tests_failed -eq 0 ]; then
        print_success "TODAS LAS PRUEBAS PASARON"
        exit 0
    else
        print_error "ALGUNAS PRUEBAS FALLARON"
        exit 1
    fi
}

# Ejecutar script
main