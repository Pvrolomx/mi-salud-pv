"use client"
import { useState, useEffect } from "react"

const texts = {
  es: { title: "Mis Citas", back: "← Regresar", empty: "No tienes citas programadas", findDoctor: "Buscar Doctor" },
  en: { title: "My Appointments", back: "← Back", empty: "No appointments scheduled", findDoctor: "Find Doctor" }
}

export default function Appointments() {
  const [lang, setLang] = useState("en")
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
  }, [])

  const t = texts[lang]

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="/" style={styles.back}>{t.back}</a>
        <h1 style={styles.title}>📅 {t.title}</h1>
        <button onClick={() => setLang(lang === "es" ? "en" : "es")} style={styles.langBtn}>
          {lang === "es" ? "🇺🇸" : "🇲🇽"}
        </button>
      </header>
      
      <div style={styles.content}>
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>📋</span>
          <p style={styles.emptyText}>{t.empty}</p>
          <a href={`/doctors?lang=${lang}`} style={styles.btn}>{t.findDoctor}</a>
        </div>
      </div>
      
      <footer style={styles.footer}>Hecho con 🧡 por C-OG - Colmena 2026</footer>
    </main>
  )
}

const styles = {
  main: { minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  header: { background: "rgba(30, 58, 95, 0.9)", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" },
  back: { color: "white", textDecoration: "none", fontSize: "1rem" },
  title: { fontSize: "1.25rem", margin: 0 },
  langBtn: { background: "rgba(255,255,255,0.15)", border: "none", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.25rem" },
  content: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" },
  empty: { textAlign: "center" },
  emptyIcon: { fontSize: "4rem", display: "block", marginBottom: "1rem" },
  emptyText: { fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" },
  btn: { display: "inline-block", background: "#2563eb", color: "white", padding: "1rem 2rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "600" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}

