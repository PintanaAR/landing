// IMPORTANT: This document is an editorial template intended as a starting
// point for legal review. It references Argentine data protection law
// (Ley 25.326 y Ley 27.275) and standard SaaS practices, but it must be
// reviewed and adapted by a qualified lawyer before being relied on as the
// final Privacy Policy. Do not treat as legal advice.
import { LegalLayout } from '@/components/legal/LegalLayout'
import { site } from '@/lib/site'

export function Privacy() {
  return (
    <LegalLayout title="Política de Privacidad" updatedAt="12 de mayo de 2026">
      <h2>1. Introducción</h2>
      <p>
        En <strong>Pintana</strong> tomamos en serio la protección de los
        datos personales de las personas que utilizan nuestros servicios.
        Esta Política de Privacidad describe qué datos recopilamos, con qué
        fines los tratamos, con quién los compartimos y qué derechos tiene
        usted como titular de esos datos.
      </p>
      <p>
        Esta política se rige por la{' '}
        <strong>Ley N.º 25.326 de Protección de los Datos Personales</strong>{' '}
        de la República Argentina y sus normas complementarias, así como por
        cualquier otra normativa aplicable.
      </p>

      <h2>2. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos personales recopilados a
        través de este sitio y de la plataforma Pintana es{' '}
        <strong>Pintana</strong>, con domicilio en la Ciudad Autónoma de
        Buenos Aires, Argentina. Para cualquier consulta sobre el tratamiento
        de sus datos personales puede escribirnos a{' '}
        <a href={`mailto:${site.email.privacy}`}>{site.email.privacy}</a>.
      </p>

      <h2>3. Datos que recopilamos</h2>
      <p>Recopilamos las siguientes categorías de datos:</p>
      <ul>
        <li>
          <strong>Datos de contacto:</strong> nombre, apellido, correo
          electrónico, número de teléfono o WhatsApp, provincia, nombre del
          comercio y cantidad de sucursales — provistos a través del
          formulario de contacto o durante el alta del servicio.
        </li>
        <li>
          <strong>Datos de cuenta:</strong> credenciales de acceso, rol,
          sucursal asignada y configuración de permisos.
        </li>
        <li>
          <strong>Datos comerciales del negocio:</strong> productos,
          inventario, ventas, clientes, proveedores, comprobantes fiscales y
          movimientos de caja que usted carga en la plataforma. Estos datos
          son de su propiedad y los tratamos por su cuenta y orden para
          prestarle el servicio.
        </li>
        <li>
          <strong>Datos técnicos:</strong> dirección IP, tipo de dispositivo,
          navegador, fecha y hora de acceso, páginas visitadas, registros de
          eventos y errores. Estos datos se recopilan automáticamente con
          fines de seguridad y mejora del servicio.
        </li>
        <li>
          <strong>Cookies y tecnologías similares:</strong> ver sección 9.
        </li>
      </ul>
      <p>
        No recopilamos categorías de datos sensibles (datos sobre origen
        racial, opiniones políticas, convicciones religiosas, salud o vida
        sexual) salvo que sea estrictamente necesario y con su consentimiento
        expreso.
      </p>

      <h2>4. Finalidad del tratamiento</h2>
      <p>Tratamos sus datos personales con las siguientes finalidades:</p>
      <ul>
        <li>Prestar, mantener y mejorar la plataforma Pintana.</li>
        <li>
          Procesar solicitudes de demostración y responder a consultas
          comerciales.
        </li>
        <li>Facturar y administrar el cobro del servicio.</li>
        <li>
          Cumplir con obligaciones fiscales, contables y regulatorias
          (incluida la información que deba reportarse ante la{' '}
          <strong>ARCA</strong> u otros organismos competentes).
        </li>
        <li>Prevenir fraudes y actividades no autorizadas.</li>
        <li>
          Enviar comunicaciones operativas (alertas del sistema, cambios al
          servicio, soporte técnico). No enviamos publicidad masiva.
        </li>
      </ul>

      <h2>5. Base legal del tratamiento</h2>
      <p>El tratamiento de sus datos se realiza con base en:</p>
      <ul>
        <li>
          <strong>Ejecución del contrato</strong> de prestación del servicio
          (artículo 5 inc. b de la Ley 25.326).
        </li>
        <li>
          <strong>Cumplimiento de obligaciones legales</strong> de Pintana,
          en particular obligaciones fiscales y contables.
        </li>
        <li>
          <strong>Su consentimiento</strong>, cuando lo solicitamos
          expresamente (por ejemplo, para suscribirse a comunicaciones no
          esenciales).
        </li>
        <li>
          <strong>Interés legítimo</strong> de Pintana en mantener la
          seguridad del servicio y prevenir usos indebidos.
        </li>
      </ul>

      <h2>6. Compartir datos con terceros</h2>
      <p>
        No vendemos ni cedemos sus datos personales a terceros con fines
        comerciales. Únicamente compartimos sus datos en los siguientes
        casos:
      </p>
      <ul>
        <li>
          <strong>Proveedores de servicios:</strong> infraestructura en la
          nube, procesadores de pagos (MercadoPago), servicios de envío de
          correo y de WhatsApp Business, herramientas de soporte y
          analítica. Estos terceros tratan los datos por cuenta y orden de
          Pintana y están obligados a proteger su confidencialidad.
        </li>
        <li>
          <strong>Organismos de control:</strong> cuando sea requerido por
          una orden judicial o por una autoridad competente, en particular
          la ARCA en materia tributaria.
        </li>
        <li>
          <strong>Adquirentes o sucesores:</strong> en caso de una operación
          societaria (fusión, adquisición o venta de activos), sus datos
          podrán transferirse al adquirente bajo idénticas obligaciones de
          protección.
        </li>
      </ul>

      <h2>7. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros proveedores de infraestructura tienen servidores
        fuera de la República Argentina. Cuando transferimos sus datos a
        países que no aseguran un nivel adecuado de protección según la
        Agencia de Acceso a la Información Pública (AAIP), lo hacemos
        adoptando garantías contractuales que aseguren un estándar
        equivalente al previsto por la Ley 25.326.
      </p>

      <h2>8. Conservación de los datos</h2>
      <p>
        Conservamos sus datos personales durante el tiempo necesario para
        cumplir con las finalidades descriptas en esta política y, en todo
        caso, mientras subsista la relación contractual. Una vez finalizada
        dicha relación, conservaremos los datos durante los plazos exigidos
        por la normativa fiscal, contable y comercial aplicable (en general,{' '}
        <strong>diez años</strong> para los comprobantes y registros
        contables). Vencidos esos plazos, procedemos a su supresión o
        anonimización.
      </p>

      <h2>9. Cookies y tecnologías similares</h2>
      <p>
        Utilizamos cookies y tecnologías similares para mantener la sesión,
        recordar sus preferencias (por ejemplo, el modo claro/oscuro) y
        medir el uso del sitio. Puede configurar su navegador para rechazar
        cookies, pero esto puede afectar la funcionalidad del servicio. No
        utilizamos cookies de publicidad de terceros.
      </p>

      <h2>10. Sus derechos</h2>
      <p>
        Como titular de los datos, usted tiene los siguientes derechos
        garantizados por la Ley 25.326:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> conocer qué datos suyos tratamos.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o
          incompletos.
        </li>
        <li>
          <strong>Supresión:</strong> solicitar la eliminación de sus datos
          cuando ya no sean necesarios o cuando retire su consentimiento,
          sin perjuicio de los plazos legales de conservación.
        </li>
        <li>
          <strong>Oposición:</strong> oponerse a tratamientos específicos
          cuando exista un motivo legítimo.
        </li>
        <li>
          <strong>Portabilidad:</strong> obtener una copia de sus datos
          comerciales en un formato estructurado y de uso común (por
          ejemplo, CSV).
        </li>
      </ul>
      <p>
        Para ejercer estos derechos, escríbanos a{' '}
        <a href={`mailto:${site.email.privacy}`}>{site.email.privacy}</a>{' '}
        adjuntando una copia de su documento de identidad. Responderemos
        dentro de los plazos previstos por la normativa. Si considera que
        sus derechos no fueron debidamente atendidos, puede presentar un
        reclamo ante la <strong>Agencia de Acceso a la Información
        Pública</strong> (AAIP), órgano de control de la Ley 25.326.
      </p>

      <h2>11. Seguridad de los datos</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger
        sus datos contra accesos no autorizados, pérdida, alteración o
        divulgación indebida. Esto incluye cifrado en tránsito (TLS),
        cifrado en reposo, controles de acceso por rol y auditoría de
        eventos. Ningún sistema es completamente invulnerable; en caso de
        un incidente de seguridad que afecte sus datos, notificaremos a los
        titulares y a la AAIP en los plazos exigidos por la normativa
        vigente.
      </p>

      <h2>12. Datos de menores</h2>
      <p>
        Nuestro servicio está dirigido a personas mayores de 18 años. No
        recopilamos conscientemente datos de menores de edad. Si toma
        conocimiento de que un menor nos ha proporcionado datos, por favor
        contáctenos para proceder a su eliminación.
      </p>

      <h2>13. Cambios a esta política</h2>
      <p>
        Podemos modificar esta política para reflejar cambios en el
        servicio, en la normativa o en nuestras prácticas. Cuando los
        cambios sean sustanciales, lo notificaremos por correo electrónico
        o mediante un aviso visible en el sitio antes de su entrada en
        vigencia. La fecha indicada al inicio del documento corresponde a
        la última actualización.
      </p>

      <h2>14. Contacto</h2>
      <p>
        Para cualquier consulta, reclamo o ejercicio de derechos sobre el
        tratamiento de sus datos personales:
      </p>
      <ul>
        <li>
          Correo electrónico:{' '}
          <a href={`mailto:${site.email.privacy}`}>{site.email.privacy}</a>
        </li>
        <li>
          Autoridad de control:{' '}
          <a href={site.links.aaip} target="_blank" rel="noopener noreferrer">
            Agencia de Acceso a la Información Pública (AAIP)
          </a>
          .
        </li>
      </ul>
    </LegalLayout>
  )
}
