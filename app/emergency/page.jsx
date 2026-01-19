"use client"
import { useState, useEffect } from "react"

const contacts = [
  { 
    name: { es: "Emergencias", en: "Emergency" },
    number: "911",
    icon: "🚨",
    color: "#dc2626",
    phone: "911",
    whatsapp: null,
    email: null
  },
  { 
    name: { es: "Cruz Roja", en: "Red Cross" },
    number: "065",
    icon: "🏥",
    color: "#ef4444",
    phone: "065",
    whatsapp: null,
    email: null
  },
  { 
    name: { es: "Healthcare Resources PV", en: "Healthcare Resources PV" },
    number: "322-123-4567",
    icon: "💙",
    color: "#2563eb",
    phone: "523221234567",
    whatsapp: "523221234567",
    email: "info@healthcareresourcespv.com"
  },
  { 
    name: { es: "Bomberos", en: "Fire Department" },
    number: "322-222-0101",
    icon: "🚒",
    color: "#f97316",
    phone: "523222220101",
    whatsapp: null,
    email: null
  },
]

const texts = {
  es: { 
    title: "Emergencia", 
    back: "← Regresar al Inicio",
    call: "Llamar",
    whatsapp: "WhatsApp",
    email: "Email",
    tapToContact: "Toca para contactar"
  },
  en: { 
    title: "Emergency", 
    back: "← Back to Home",
    call: "Call",
    whatsapp: "WhatsApp", 
    email: "Email",
    tapToContact: "Tap to contact"
  }
}

export default function Emergency() {
  const [lang, setLang] = useState("en")
  const [expanded, setExpanded] = useState(null)
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
  }, [])

  const t = texts[lang]

  const handleCall = (phone) => window.location.href = `tel:${phone}`
  const handleWhatsApp = (number) => window.open(`https://wa.me/${number}?text=${lang === "es" ? "Necesito ayuda urgente" : "I need urgent help"}`, "_blank")
  const handleEmail = (email) => window.location.href = `mailto:${email}?subject=${lang === "es" ? "Urgente - Necesito ayuda" : "Urgent - I need help"}`

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="/" style={styles.backBtn}>
          {t.back}
        </a>
        <button onClick={() => setLang(lang === "es" ? "en" : "es")} style={styles.langBtn}>
          {lang === "es" ? "🇺🇸" : "🇲🇽"}
        </button>
      </header>

      <div style={styles.titleContainer}>
        <span style={styles.titleIcon}>🆘</span>
        <h1 style={styles.title}>{t.title}</h1>
      </div>

      <div style={styles.contactList}>
        {contacts.map((contact, i) => (
          <div key={i} style={styles.contactCard}>
            <button 
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{...styles.contactHeader, borderLeft: `6px solid ${contact.color}`}}
            >
              <span style={styles.contactIcon}>{contact.icon}</span>
              <div style={styles.contactInfo}>
                <span style={styles.contactName}>{contact.name[lang]}</span>
                <span style={styles.contactNumber}>{contact.number}</span>
              </div>
              <span style={styles.expandIcon}>{expanded === i ? "▲" : "▼"}</span>
            </button>
            
            {expanded === i && (
              <div style={styles.actions}>
                <button onClick={() => handleCall(contact.phone)} style={{...styles.actionBtn, background: "#22c55e"}}>
                  📞 {t.call}
                </button>
                {contact.whatsapp && (
                  <button onClick={() => handleWhatsApp(contact.whatsapp)} style={{...styles.actionBtn, background: "#25d366"}}>
                    💬 {t.whatsapp}
                  </button>
                )}
                {contact.email && (
                  <button onClick={() => handleEmail(contact.email)} style={{...styles.actionBtn, background: "#3b82f6"}}>
                    ✉️ {t.email}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.bottomNav}>
        <a href="/" style={styles.homeBtn}>
          🏠 {t.back}
        </a>
      </div>

      <footer style={styles.footer}>Hecho con 🧡 por C-OG - Colmena 2026</footer>
    </main>
  )
}

const styles = {
  main: { 
    minHeight: "100vh", 
    background: "linear-gradient(to bottom, #7f1d1d, #450a0a)", 
    color: "white", 
    fontFamily: "system-ui, sans-serif",
    display: "flex",
    flexDirection: "column"
  },
  header: { 
    padding: "1rem", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    background: "rgba(0,0,0,0.2)"
  },
  backBtn: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "2rem",
  },
  langBtn: { 
    background: "rgba(255,255,255,0.2)", 
    border: "none", 
    padding: "0.5rem 0.75rem", 
    borderRadius: "50%", 
    cursor: "pointer", 
    fontSize: "1.25rem" 
  },
  titleContainer: {
    textAlign: "center",
    padding: "1.5rem 1rem",
  },
  titleIcon: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  title: { 
    fontSize: "2rem", 
    margin: 0,
    fontWeight: "700"
  },
  contactList: {
    flex: 1,
    padding: "0 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  contactCard: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "1rem",
    overflow: "hidden",
  },
  contactHeader: {
    width: "100%",
    padding: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
  },
  contactIcon: {
    fontSize: "2rem",
  },
  contactInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contactName: {
    fontSize: "1.25rem",
    fontWeight: "700",
  },
  contactNumber: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.7)",
  },
  expandIcon: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.5)",
  },
  actions: {
    padding: "0 1rem 1rem",
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  actionBtn: {
    flex: "1 1 auto",
    minWidth: "100px",
    padding: "1rem",
    border: "none",
    borderRadius: "0.75rem",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  bottomNav: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  homeBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    textDecoration: "none",
    borderRadius: "2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
  },
  footer: { 
    textAlign: "center", 
    padding: "1rem", 
    color: "rgba(255,255,255,0.5)", 
    fontSize: "0.875rem" 
  },
}
