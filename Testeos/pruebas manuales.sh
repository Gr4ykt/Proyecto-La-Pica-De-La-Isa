################################################################################
# PRUEBAS MANUALES CON CURL - SISTEMA DE REGISTRO DE EVENTOS
# Proyecto: La Pica De La Isa
################################################################################

# IMPORTANTE: Reemplaza las variables según tus resultados:
# - USER_EMAIL
# - USER_PASSWORD
# - TOKEN
# - USER_ID
# - EVENT_ID

################################################################################
# 1. HEALTH CHECK
################################################################################

echo "=== TEST 1: Health Check ==="
curl -X GET http://localhost:3000/user/api/hello

curl -X GET http://localhost:3000/event/api/hello

################################################################################
# 2. REGISTRO DE USUARIO
################################################################################

echo "=== TEST 2: Registro de Usuario ==="
curl -X POST http://localhost:3000/user/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser_manual",
    "name": "Test",
    "lastname": "Manual",
    "email": "testmanual@example.com",
    "password": "Test123456"
  }' | jq '.'

# Resultado esperado:
# {
#   "message": "User created successfully"
# }

################################################################################
# 3. INICIO DE SESIÓN
################################################################################

echo "=== TEST 3: Login ==="
curl -X POST http://localhost:3000/user/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "testmanual@example.com",
    "password": "Test123456"
  }' | jq '.'

# Resultado esperado:
# {
#   "message": "Login successfully"
# }

# El token se guarda automáticamente en cookies.txt
echo "=== Token guardado en cookies.txt ==="
cat cookies.txt

################################################################################
# 4. VERIFICAR TOKEN
################################################################################

echo "=== TEST 4: Verificar Token ==="
curl -X GET http://localhost:3000/user/api/verify \
  -b cookies.txt | jq '.'

# Resultado esperado:
# {
#   "id": "69248fd9347950e046694c48",
#   "username": "testuser_manual",
#   "email": "testmanual@example.com"
# }

# GUARDA EL USER_ID DEL RESULTADO ANTERIOR
USER_ID="69248fd9347950e046694c48"  # ← Reemplaza con tu ID

################################################################################
# 5. CREAR EVENTO
################################################################################

echo "=== TEST 5: Crear Evento ==="
curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Fiesta de Cumpleaños",
    "note": "Celebración de cumpleaños número 30",
    "date": "2025-12-15T18:00:00.000Z",
    "status": "init",
    "firstPay": false,
    "secondPay": false
  }' | jq '.'

# Resultado esperado:
# {
#   "_id": "6924e44b63080fc47cdafdb6",
#   "title": "Fiesta de Cumpleaños",
#   "note": "Celebración de cumpleaños número 30",
#   "date": "2025-12-15T18:00:00.000Z",
#   "user": "69248fd9347950e046694c48",
#   "status": "init",
#   "firstPay": false,
#   "secondPay": false,
#   "isDeleted": false,
#   "createdAt": "2025-11-24T23:03:39.824Z",
#   "updatedAt": "2025-11-24T23:03:39.824Z",
#   "__v": 0
# }

# GUARDA EL EVENT_ID DEL RESULTADO ANTERIOR
EVENT_ID="6924e44b63080fc47cdafdb6"  # ← Reemplaza con tu ID

################################################################################
# 6. OBTENER TODOS LOS EVENTOS DEL USUARIO
################################################################################

echo "=== TEST 6: Obtener Todos los Eventos del Usuario ==="
curl -X GET http://localhost:3000/event/api/eventusers \
  -b cookies.txt | jq '.'

# Resultado esperado (array):
# [
#   {
#     "_id": "6924e44b63080fc47cdafdb6",
#     "title": "Fiesta de Cumpleaños",
#     "note": "Celebración de cumpleaños número 30",
#     "date": "2025-12-15T18:00:00.000Z",
#     "user": {
#       "_id": "69248fd9347950e046694c48",
#       "username": "testuser_manual",
#       "email": "testmanual@example.com"
#     },
#     "status": "init",
#     "firstPay": false,
#     "secondPay": false,
#     "isDeleted": false,
#     "createdAt": "2025-11-24T23:03:39.824Z",
#     "updatedAt": "2025-11-24T23:03:39.824Z"
#   }
# ]

################################################################################
# 7. OBTENER UN EVENTO ESPECÍFICO
################################################################################

