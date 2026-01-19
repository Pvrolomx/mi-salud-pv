"use client"

const doctors = [
  { name: "Dr. García López", specialty: "Medicina General", phone: "3221234567" },
  { name: "Dra. Martínez Ruiz", specialty: "Cardiología", phone: "3221234568" },
  { name: "Dr. Hernández Silva", specialty: "Traumatología", phone: "3221234569" },
]

export default function Doctors() {
  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="/" style={styles.back}>← Regresar</a>
        <h1 style={styles.title}>👨‍⚕️ Doctores</h1>
      </header>
      
      <div style={styles.list}>
        {doctors.map((doc, i) => (
          <div key={i} style={styles.card}>
            <h2 style={styles.name}>{doc.name}</h2>
            <p style={styles.specialty}>{doc.specialty}</p>
            <a href={`tel:${doc.phone}`} style={styles.callBtn}>
              📞 Llamar
            </a>
          </div>
        ))}
      </div>
      
      <footer style={styles.footer}>
        Hecho con 🧡 por Colmena 2026
      </footer>
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    background: "rgba(30, 58, 95, 0.9)",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  back: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    margin: 0,
  },
  list: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "1rem",
    padding: "1.25rem",
  },
  name: {
    margin: "0 0 0.25rem",
    fontSize: "1.25rem",
  },
  specialty: {
    margin: "0 0 1rem",
    color: "rgba(255,255,255,0.7)",
  },
  callBtn: {
    display: "inline-block",
    background: "#059669",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.875rem",
  },
}
