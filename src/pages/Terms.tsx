// IMPORTANT: This document is an editorial template intended as a starting
// point for legal review. It covers standard SaaS practices adapted to
// Argentine law (Código Civil y Comercial, Ley de Defensa del Consumidor,
// Ley 25.326), but it must be reviewed and adapted by a qualified lawyer
// before being relied on as the final Terms of Service. Do not treat as
// legal advice.
import { LegalLayout } from '@/components/legal/LegalLayout'
import { site } from '@/lib/site'

export function Terms() {
  return (
    <LegalLayout title="Términos y Condiciones" updatedAt="12 de mayo de 2026">
      <h2>1. Aceptación de los términos</h2>
      <p>
        Estos Términos y Condiciones (en adelante, los{' '}
        <strong>"Términos"</strong>) regulan el uso de la plataforma{' '}
        <strong>Pintana</strong> (en adelante, el <strong>"Servicio"</strong>
        ), provista por Pintana (en adelante, <strong>"Pintana"</strong> o{' '}
        <strong>"nosotros"</strong>), con domicilio en la Ciudad Autónoma de
        Buenos Aires, Argentina.
      </p>
      <p>
        Al registrarse, acceder o utilizar el Servicio, usted (en adelante,
        el <strong>"Usuario"</strong> o <strong>"Cliente"</strong>) declara
        haber leído, comprendido y aceptado estos Términos en su totalidad.
        Si no está de acuerdo con alguno de ellos, debe abstenerse de
        utilizar el Servicio.
      </p>

      <h2>2. Descripción del servicio</h2>
      <p>
        Pintana es una plataforma de software como servicio (SaaS) que
        provee herramientas de gestión integral para pinturerías y
        comercios afines, incluyendo módulos de ERP, punto de venta,
        inventario, facturación electrónica, gestión de equipos y un
        asistente conversacional sobre WhatsApp. El Servicio se presta a
        través de Internet y no requiere instalación local.
      </p>

      <h2>3. Cuenta y acceso</h2>
      <p>
        Para utilizar el Servicio, el Usuario debe registrar una cuenta
        provista por Pintana y aceptar las credenciales que le sean
        asignadas. El Usuario es responsable de:
      </p>
      <ul>
        <li>
          Mantener la confidencialidad de sus credenciales y de las de los
          empleados que autorice a usar el Servicio.
        </li>
        <li>
          Toda actividad realizada desde su cuenta, salvo prueba en
          contrario de un acceso no autorizado.
        </li>
        <li>
          Notificar a Pintana de inmediato ante cualquier sospecha de uso
          no autorizado.
        </li>
        <li>
          Mantener la información de contacto y de facturación actualizada.
        </li>
      </ul>

      <h2>4. Suscripción, planes y pagos</h2>
      <p>
        El Servicio se presta bajo modalidad de suscripción, conforme al
        plan y a las condiciones comerciales acordadas con el Cliente al
        momento del alta. Salvo pacto en contrario:
      </p>
      <ul>
        <li>
          Los planes se facturan por adelantado en pesos argentinos.
        </li>
        <li>
          Pintana emitirá los comprobantes fiscales que correspondan según
          la situación tributaria del Cliente, declarándolos ante la{' '}
          <strong>ARCA</strong>.
        </li>
        <li>
          La falta de pago habilita a Pintana, previa intimación, a
          suspender el acceso al Servicio y, eventualmente, a rescindir el
          contrato.
        </li>
        <li>
          Los precios podrán actualizarse periódicamente. Las
          actualizaciones se notificarán con una antelación no menor a{' '}
          <strong>treinta (30) días</strong> y entrarán en vigencia en el
          siguiente período de facturación.
        </li>
      </ul>

      <h2>5. Uso aceptable</h2>
      <p>
        El Usuario se compromete a utilizar el Servicio de buena fe y
        conforme a la ley. En particular, queda prohibido:
      </p>
      <ul>
        <li>
          Utilizar el Servicio para fines ilícitos o que vulneren derechos
          de terceros.
        </li>
        <li>
          Realizar ingeniería inversa, descompilar o intentar acceder al
          código fuente del Servicio.
        </li>
        <li>
          Revender, sublicenciar o cedir el acceso al Servicio sin
          autorización escrita de Pintana.
        </li>
        <li>
          Cargar contenidos que infrinjan derechos de propiedad
          intelectual, que sean engañosos, ofensivos o que constituyan
          comunicaciones comerciales no solicitadas.
        </li>
        <li>
          Sobrecargar deliberadamente la infraestructura del Servicio o
          intentar eludir sus medidas de seguridad.
        </li>
      </ul>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El Servicio, incluyendo su software, diseño, marca y documentación,
        es propiedad exclusiva de Pintana y se encuentra protegido por la
        legislación de propiedad intelectual de la República Argentina y los
        tratados internacionales. Pintana otorga al Cliente una licencia
        limitada, no exclusiva, intransferible y revocable para utilizar el
        Servicio durante la vigencia de la suscripción y conforme a estos
        Términos.
      </p>

      <h2>7. Datos del Cliente</h2>
      <p>
        Los datos comerciales que el Cliente carga en el Servicio
        (productos, clientes, ventas, comprobantes, etc.) son y siguen
        siendo de su exclusiva propiedad. Pintana los trata por cuenta y
        orden del Cliente, exclusivamente para la prestación del Servicio
        y conforme a la <a href="/privacy">Política de Privacidad</a>.
      </p>
      <p>
        El Cliente puede solicitar la <strong>exportación</strong> de sus
        datos en formatos estructurados (por ejemplo, CSV) en cualquier
        momento durante la vigencia del contrato y dentro de un plazo
        razonable a partir de su finalización.
      </p>

      <h2>8. Disponibilidad y soporte</h2>
      <p>
        Pintana realiza esfuerzos razonables para mantener el Servicio
        disponible las veinticuatro (24) horas, todos los días del año, sin
        comprometer una disponibilidad específica salvo que ello se acuerde
        en un anexo de nivel de servicio (SLA) separado. Eventualmente
        podrán existir interrupciones por mantenimiento programado,
        actualizaciones o causas de fuerza mayor.
      </p>
      <p>
        El soporte técnico se brinda en idioma español por los canales
        oficiales informados en el sitio. Las consultas se responden en los
        plazos comunicados públicamente por Pintana.
      </p>

      <h2>9. Cancelación y rescisión</h2>
      <p>
        El Cliente puede cancelar su suscripción en cualquier momento,
        notificándolo a Pintana por los medios oficiales. La cancelación
        surtirá efecto al finalizar el período de facturación en curso;
        los importes ya abonados no son reintegrables salvo previsión
        legal en contrario.
      </p>
      <p>
        Pintana podrá rescindir el contrato, previa intimación de subsanación
        cuando corresponda, en caso de:
      </p>
      <ul>
        <li>
          Falta de pago de más de <strong>treinta (30) días</strong> desde
          el vencimiento.
        </li>
        <li>Incumplimiento grave de los presentes Términos.</li>
        <li>
          Uso del Servicio para actividades ilícitas o lesivas para
          terceros.
        </li>
      </ul>
      <p>
        Una vez rescindido el contrato, Pintana conservará los datos del
        Cliente durante los plazos legales aplicables y luego procederá a
        su supresión.
      </p>

      <h2>10. Limitación de responsabilidad</h2>
      <p>
        Dentro de los límites permitidos por la legislación argentina,
        incluyendo la <strong>Ley 24.240 de Defensa del Consumidor</strong>{' '}
        cuando corresponda, Pintana no será responsable por daños
        indirectos, lucro cesante, pérdida de oportunidad de negocio o
        daños emergentes no atribuibles a su culpa o dolo. En ningún caso
        la responsabilidad de Pintana excederá el monto de los importes
        efectivamente pagados por el Cliente durante los doce (12) meses
        anteriores al hecho generador del reclamo.
      </p>
      <p>
        Las obligaciones tributarias del Cliente (declaración y pago de
        impuestos, emisión de comprobantes ante la ARCA, retenciones,
        ingresos brutos, etc.) son y siguen siendo de su exclusiva
        responsabilidad. Pintana provee herramientas para facilitar su
        cumplimiento pero no sustituye al asesoramiento contable o legal
        profesional.
      </p>

      <h2>11. Confidencialidad</h2>
      <p>
        Cada parte se obliga a mantener confidencial la información del
        negocio de la otra parte a la que acceda en virtud de la relación
        contractual, y a utilizarla únicamente para los fines previstos en
        estos Términos. Esta obligación subsiste por un plazo de{' '}
        <strong>cinco (5) años</strong> luego de finalizado el contrato.
      </p>

      <h2>12. Modificaciones</h2>
      <p>
        Pintana puede modificar estos Términos en cualquier momento. Cuando
        las modificaciones sean sustanciales, las notificaremos al Cliente
        con una antelación no menor a treinta (30) días. El uso continuado
        del Servicio luego de la entrada en vigencia de los nuevos Términos
        implica su aceptación. Si el Cliente no estuviera de acuerdo,
        podrá rescindir el contrato sin penalidad antes de esa fecha.
      </p>

      <h2>13. Legislación aplicable y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de la República Argentina.
        Para toda controversia derivada de su interpretación o
        cumplimiento, las partes se someten a la jurisdicción de los{' '}
        <strong>Tribunales Ordinarios de la Ciudad Autónoma de Buenos
        Aires</strong>, renunciando a cualquier otro fuero que pudiera
        corresponderles, sin perjuicio de los derechos irrenunciables del
        consumidor cuando este último tenga el carácter de tal.
      </p>

      <h2>14. Notificaciones</h2>
      <p>
        Las notificaciones entre las partes serán válidas si se cursan por
        correo electrónico a las direcciones registradas. Pintana utilizará
        la dirección que el Cliente haya indicado en su cuenta; el Cliente
        podrá contactarnos en{' '}
        <a href={`mailto:${site.email.general}`}>{site.email.general}</a>.
      </p>

      <h2>15. Disposiciones generales</h2>
      <ul>
        <li>
          La invalidez de alguna cláusula no afecta a las restantes.
        </li>
        <li>
          La falta de ejercicio de un derecho no implica su renuncia.
        </li>
        <li>
          El Cliente no puede ceder los presentes Términos sin
          consentimiento escrito de Pintana.
        </li>
        <li>
          Estos Términos, junto con la Política de Privacidad y el plan
          comercial suscripto, constituyen el acuerdo completo entre las
          partes respecto del Servicio.
        </li>
      </ul>
    </LegalLayout>
  )
}