echo "=== TEST 7: Obtener Un Evento Específico ==="
curl -X GET http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -b cookies.txt | jq '.'

# Resultado esperado:
# {
#   "_id": "6924e44b63080fc47cdafdb6",
#   "title": "Fiesta de Cumpleaños",
#   ...
# }

################################################################################
# 8. ACTUALIZAR EVENTO
################################################################################

echo "=== TEST 8: Actualizar Evento ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Fiesta de Cumpleaños - CONFIRMADA",
    "note": "Celebración confirmada con 50 invitados",
    "status": "inProgress",
    "firstPay": true
  }' | jq '.'

# Resultado esperado:
# {
#   "_id": "6924e44b63080fc47cdafdb6",
#   "title": "Fiesta de Cumpleaños - CONFIRMADA",
#   "note": "Celebración confirmada con 50 invitados",
#   "status": "inProgress",
#   "firstPay": true,
#   "secondPay": false,
#   ...
# }

################################################################################
# 9. ACTUALIZAR SOLO EL ESTADO
################################################################################

echo "=== TEST 9: Actualizar Solo Estado ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "accepted"
  }' | jq '.'

################################################################################
# 10. ACTUALIZAR PAGOS
################################################################################

echo "=== TEST 10: Marcar Primer Pago ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "firstPay",
    "firstPay": true
  }' | jq '.'

echo "=== TEST 11: Marcar Segundo Pago ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "completed",
    "secondPay": true
  }' | jq '.'

################################################################################
# 12. CREAR MÚLTIPLES EVENTOS
################################################################################

echo "=== TEST 12: Crear Evento de Boda ==="
curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Boda María y Juan",
    "note": "Ceremonia y recepción en el jardín",
    "date": "2026-06-20T16:00:00.000Z",
    "status": "init"
  }' | jq '.'

echo "=== TEST 13: Crear Evento Corporativo ==="
curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Evento Corporativo Tech Summit",
    "note": "Conferencia anual de tecnología con 200 asistentes",
    "date": "2026-03-10T09:00:00.000Z",
    "status": "init"
  }' | jq '.'

echo "=== TEST 14: Verificar Múltiples Eventos ==="
curl -X GET http://localhost:3000/event/api/eventusers \
  -b cookies.txt | jq '. | length'

################################################################################
# 15. ELIMINAR EVENTO (Soft Delete)
################################################################################

echo "=== TEST 15: Eliminar Evento ==="
curl -X DELETE http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -b cookies.txt

# Resultado esperado:
# HTTP 204 No Content (sin body)

################################################################################
# 16. VERIFICAR QUE EL EVENTO NO APARECE
################################################################################

echo "=== TEST 16: Verificar Evento Eliminado No Aparece ==="
curl -X GET http://localhost:3000/event/api/eventusers \
  -b cookies.txt | jq '.'

# El evento eliminado NO debe aparecer en la lista

echo "=== TEST 17: Intentar Obtener Evento Eliminado ==="
curl -X GET http://localhost:3000/event/api/eventuser/$EVENT_ID \
  -b cookies.txt | jq '.'

# Resultado esperado:
# {
#   "message": "Event not found"
# }

################################################################################
# 18. CERRAR SESIÓN
################################################################################

echo "=== TEST 18: Logout ==="
curl -X POST http://localhost:3000/user/api/logout \
  -b cookies.txt | jq '.'

# Resultado esperado:
# "OK"

################################################################################
# 19. VERIFICAR QUE EL TOKEN YA NO FUNCIONA
################################################################################

echo "=== TEST 19: Intentar Acceder Sin Token ==="
curl -X GET http://localhost:3000/event/api/eventusers \
  -b cookies.txt | jq '.'

# Resultado esperado:
# {
#   "message": "No token, authorization denied"
# }

################################################################################
# 20. PRUEBAS DE ERROR - VALIDACIONES
################################################################################

echo "=== TEST 20: Crear Evento Sin Title ==="
curl -X POST http://localhost:3000/user/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "testmanual@example.com",
    "password": "Test123456"
  }' | jq '.'

curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "note": "Sin título",
    "date": "2025-12-15T18:00:00.000Z"
  }' | jq '.'

# Resultado esperado:
# {
#   "message": "Title y date son obligatorios"
# }

