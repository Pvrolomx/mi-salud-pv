"use client"
import { useState, useEffect } from "react"

const defaultContacts = [
  { 
    id: "hcrpv",
    type: "fixed",
    name: "Healthcare Resources PV",
    relation: { es: "Tu apoyo médico", en: "Your medical support" },
    icon: "💙",
    color: "#2563eb",
    phone: "523221234567",
    whatsapp: "523221234567",
    email: "info@healthcareresourcespv.com"
  },
  { 
    id: "911",
    type: "fixed",
    name: "911",
    relation: { es: "Emergencias", en: "Emergency" },
    icon: "🚨",
    color: "#dc2626",
    phone: "911",
    whatsapp: null,
    email: null
  },
]

const consulateOptions = [
  { name: "US Consulate Guadalajara", phone: "523333682100", icon: "🇺🇸" },
  { name: "Canadian Consulate", phone: "523331091054", icon: "🇨🇦" },
]

const texts = {
  es: { 
    title: "Emergencia", 
    subtitle: "Mis contactos de emergencia",
    back: "← Inicio",
    call: "Llamar",
    whatsapp: "WhatsApp",
    email: "Email",
    addContact: "+ Agregar contacto",
    editContacts: "✏️ Editar",
    done: "✓ Listo",
    noContacts: "Agrega tus contactos de emergencia",
    spouse: "Esposo/a",
    child: "Hijo/a", 
    family: "Familiar",
    doctor: "Mi Doctor",
    consulate: "Consulado",
    other: "Otro",
    name: "Nombre",
    phone: "Teléfono",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    selectDoctor: "Seleccionar de lista",
    required: "Este contacto te puede salvar la vida"
  },
  en: { 
    title: "Emergency", 
    subtitle: "My emergency contacts",
    back: "← Home",
    call: "Call",
    whatsapp: "WhatsApp", 
    email: "Email",
    addContact: "+ Add contact",
    editContacts: "✏️ Edit",
    done: "✓ Done",
    noContacts: "Add your emergency contacts",
    spouse: "Spouse",
    child: "Son/Daughter",
    family: "Family",
    doctor: "My Doctor",
    consulate: "Consulate",
    other: "Other",
    name: "Name",
    phone: "Phone",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    selectDoctor: "Select from list",
    required: "This contact can save your life"
  }
}

const relationIcons = {
  spouse: "💑",
  child: "👨‍👩‍👧",
  family: "👨‍👩‍👧‍👦",
  doctor: "👨‍⚕️",
  consulate: "🏛️",
  other: "📞"
}

