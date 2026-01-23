"use client"
import { useState, useEffect } from "react"

const texts = {
  es: { 
    title: "Mis Citas", 
    back: "← Regresar",
    empty: "No tienes citas programadas",
    findDoctor: "🔍 Buscar Doctor",
    addNewDoctor: "✏️ Agregar Doctor Nuevo",
    upcomingAppointments: "Próximas citas",
    pastAppointments: "Citas pasadas",
    cancel: "Cancelar",
    reschedule: "Reagendar",
    name: "Nombre del doctor",
    specialty: "Especialidad",
    phone: "Teléfono (opcional)",
    save: "Guardar y Agendar",
    bookViaHCRPV: "Te conectaremos con Healthcare Resources PV para coordinar tu cita",
    newDoctor: "Doctor nuevo",
    requestAppointment: "Solicitar Cita"
  },
  en: { 
    title: "My Appointments", 
    back: "← Back", 
    empty: "No appointments scheduled", 
    findDoctor: "🔍 Find Doctor",
    addNewDoctor: "✏️ Add New Doctor",
    upcomingAppointments: "Upcoming appointments",
    pastAppointments: "Past appointments",
    cancel: "Cancel",
    reschedule: "Reschedule",
    name: "Doctor's name",
    specialty: "Specialty",
    phone: "Phone (optional)",
    save: "Save & Book",
    bookViaHCRPV: "We'll connect you with Healthcare Resources PV to coordinate your appointment",
    newDoctor: "New doctor",
    requestAppointment: "Request Appointment"
  }
}

export default function Appointments() {
  const [lang, setLang] = useState("en")
  const [appointments, setAppointments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", specialty: "", phone: "" })
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
    
    const saved = localStorage.getItem("appointments")
    if (saved) setAppointments(JSON.parse(saved))
  }, [])

  const t = texts[lang]
  const hcrpvNumber = "523221234567"

  const bookWithNewDoctor = () => {
    if (!formData.name) return
    
    const msg = lang === "es" 
      ? `Hola, quiero agendar una cita con ${formData.name}${formData.specialty ? ` (${formData.specialty})` : ''}. Es un doctor nuevo para mí.`
      : `Hello, I would like to schedule an appointment with ${formData.name}${formData.specialty ? ` (${formData.specialty})` : ''}. This is a new doctor for me.`
    
    window.open(`https://wa.me/${hcrpvNumber}?text=${encodeURIComponent(msg)}`, "_blank")
    setShowForm(false)
    setFormData({ name: "", specialty: "", phone: "" })
  }

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
        {appointments.length === 0 ? (
          <div style={styles.empty}>
            <span style={styles.emptyIcon}>📋</span>
            <p style={styles.emptyText}>{t.empty}</p>
            
            <div style={styles.actionButtons}>
              <a href={`/doctors?lang=${lang}`} style={styles.primaryBtn}>
                {t.findDoctor}
              </a>
              <button onClick={() => setShowForm(true)} style={styles.secondaryBtn}>
                {t.addNewDoctor}
              </button>
            </div>
            
            <p style={styles.hint}>{t.bookViaHCRPV}</p>
          </div>
        ) : (
          <div style={styles.appointmentList}>
            <h2 style={styles.sectionTitle}>{t.upcomingAppointments}</h2>
            {appointments.map((apt, i) => (
              <div key={i} style={styles.appointmentCard}>
                <div style={styles.aptInfo}>
                  <span style={styles.aptDoctor}>{apt.doctor}</span>
                  <span style={styles.aptDate}>{apt.date}</span>
                </div>
                <div style={styles.aptActions}>
                  <button style={styles.rescheduleBtn}>{t.reschedule}</button>
                </div>
              </div>
            ))}
            
            <div style={styles.actionButtons}>
              <a href={`/doctors?lang=${lang}`} style={styles.primaryBtn}>
                {t.findDoctor}
              </a>
              <button onClick={() => setShowForm(true)} style={styles.secondaryBtn}>
                {t.addNewDoctor}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form for new doctor */}
      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>✏️ {t.addNewDoctor}</h3>
            <p style={styles.formHint}>{t.bookViaHCRPV}</p>
            
            <input
              type="text"
              placeholder={t.name + " *"}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={styles.input}
            />
            <input
              type="text"
              placeholder={t.specialty}
              value={formData.specialty}
              onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              style={styles.input}
            />
            <input
              type="tel"
              placeholder={t.phone}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={styles.input}
            />

            <div style={styles.formActions}>
              <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>{t.cancel}</button>
              <button onClick={bookWithNewDoctor} style={styles.saveBtn}>
                {t.requestAppointment} →
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer style={styles.footer}>Hecho con 🧡 por duendes.app 2026</footer>
    </main>
  )
}

const styles = {
  main: { minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  header: { background: "rgba(30, 58, 95, 0.9)", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" },
  back: { color: "white", textDecoration: "none", fontSize: "1rem" },
  title: { fontSize: "1.25rem", margin: 0 },
  langBtn: { background: "rgba(255,255,255,0.15)", border: "none", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.25rem" },
  content: { flex: 1, display: "flex", flexDirection: "column", padding: "1.5rem" },
  empty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" },
  emptyIcon: { fontSize: "4rem", display: "block", marginBottom: "1rem" },
  emptyText: { fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem" },
  actionButtons: { display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "300px" },
  primaryBtn: { display: "block", padding: "1.25rem", background: "#22c55e", color: "white", textDecoration: "none", borderRadius: "1rem", fontWeight: "600", fontSize: "1.1rem", textAlign: "center" },
  secondaryBtn: { padding: "1.25rem", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "1rem", fontWeight: "600", fontSize: "1.1rem", cursor: "pointer" },
  hint: { marginTop: "1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", maxWidth: "280px" },
  appointmentList: { flex: 1 },
  sectionTitle: { fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" },
  appointmentCard: { background: "rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
  aptInfo: { display: "flex", flexDirection: "column" },
  aptDoctor: { fontWeight: "600" },
  aptDate: { color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" },
  aptActions: { display: "flex", gap: "0.5rem" },
  rescheduleBtn: { padding: "0.5rem 1rem", background: "#3b82f6", border: "none", borderRadius: "0.5rem", color: "white", cursor: "pointer" },
  formOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 100 },
  formCard: { background: "#1e293b", borderRadius: "1.5rem", padding: "1.5rem", width: "100%", maxWidth: "400px" },
  formTitle: { margin: "0 0 0.5rem", fontSize: "1.25rem", textAlign: "center" },
  formHint: { textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginBottom: "1.5rem" },
  input: { width: "100%", padding: "1rem", marginBottom: "0.75rem", borderRadius: "0.75rem", border: "none", fontSize: "1rem", background: "rgba(255,255,255,0.1)", color: "white", boxSizing: "border-box" },
  formActions: { display: "flex", gap: "0.75rem", marginTop: "0.5rem" },
  cancelBtn: { flex: 1, padding: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "0.75rem", color: "white", cursor: "pointer", fontSize: "1rem" },
  saveBtn: { flex: 2, padding: "1rem", background: "#22c55e", border: "none", borderRadius: "0.75rem", color: "white", fontWeight: "600", cursor: "pointer", fontSize: "1rem" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}