echo "=== TEST 21: Crear Evento Sin Date ==="
curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Evento sin fecha",
    "note": "Esto debe fallar"
  }' | jq '.'

# Resultado esperado:
# {
#   "message": "Title y date son obligatorios"
# }

echo "=== TEST 22: Actualizar Evento Inexistente ==="
curl -X PUT http://localhost:3000/event/api/eventuser/000000000000000000000000 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Evento inexistente"
  }' | jq '.'

# Resultado esperado:
# {
#   "message": "Event not found"
# }

echo "=== TEST 23: Eliminar Evento Inexistente ==="
curl -X DELETE http://localhost:3000/event/api/eventuser/000000000000000000000000 \
  -b cookies.txt | jq '.'

# Resultado esperado:
# {
#   "message": "Event not found"
# }

################################################################################
# 24. PRUEBAS DE ESTADOS DE EVENTOS
################################################################################

echo "=== TEST 24: Crear Evento y Probar Todos los Estados ==="

# Crear evento nuevo
NEW_EVENT=$(curl -s -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Evento Test Estados",
    "note": "Para probar transiciones de estado",
    "date": "2025-12-25T20:00:00.000Z"
  }')

NEW_EVENT_ID=$(echo $NEW_EVENT | jq -r '._id')
echo "Nuevo evento creado: $NEW_EVENT_ID"

# Estado: init → inProgress
echo "=== Cambiar a inProgress ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$NEW_EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"status": "inProgress"}' | jq '.status'

# Estado: inProgress → accepted
echo "=== Cambiar a accepted ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$NEW_EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"status": "accepted"}' | jq '.status'

# Estado: accepted → firstPay
echo "=== Cambiar a firstPay ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$NEW_EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"status": "firstPay", "firstPay": true}' | jq '.status, .firstPay'

# Estado: firstPay → completed
echo "=== Cambiar a completed ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$NEW_EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"status": "completed", "secondPay": true}' | jq '.status, .firstPay, .secondPay'

# Intentar editar evento completado (debe fallar)
echo "=== Intentar Editar Evento Completado ==="
curl -X PUT http://localhost:3000/event/api/eventuser/$NEW_EVENT_ID \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title": "No debería funcionar"}' | jq '.'

# Resultado esperado:
# {
#   "message": "No se puede actualizar evento en estado completed"
# }

################################################################################
# 25. PRUEBAS CON FORMATO DE FECHA
################################################################################

echo "=== TEST 25: Crear Evento con Diferentes Formatos de Fecha ==="

# Formato ISO completo
curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Evento Fecha ISO",
    "note": "Formato ISO 8601 completo",
    "date": "2025-12-31T23:59:59.999Z"
  }' | jq '.title, .date'

# Formato simple
curl -X POST http://localhost:3000/event/api/eventuser \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Evento Fecha Simple",
    "note": "Formato simplificado",
    "date": "2025-12-31"
  }' | jq '.title, .date'

################################################################################
# 26. OBTENER ESTADÍSTICAS
################################################################################

echo "=== TEST 26: Resumen de Eventos ==="

TOTAL=$(curl -s -X GET http://localhost:3000/event/api/eventusers \
  -b cookies.txt | jq '. | length')

echo "Total de eventos activos: $TOTAL"

curl -s -X GET http://localhost:3000/event/api/eventusers \
  -b cookies.txt | jq '[.[] | {title: .title, status: .status, firstPay: .firstPay, secondPay: .secondPay}]'

################################################################################
# 27. LIMPIAR COOKIES
################################################################################

echo "=== TEST 27: Limpiar Sesión ==="
rm -f cookies.txt
echo "Cookies eliminadas"

################################################################################
# NOTAS FINALES
################################################################################

# Para ver respuestas completas incluyendo headers:
# Agrega -v o -i a cualquier comando curl

# Ejemplo con headers:
# curl -i -X GET http://localhost:3000/event/api/eventusers -b cookies.txt

# Para formatear mejor la salida JSON (si tienes jq):
# Agrega | jq '.' al final de cada comando

# Para guardar el resultado en un archivo:
# Agrega > resultado.json al final

# Para medir el tiempo de respuesta:
# curl -w "\nTiempo: %{time_total}s\n" -X GET ...

################################################################################
# FIN DE LAS PRUEBAS
################################################################################