export default function Emergency() {
  const [lang, setLang] = useState("en")
  const [contacts, setContacts] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showDoctors, setShowDoctors] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [formData, setFormData] = useState({ name: "", phone: "", relation: "family", whatsapp: true })
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
    
    // Cargar contactos de localStorage
    const saved = localStorage.getItem("emergencyContacts")
    if (saved) setContacts(JSON.parse(saved))
  }, [])

  const saveContacts = (newContacts) => {
    setContacts(newContacts)
    localStorage.setItem("emergencyContacts", JSON.stringify(newContacts))
  }

  const t = texts[lang]
  const allContacts = [...contacts, ...defaultContacts]

  const handleCall = (phone) => window.location.href = `tel:${phone}`
  const handleWhatsApp = (number) => window.open(`https://wa.me/${number}?text=${lang === "es" ? "Necesito ayuda urgente" : "I need urgent help"}`, "_blank")
  const handleEmail = (email) => window.location.href = `mailto:${email}`

  const addContact = () => {
    if (!formData.name || !formData.phone) return
    const newContact = {
      id: Date.now().toString(),
      type: "user",
      name: formData.name,
      relation: formData.relation,
      icon: relationIcons[formData.relation],
      color: "#6b7280",
      phone: formData.phone.replace(/\D/g, ""),
      whatsapp: formData.whatsapp ? formData.phone.replace(/\D/g, "") : null,
      email: null
    }
    saveContacts([newContact, ...contacts])
    setFormData({ name: "", phone: "", relation: "family", whatsapp: true })
    setShowForm(false)
  }

  const addDoctor = (doctor) => {
    const newContact = {
      id: Date.now().toString(),
      type: "user",
      name: doctor.name,
      relation: "doctor",
      icon: "👨‍⚕️",
      color: "#059669",
      phone: "523221234567", // HCRPV para agendar
      whatsapp: "523221234567",
      email: null,
      specialty: doctor.specialty
    }
    saveContacts([newContact, ...contacts.filter(c => c.relation !== "doctor")])
    setShowDoctors(false)
  }

  const deleteContact = (id) => {
    saveContacts(contacts.filter(c => c.id !== id))
  }

  const addConsulate = (consulate) => {
    const newContact = {
      id: Date.now().toString(),
      type: "user", 
      name: consulate.name,
      relation: "consulate",
      icon: consulate.icon,
      color: "#1e40af",
      phone: consulate.phone,
      whatsapp: null,
      email: null
    }
    saveContacts([newContact, ...contacts.filter(c => c.relation !== "consulate")])
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
        <span style={styles.titleIcon}>🆘</span>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>
      </div>

      {/* Botones de acción */}
      <div style={styles.actionBar}>
        {!editMode ? (
          <>
            <button onClick={() => setShowForm(true)} style={styles.addBtn}>
              {t.addContact}
            </button>
            <button onClick={() => setEditMode(true)} style={styles.editBtn}>
              {t.editContacts}
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(false)} style={styles.doneBtn}>
            {t.done}
          </button>
        )}
      </div>

      {/* Formulario para agregar */}
      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>{t.addContact}</h3>
            
            <div style={styles.relationGrid}>
              {["spouse", "child", "family", "doctor", "consulate", "other"].map(rel => (
                <button
                  key={rel}
                  onClick={() => {
                    if (rel === "doctor") { setShowForm(false); setShowDoctors(true); }
                    else if (rel === "consulate") { setShowForm(false); }
                    else setFormData({...formData, relation: rel})
                  }}
                  style={{
                    ...styles.relationBtn,
                    ...(formData.relation === rel ? styles.relationActive : {})
                  }}
                >
                  <span style={{fontSize: "1.5rem"}}>{relationIcons[rel]}</span>
                  <span style={{fontSize: "0.75rem"}}>{t[rel]}</span>
                </button>
              ))}
            </div>

            {formData.relation !== "doctor" && formData.relation !== "consulate" && (
              <>
                <input
                  type="text"
                  placeholder={t.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input}
                />
                <input
                  type="tel"
                  placeholder={t.phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={styles.input}
                />
                <label style={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.checked})}
                  />
                  WhatsApp
                </label>
              </>
            )}

            <div style={styles.formActions}>
              <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>{t.cancel}</button>
              {formData.relation !== "doctor" && formData.relation !== "consulate" && (
                <button onClick={addContact} style={styles.saveBtn}>{t.save}</button>
              )}
            </div>

            {/* Consulados */}
            {formData.relation === "consulate" && (
              <div style={styles.consulateList}>
                {consulateOptions.map((c, i) => (
                  <button key={i} onClick={() => { addConsulate(c); setShowForm(false); }} style={styles.consulateBtn}>
                    <span style={{fontSize: "1.5rem"}}>{c.icon}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lista de doctores */}
      {showDoctors && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>{t.selectDoctor}</h3>
            <div style={styles.doctorList}>
              <a href={`/doctors?lang=${lang}&select=true`} style={styles.doctorLink}>
                👨‍⚕️ {t.selectDoctor} →
              </a>
            </div>
            <button onClick={() => setShowDoctors(false)} style={styles.cancelBtn}>{t.cancel}</button>
          </div>
        </div>
      )}

      {/* Lista de contactos */}
      <div style={styles.contactList}>
        {contacts.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>{t.noContacts}</p>
            <p style={styles.emptySubtext}>{t.required}</p>
          </div>
        )}
        
        {allContacts.map((contact, i) => (
          <div key={contact.id || i} style={styles.contactCard}>
            <button 
              onClick={() => !editMode && setExpanded(expanded === i ? null : i)}
              style={{...styles.contactHeader, borderLeft: `6px solid ${contact.color}`}}
            >
              <span style={styles.contactIcon}>{contact.icon}</span>
              <div style={styles.contactInfo}>
                <span style={styles.contactName}>{contact.name}</span>
                <span style={styles.contactRelation}>
                  {typeof contact.relation === "object" ? contact.relation[lang] : t[contact.relation] || contact.relation}
                </span>
              </div>
              {editMode && contact.type === "user" ? (
                <button onClick={() => deleteContact(contact.id)} style={styles.deleteBtn}>🗑️</button>
              ) : (
                <span style={styles.expandIcon}>{expanded === i ? "▲" : "▼"}</span>
              )}
            </button>
            
            {expanded === i && !editMode && (
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
        <a href="/" style={styles.homeBtn}>🏠 {t.back}</a>
      </div>

      <footer style={styles.footer}>Hecho con 🧡 por C-OG - Colmena 2026</footer>
    </main>
  )
}

const styles = {
  main: { minHeight: "100vh", background: "linear-gradient(to bottom, #7f1d1d, #450a0a)", color: "white", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  header: { padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)" },
  backBtn: { color: "white", textDecoration: "none", fontSize: "1rem", fontWeight: "600", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.2)", borderRadius: "2rem" },
  langBtn: { background: "rgba(255,255,255,0.2)", border: "none", padding: "0.5rem 0.75rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.25rem" },
  titleContainer: { textAlign: "center", padding: "1rem" },
  titleIcon: { fontSize: "2.5rem", display: "block", marginBottom: "0.25rem" },
  title: { fontSize: "1.75rem", margin: 0, fontWeight: "700" },
  subtitle: { margin: "0.5rem 0 0", color: "rgba(255,255,255,0.7)", fontSize: "1rem" },
  actionBar: { display: "flex", gap: "0.75rem", padding: "0 1rem 1rem", justifyContent: "center" },
  addBtn: { padding: "0.75rem 1.5rem", background: "#22c55e", border: "none", borderRadius: "2rem", color: "white", fontWeight: "600", cursor: "pointer", fontSize: "1rem" },
  editBtn: { padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "2rem", color: "white", fontWeight: "600", cursor: "pointer", fontSize: "1rem" },
  doneBtn: { padding: "0.75rem 2rem", background: "#3b82f6", border: "none", borderRadius: "2rem", color: "white", fontWeight: "600", cursor: "pointer", fontSize: "1rem" },
  formOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 100 },
  formCard: { background: "#1e293b", borderRadius: "1rem", padding: "1.5rem", width: "100%", maxWidth: "400px" },
  formTitle: { margin: "0 0 1rem", textAlign: "center" },
  relationGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" },
  relationBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", padding: "0.75rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "0.75rem", color: "white", cursor: "pointer" },
  relationActive: { background: "#3b82f6" },
  input: { width: "100%", padding: "1rem", marginBottom: "0.75rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", background: "rgba(255,255,255,0.1)", color: "white" },
  checkLabel: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "rgba(255,255,255,0.8)" },
  formActions: { display: "flex", gap: "0.75rem" },
  cancelBtn: { flex: 1, padding: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "0.5rem", color: "white", cursor: "pointer" },
  saveBtn: { flex: 1, padding: "1rem", background: "#22c55e", border: "none", borderRadius: "0.5rem", color: "white", fontWeight: "600", cursor: "pointer" },
  consulateList: { display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" },
  consulateBtn: { display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "0.75rem", color: "white", cursor: "pointer" },
  doctorList: { padding: "1rem 0" },
  doctorLink: { display: "block", padding: "1rem", background: "rgba(255,255,255,0.1)", borderRadius: "0.75rem", color: "white", textDecoration: "none", textAlign: "center" },
  contactList: { flex: 1, padding: "0 1rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto" },
  emptyState: { textAlign: "center", padding: "2rem 1rem" },
  emptyText: { fontSize: "1.25rem", margin: "0 0 0.5rem" },
  emptySubtext: { color: "rgba(255,255,255,0.6)", margin: 0 },
  contactCard: { background: "rgba(255,255,255,0.1)", borderRadius: "1rem", overflow: "hidden" },
  contactHeader: { width: "100%", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left" },
  contactIcon: { fontSize: "1.75rem" },
  contactInfo: { flex: 1, display: "flex", flexDirection: "column" },
  contactName: { fontSize: "1.1rem", fontWeight: "700" },
  contactRelation: { fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" },
  expandIcon: { fontSize: "1rem", color: "rgba(255,255,255,0.5)" },
  deleteBtn: { background: "#ef4444", border: "none", padding: "0.5rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "1rem" },
  actions: { padding: "0 1rem 1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  actionBtn: { flex: "1 1 auto", minWidth: "80px", padding: "0.875rem", border: "none", borderRadius: "0.75rem", color: "white", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" },
  bottomNav: { padding: "1rem", display: "flex", justifyContent: "center" },
  homeBtn: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: "rgba(255,255,255,0.2)", color: "white", textDecoration: "none", borderRadius: "2rem", fontSize: "1.1rem", fontWeight: "600" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}
