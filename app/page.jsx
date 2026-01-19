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

const btnImages = {
  emergency: "https://raw.githubusercontent.com/Pvrolomx/canal/main/HCRPV/1.%20Emergencia.png",
  doctors: "https://raw.githubusercontent.com/Pvrolomx/canal/main/HCRPV/2.%20Buscar%20Doctor.png",
  appointments: "https://raw.githubusercontent.com/Pvrolomx/canal/main/HCRPV/3.%20Mis%20Citas.png",
  help: "https://raw.githubusercontent.com/Pvrolomx/canal/main/HCRPV/4.%20Necesito%20Ayuda.png",
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
        <button onClick={handleEmergency} style={styles.button}>
          <img src={btnImages.emergency} alt="Emergency" style={styles.btnImg} />
          <div style={styles.btnTextContainer}>
            <span style={styles.buttonText}>{t.emergency}</span>
            <span style={styles.buttonSub}>{t.emergencySub}</span>
          </div>
        </button>

        <button onClick={() => window.location.href = `/doctors?lang=${lang}`} style={styles.button}>
          <img src={btnImages.doctors} alt="Doctors" style={styles.btnImg} />
          <div style={styles.btnTextContainer}>
            <span style={styles.buttonText}>{t.doctors}</span>
            <span style={styles.buttonSub}>{t.doctorsSub}</span>
          </div>
        </button>

        <button onClick={() => window.location.href = `/appointments?lang=${lang}`} style={styles.button}>
          <img src={btnImages.appointments} alt="Appointments" style={styles.btnImg} />
          <div style={styles.btnTextContainer}>
            <span style={styles.buttonText}>{t.appointments}</span>
            <span style={styles.buttonSub}>{t.appointmentsSub}</span>
          </div>
        </button>

        <button onClick={handleWhatsApp} style={styles.button}>
          <img src={btnImages.help} alt="Help" style={styles.btnImg} />
          <div style={styles.btnTextContainer}>
            <span style={styles.buttonText}>{t.help}</span>
            <span style={styles.buttonSub}>{t.helpSub}</span>
          </div>
        </button>
      </div>

      <footer style={styles.footer}>Hecho con 🧡 por C-OG - Colmena 2026</footer>
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, rgba(30, 58, 95, 0.9), rgba(15, 23, 42, 0.95)), url('https://raw.githubusercontent.com/Pvrolomx/canal/main/HCRPV/HCRPV%20Fondo.png') center/cover no-repeat fixed",
    backgroundColor: "#0f172a",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    background: "rgba(30, 58, 95, 0.85)",
    padding: "1.25rem 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  logo: { maxHeight: "75px", width: "auto" },
  langBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "2rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
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
    alignItems: "center",
    gap: "1rem",
    padding: "1.25rem 1rem",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },
  btnImg: {
    width: "70px",
    height: "70px",
    borderRadius: "1rem",
    objectFit: "cover",
  },
  btnTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttonText: { fontSize: "1.1rem", fontWeight: "700", color: "white" },
  buttonSub: { fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", marginTop: "0.25rem" },
  footer: { textAlign: "center", padding: "1.25rem 1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}


