"use client"

export default function Appointments() {
  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="/" style={styles.back}>← Regresar</a>
        <h1 style={styles.title}>📅 Mis Citas</h1>
      </header>
      
      <div style={styles.content}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>📋</span>
          <p style={styles.emptyText}>No tienes citas programadas</p>
          <a href="/" style={styles.btn}>
            Buscar Doctor
          </a>
        </div>
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
    display: "flex",
    flexDirection: "column",
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
  content: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  empty: {
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "4rem",
    display: "block",
    marginBottom: "1rem",
  },
  emptyText: {
    fontSize: "1.25rem",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "1.5rem",
  },
  btn: {
    display: "inline-block",
    background: "#2563eb",
    color: "white",
    padding: "1rem 2rem",
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
