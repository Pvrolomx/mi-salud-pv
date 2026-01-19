"use client"

export default function Home() {
  const whatsappNumber = "523221234567" // TODO: número real de HCRPV
  
  const handleEmergency = () => {
    window.location.href = "tel:911"
  }
  
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Hola, necesito ayuda con mi salud`, "_blank")
  }

  return (
    <main style={styles.main}>
      {/* Header con logo */}
      <header style={styles.header}>
        <img 
          src="/logo.png" 
          alt="Healthcare Resources PV" 
          style={styles.logo}
        />
      </header>

      {/* Botones principales */}
      <div style={styles.buttonContainer}>
        <button onClick={handleEmergency} style={{...styles.button, ...styles.emergency}}>
          <span style={styles.icon}>🆘</span>
          <span style={styles.buttonText}>EMERGENCIA</span>
          <span style={styles.buttonSub}>Llamar al 911</span>
        </button>

        <button onClick={() => window.location.href = "/doctors"} style={{...styles.button, ...styles.doctors}}>
          <span style={styles.icon}>👨‍⚕️</span>
          <span style={styles.buttonText}>BUSCAR DOCTOR</span>
          <span style={styles.buttonSub}>Directorio médico</span>
        </button>

        <button onClick={() => window.location.href = "/appointments"} style={{...styles.button, ...styles.appointments}}>
          <span style={styles.icon}>📅</span>
          <span style={styles.buttonText}>MIS CITAS</span>
          <span style={styles.buttonSub}>Ver próximas citas</span>
        </button>

        <button onClick={handleWhatsApp} style={{...styles.button, ...styles.help}}>
          <span style={styles.icon}>💬</span>
          <span style={styles.buttonText}>NECESITO AYUDA</span>
          <span style={styles.buttonSub}>WhatsApp directo</span>
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        Hecho con 🧡 por Colmena 2026
      </footer>
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
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  logo: {
    maxHeight: "60px",
    width: "auto",
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
  icon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  buttonText: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "white",
    letterSpacing: "0.5px",
  },
  buttonSub: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.8)",
    marginTop: "0.25rem",
  },
  emergency: {
    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
  },
  doctors: {
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  },
  appointments: {
    background: "linear-gradient(135deg, #059669, #047857)",
  },
  help: {
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.875rem",
  },
}
