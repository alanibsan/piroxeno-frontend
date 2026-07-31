import { useLang } from "../utils/i18n";

export default function Privacy() {
  const lang = useLang();
  const t = {
    title: lang === "es" ? "Política de Privacidad" : "Privacy Policy",
    updated: lang === "es" ? "Última actualización: marzo de 2026" : "Last updated: March 2026",
    contactIntro:
      lang === "es"
        ? "Si tienes preguntas sobre esta Política de Privacidad, contáctanos en:"
        : "If you have questions regarding this Privacy Policy, please contact us at:",
    sections:
      lang === "es"
        ? [
            {
              title: "1. Introducción",
              body: [
                "Piroxeno (\"nosotros\" o \"nuestro\") respeta tu privacidad y se compromete a proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos información cuando visitas nuestro sitio web o usas nuestros servicios.",
              ],
            },
            {
              title: "2. Información que recopilamos",
              body: [
                "Información personal: información que proporcionas voluntariamente, como nombre, email, empresa o teléfono. Puede recopilarse cuando solicitas una demo, nos contactas o interactúas con nuestros servicios.",
                "Datos de uso: podemos recopilar información técnica como dirección IP, tipo de navegador, información del dispositivo, páginas visitadas y datos de interacción con nuestro sitio.",
                "Datos de conversación: si interactúas con asistentes de IA impulsados por Piroxeno, los datos de conversación pueden procesarse para prestar servicios, generar insights y mejorar el rendimiento del sistema.",
              ],
            },
            {
              title: "3. Cómo usamos tu información",
              body: [
                "Usamos la información recopilada para operar y mejorar nuestros servicios, responder consultas, procesar solicitudes de demo, analizar patrones de uso, mantener la seguridad y mejorar el rendimiento de nuestros sistemas de IA.",
              ],
            },
            {
              title: "4. Compartir datos",
              body: [
                "No vendemos datos personales. Podemos compartir información con proveedores de servicios confiables que nos ayudan a operar la plataforma, como hosting, analítica o servicios de comunicación.",
              ],
            },
            {
              title: "5. Almacenamiento y seguridad de datos",
              body: [
                "Implementamos medidas técnicas y organizativas razonables para proteger tu información. Sin embargo, ningún servicio basado en internet puede garantizar seguridad absoluta.",
              ],
            },
            {
              title: "6. Tus derechos",
              body: [
                "Si te encuentras en el Espacio Económico Europeo (EEE), puedes tener derecho a acceder, corregir, eliminar o restringir el procesamiento de tus datos personales, así como solicitar portabilidad u oponerte a ciertas actividades de procesamiento.",
              ],
            },
            {
              title: "7. Retención de datos",
              body: [
                "Conservamos datos personales solo durante el tiempo necesario para prestar servicios, cumplir obligaciones legales y resolver disputas.",
              ],
            },
            {
              title: "8. Servicios de terceros",
              body: [
                "Nuestro sitio puede integrarse con servicios de terceros como plataformas de analítica, proveedores de pago o servicios de mensajería. Estos proveedores pueden procesar datos según sus propias políticas de privacidad.",
              ],
            },
            {
              title: "10. Cambios a esta política",
              body: [
                "Podemos actualizar esta Política de Privacidad periódicamente. Las actualizaciones se publicarán en esta página con la fecha revisada.",
              ],
            },
          ]
        : [
            {
              title: "1. Introduction",
              body: [
                "Piroxeno (\"we\", \"our\", or \"us\") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or use our services.",
              ],
            },
            {
              title: "2. Information We Collect",
              body: [
                "Personal Information: information you voluntarily provide, such as your name, email address, company name, or phone number. This information may be collected when you request a demo, contact us, or interact with our services.",
                "Usage Data: we may automatically collect certain technical information including IP address, browser type, device information, pages visited, and interaction data with our website.",
                "Conversation Data: if you interact with AI assistants powered by Piroxeno, conversation data may be processed to provide services, generate insights, and improve system performance.",
              ],
            },
            {
              title: "3. How We Use Your Information",
              body: [
                "We use collected information to operate and improve our services, respond to inquiries, process demo requests, analyze usage patterns, maintain security, and enhance the performance of our AI systems.",
              ],
            },
            {
              title: "4. Data Sharing",
              body: [
                "We do not sell personal data. We may share information with trusted service providers who assist us in operating the platform, such as hosting providers, analytics tools, or communication services.",
              ],
            },
            {
              title: "5. Data Storage and Security",
              body: [
                "We implement reasonable technical and organizational measures to protect your information. However, no internet-based service can be guaranteed to be completely secure.",
              ],
            },
            {
              title: "6. Your Rights",
              body: [
                "If you are located in the European Economic Area (EEA), you may have the right to access, correct, delete, or restrict processing of your personal data, as well as request data portability or object to certain processing activities.",
              ],
            },
            {
              title: "7. Data Retention",
              body: [
                "We retain personal data only for as long as necessary to provide services, comply with legal obligations, and resolve disputes.",
              ],
            },
            {
              title: "8. Third-Party Services",
              body: [
                "Our website may integrate with third-party services such as analytics platforms, payment providers, or messaging services. These providers may process data according to their own privacy policies.",
              ],
            },
            {
              title: "10. Changes to This Policy",
              body: [
                "We may update this Privacy Policy periodically. Updates will be posted on this page with the revised date.",
              ],
            },
          ],
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{t.title}</h1>
        <p className="text-sm text-gray-500 mb-10">{t.updated}</p>

        <div className="space-y-8 leading-relaxed">
          {t.sections.slice(0, 8).map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              9. {lang === "es" ? "Contacto" : "Contact"}
            </h2>
            <p>{t.contactIntro}</p>
            <p className="mt-2 font-medium">alan@piroxeno.com</p>
          </div>

          {t.sections.slice(8).map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
