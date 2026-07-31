import { useLang } from "../utils/i18n";

export default function Terms() {
  const lang = useLang();
  const t = {
    title: lang === "es" ? "Términos de Servicio" : "Terms of Service",
    updated: lang === "es" ? "Última actualización: marzo de 2026" : "Last updated: March 2026",
    mayNot: lang === "es" ? "No puedes:" : "You may not:",
    contactIntro:
      lang === "es"
        ? "Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos en:"
        : "If you have questions regarding these Terms of Service, you may contact us at:",
    prohibited:
      lang === "es"
        ? [
            "Usar el servicio para fines ilegales o no autorizados",
            "Intentar interrumpir, dañar o comprometer la plataforma",
            "Aplicar ingeniería inversa o copiar nuestro software",
            "Usar el servicio para distribuir spam o contenido malicioso",
          ]
        : [
            "Use the service for illegal or unauthorized purposes",
            "Attempt to disrupt, damage, or compromise the platform",
            "Reverse engineer or copy our software",
            "Use the service to distribute spam or malicious content",
          ],
    sections:
      lang === "es"
        ? [
            {
              title: "1. Aceptación de términos",
              body: "Al acceder o usar el sitio web y los servicios de Piroxeno, aceptas quedar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, no debes usar nuestros servicios.",
            },
            {
              title: "2. Descripción de servicios",
              body: "Piroxeno proporciona asistentes impulsados por IA y herramientas de analítica que ayudan a empresas a automatizar conversaciones y generar insights de interacciones con clientes en sitios web y plataformas de mensajería. Las funciones pueden evolucionar con el tiempo mientras mejoramos la plataforma.",
            },
            {
              title: "3. Uso del servicio",
              body: "Aceptas usar el servicio solo para fines legales y de acuerdo con estos Términos.",
            },
            {
              title: "4. Cuentas",
              body: "Ciertas funciones de la plataforma pueden requerir registro de cuenta. Eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades que ocurran bajo tu cuenta.",
            },
            {
              title: "5. Propiedad intelectual",
              body: "Todo el contenido, software, marca y tecnología asociados con Piroxeno son propiedad de Piroxeno o sus licenciantes y están protegidos por leyes de propiedad intelectual. No puedes reproducir, distribuir, modificar o crear obras derivadas sin permiso previo.",
            },
            {
              title: "6. Disponibilidad del servicio",
              body: "Buscamos prestar servicios confiables, pero no garantizamos operación ininterrumpida o libre de errores. La plataforma puede modificarse, suspenderse o discontinuarse en cualquier momento sin aviso previo.",
            },
            {
              title: "7. Limitación de responsabilidad",
              body: "En la máxima medida permitida por la ley, Piroxeno no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del servicio.",
            },
            {
              title: "8. Terminación",
              body: "Nos reservamos el derecho de suspender o terminar el acceso al servicio si se violan estos Términos o si el servicio se usa de una forma que pueda dañar la plataforma u otros usuarios.",
            },
            {
              title: "9. Ley aplicable",
              body: "Estos Términos se regirán por las leyes aplicables de la jurisdicción en la que opera Piroxeno.",
            },
          ]
        : [
            {
              title: "1. Acceptance of Terms",
              body: "By accessing or using the Piroxeno website and services, you agree to be bound by these Terms of Service. If you do not agree with these terms, you should not use our services.",
            },
            {
              title: "2. Description of Services",
              body: "Piroxeno provides AI-powered assistants and analytics tools that help businesses automate conversations and generate insights from customer interactions across websites and messaging platforms. Features and functionality may evolve over time as we improve the platform.",
            },
            {
              title: "3. Use of the Service",
              body: "You agree to use the service only for lawful purposes and in accordance with these Terms.",
            },
            {
              title: "4. Accounts",
              body: "Certain features of the platform may require account registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
            },
            {
              title: "5. Intellectual Property",
              body: "All content, software, branding, and technology associated with Piroxeno are the property of Piroxeno or its licensors and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without prior permission.",
            },
            {
              title: "6. Service Availability",
              body: "We aim to provide reliable services but do not guarantee uninterrupted or error-free operation. The platform may be modified, suspended, or discontinued at any time without prior notice.",
            },
            {
              title: "7. Limitation of Liability",
              body: "To the maximum extent permitted by law, Piroxeno shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the service.",
            },
            {
              title: "8. Termination",
              body: "We reserve the right to suspend or terminate access to the service if these Terms are violated or if the service is used in a way that may harm the platform or other users.",
            },
            {
              title: "9. Governing Law",
              body: "These Terms shall be governed by the applicable laws of the jurisdiction in which Piroxeno operates.",
            },
          ],
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{t.title}</h1>
        <p className="text-sm text-gray-500 mb-10">{t.updated}</p>

        <div className="space-y-8 leading-relaxed">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                {section.title}
              </h2>
              <p>{section.body}</p>

              {section.title.startsWith("3.") && (
                <>
                  <p className="mt-3">{t.mayNot}</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    {t.prohibited.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              10. {lang === "es" ? "Contacto" : "Contact"}
            </h2>
            <p>{t.contactIntro}</p>
            <p className="mt-2 font-medium">contact@piroxeno.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
