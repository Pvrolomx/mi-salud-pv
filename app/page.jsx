"use client"
import { useState } from "react"

const texts = {
  es: {
    emergency: "EMERGENCIA",
    emergencySub: "Llamar al 911",
    doctors: "BUSCAR DOCTOR",
    doctorsSub: "Directorio médico",
    appointments: "MIS CITAS",
    appointmentsSub: "Ver próximas citas",
    help: "NECESITO AYUDA",
    helpSub: "WhatsApp directo",
  },
  en: {
    emergency: "EMERGENCY",
    emergencySub: "Call 911",
    doctors: "FIND DOCTOR",
    doctorsSub: "Medical directory",
    appointments: "MY APPOINTMENTS",
    appointmentsSub: "View upcoming",
    help: "NEED HELP",
    helpSub: "Direct WhatsApp",
  }
}

export default function Home() {
  const [lang, setLang] = useState("en")
  const t = texts[lang]
  const whatsappNumber = "523221234567"
  
  const handleEmergency = () => window.location.href = "tel:911"
  const handleWhatsApp = () => window.open(`https://wa.me/${whatsappNumber}?text=${lang === "es" ? "Hola, necesito ayuda" : "Hello, I need help"}`, "_blank")

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <img src="/logo.png" alt="Healthcare Resources PV" style={styles.logo}/>
        <button onClick={() => setLang(lang === "es" ? "en" : "es")} style={styles.langBtn}>
          {lang === "es" ? "🇺🇸 EN" : "🇲🇽 ES"}
        </button>
      </header>

      <div style={styles.buttonContainer}>
        <button onClick={handleEmergency} style={{...styles.button, ...styles.emergency}}>
          <span style={styles.icon}>🆘</span>
          <span style={styles.buttonText}>{t.emergency}</span>
          <span style={styles.buttonSub}>{t.emergencySub}</span>
        </button>

        <button onClick={() => window.location.href = `/doctors?lang=${lang}`} style={{...styles.button, ...styles.doctorsBtn}}>
          <span style={styles.icon}>👨‍⚕️</span>
          <span style={styles.buttonText}>{t.doctors}</span>
          <span style={styles.buttonSub}>{t.doctorsSub}</span>
        </button>

        <button onClick={() => window.location.href = `/appointments?lang=${lang}`} style={{...styles.button, ...styles.appointments}}>
          <span style={styles.icon}>📅</span>
          <span style={styles.buttonText}>{t.appointments}</span>
          <span style={styles.buttonSub}>{t.appointmentsSub}</span>
        </button>

        <button onClick={handleWhatsApp} style={{...styles.button, ...styles.helpBtn}}>
          <span style={styles.icon}>💬</span>
          <span style={styles.buttonText}>{t.help}</span>
          <span style={styles.buttonSub}>{t.helpSub}</span>
        </button>
      </div>

      <footer style={styles.footer}>Hecho con 🧡 por Colmena 2026</footer>
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, rgba(30, 58, 95, 0.9), rgba(15, 23, 42, 0.95)), url('/bg.jpg') center/cover no-repeat fixed",
    backgroundColor: "#0f172a",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    background: "rgba(30, 58, 95, 0.85)",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  logo: { maxHeight: "50px", width: "auto" },
  langBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "2rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.5rem",
    justifyContent: "center",
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    minHeight: "100px",
  },
  icon: { fontSize: "2rem", marginBottom: "0.5rem" },
  buttonText: { fontSize: "1.25rem", fontWeight: "700", color: "white", letterSpacing: "0.5px" },
  buttonSub: { fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", marginTop: "0.25rem" },
  emergency: { background: "linear-gradient(135deg, #dc2626, #b91c1c)" },
  doctorsBtn: { background: "linear-gradient(135deg, #2563eb, #1d4ed8)" },
  appointments: { background: "linear-gradient(135deg, #059669, #047857)" },
  helpBtn: { background: "linear-gradient(135deg, #7c3aed, #6d28d9)" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}
