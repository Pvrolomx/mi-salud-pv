"use client"
import { useState, useEffect } from "react"

const faqs = [
  {
    q: { es: "¿Los doctores hablan inglés?", en: "Do the doctors speak English?" },
    a: { es: "Sí, todos los doctores en nuestra red son bilingües (inglés/español).", en: "Yes, all doctors in our network are bilingual (English/Spanish)." }
  },
  {
    q: { es: "¿Aceptan mi seguro de USA/Canadá?", en: "Do you accept my US/Canadian insurance?" },
    a: { es: "La mayoría de consultas se pagan al momento y te ayudamos a preparar tu claim para reembolso. Contáctanos para verificar tu seguro específico.", en: "Most consultations are paid at the time of service and we help you prepare your claim for reimbursement. Contact us to verify your specific insurance." }
  },
  {
    q: { es: "¿Cuánto cuesta una consulta?", en: "How much does a consultation cost?" },
    a: { es: "Las consultas generales van desde $800-$1,500 MXN (~$50-90 USD). Especialistas pueden variar. Contáctanos para precios específicos.", en: "General consultations range from $800-$1,500 MXN (~$50-90 USD). Specialists may vary. Contact us for specific pricing." }
  },
  {
    q: { es: "¿Cómo hago un claim de seguro?", en: "How do I file an insurance claim?" },
    a: { es: "Healthcare Resources te ayuda a preparar, traducir y enviar tu claim. Solo necesitas tus recibos y documentos médicos.", en: "Healthcare Resources helps you prepare, translate, and submit your claim. You just need your receipts and medical documents." }
  },
  {
    q: { es: "¿Qué hago en una emergencia?", en: "What do I do in an emergency?" },
    a: { es: "Llama al 911 o ve a urgencias del hospital más cercano. Después contáctanos para seguimiento y ayuda con documentación.", en: "Call 911 or go to the nearest hospital emergency room. Then contact us for follow-up and documentation assistance." }
  },
  {
    q: { es: "¿Tienen servicio 24/7?", en: "Do you have 24/7 service?" },
    a: { es: "Nuestro horario regular es Lunes a Viernes 9am-5pm. Para emergencias fuera de horario, déjanos mensaje y te contactamos lo antes posible.", en: "Our regular hours are Monday to Friday 9am-5pm. For after-hours emergencies, leave us a message and we'll contact you as soon as possible." }
  },
  {
    q: { es: "¿Pueden acompañarme a mi cita?", en: "Can someone accompany me to my appointment?" },
    a: { es: "Sí, ofrecemos servicio de acompañamiento para citas médicas si lo necesitas. Contáctanos para coordinar.", en: "Yes, we offer accompaniment service for medical appointments if needed. Contact us to coordinate." }
  },
  {
    q: { es: "¿Qué es la PlusCard?", en: "What is the PlusCard?" },
    a: { es: "La PlusCard es una membresía que te da descuentos y beneficios adicionales en servicios médicos. Pregúntanos para más detalles.", en: "The PlusCard is a membership that gives you discounts and additional benefits on medical services. Ask us for more details." }
  },
]

const texts = {
  es: {
    title: "Necesito Ayuda",
    faqTitle: "Preguntas Frecuentes",
    notFound: "¿No encontraste tu respuesta?",
    contactUs: "💬 Contáctanos por WhatsApp",
    back: "← Inicio"
  },
  en: {
    title: "Need Help",
    faqTitle: "Frequently Asked Questions",
    notFound: "Didn't find your answer?",
    contactUs: "💬 Contact us on WhatsApp",
    back: "← Home"
  }
}

export default function Help() {
  const [lang, setLang] = useState("en")
  const [expanded, setExpanded] = useState(null)
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
  }, [])

  const t = texts[lang]
  const hcrpvNumber = "523221234567"

  const handleWhatsApp = () => {
    const msg = lang === "es" ? "Hola, tengo una pregunta" : "Hello, I have a question"
    window.open(`https://wa.me/${hcrpvNumber}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="/" style={styles.backBtn}>{t.back}</a>
        <button onClick={() => setLang(lang === "es" ? "en" : "es")} style={styles.langBtn}>
          {lang === "es" ? "🇺🇸" : "🇲🇽"}
        </button>
      </header>

      <div style={styles.titleContainer}>
        <span style={styles.titleIcon}>💬</span>
        <h1 style={styles.title}>{t.title}</h1>
      </div>

      <div style={styles.faqSection}>
        <h2 style={styles.faqTitle}>❓ {t.faqTitle}</h2>
        
        <div style={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.faqItem}>
              <button 
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={styles.faqQuestion}
              >
                <span style={styles.faqQ}>{faq.q[lang]}</span>
                <span style={styles.faqIcon}>{expanded === i ? "−" : "+"}</span>
              </button>
              {expanded === i && (
                <div style={styles.faqAnswer}>
                  {faq.a[lang]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.contactSection}>
        <p style={styles.notFound}>{t.notFound}</p>
        <button onClick={handleWhatsApp} style={styles.whatsappBtn}>
          {t.contactUs}
        </button>
      </div>

      <div style={styles.bottomNav}>
        <a href="/" style={styles.homeBtn}>🏠 {t.back}</a>
      </div>

      {process.env.NEXT_PUBLIC_SHOW_FIRMA !== "false" && <footer style={styles.footer}>Hecho con 🧡 por duendes.app 2026</footer>}
    </main>
  )
}

const styles = {
  main: { minHeight: "100vh", background: "linear-gradient(to bottom, #5b21b6, #2e1065)", color: "white", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  header: { padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)" },
  backBtn: { color: "white", textDecoration: "none", fontSize: "1rem", fontWeight: "600", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.2)", borderRadius: "2rem" },
  langBtn: { background: "rgba(255,255,255,0.2)", border: "none", padding: "0.5rem 0.75rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.25rem" },
  titleContainer: { textAlign: "center", padding: "1rem" },
  titleIcon: { fontSize: "2.5rem", display: "block", marginBottom: "0.25rem" },
  title: { fontSize: "1.75rem", margin: 0, fontWeight: "700" },
  faqSection: { flex: 1, padding: "0 1rem" },
  faqTitle: { fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", marginBottom: "1rem" },
  faqList: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  faqItem: { background: "rgba(255,255,255,0.1)", borderRadius: "1rem", overflow: "hidden" },
  faqQuestion: { width: "100%", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left", gap: "1rem" },
  faqQ: { fontSize: "1rem", fontWeight: "500", flex: 1 },
  faqIcon: { fontSize: "1.5rem", color: "rgba(255,255,255,0.6)", flexShrink: 0 },
  faqAnswer: { padding: "0 1rem 1rem", color: "#a5f3fc", fontSize: "1rem", lineHeight: "1.6", fontWeight: "400" },
  contactSection: { padding: "1.5rem 1rem", textAlign: "center" },
  notFound: { color: "rgba(255,255,255,0.7)", marginBottom: "1rem" },
  whatsappBtn: { padding: "1rem 2rem", background: "#25d366", border: "none", borderRadius: "2rem", color: "white", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" },
  bottomNav: { padding: "1rem", display: "flex", justifyContent: "center" },
  homeBtn: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: "rgba(255,255,255,0.2)", color: "white", textDecoration: "none", borderRadius: "2rem", fontSize: "1.1rem", fontWeight: "600" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}
