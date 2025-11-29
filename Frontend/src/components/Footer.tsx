"use client";
import Logo from '/Images/Icon.png'

export default function FooterComponent() {
  return (
    <>
    <footer className="mt-8 sm:mt-12 border-t p-4 sm:p-6"
        style={{ borderColor: 'var(--border)' }}
    >
  <div className="max-w-6xl mx-auto text-center">
    <div className="lg:flex lg:items-end lg:justify-between">
      <div>
        <div className="flex justify-center text-teal-600 lg:justify-start">
          <img width={90} height={90} src={Logo}></img>
        </div>

        <p className="mx-auto mt-6 max-w-md leading-relaxed lg:text-left" style={{ color: 'var(--text-secondary)' }}>
        Celebra momentos inolvidables rodeado de naturaleza, calidez y elegancia campestre. Un espacio diseñado para hacer realidad tus sueños.
        </p>
      </div>

      <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">

        <li>
          <a href="/galery"> Galería </a>
        </li>

        <li>
          <a href="/contact"> Ubicación </a>
        </li>

        <li>
          <a href="/dashboard"> Reserva </a>
        </li>
      </ul>
    </div>

    <p className="mt-12 text-center text-sm lg:text-right" style={{ color: 'var(--text-secondary)' }}>
      Copyright © 2022. Todos los derechos reservados.
    </p>
  </div>
</footer>
</>
  );
}