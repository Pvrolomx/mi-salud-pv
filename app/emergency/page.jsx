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
    email: "info@healthcareresourcespv.com",
    address: null
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
    email: null,
    address: null
  },
  { 
    id: "hospital-joya",
    type: "fixed",
    name: "Hospital Joya",
    relation: { es: "Frente a Terminal Marítima", en: "Across Maritime Terminal" },
    icon: "🏥",
    color: "#059669",
    phone: "523222262500",
    whatsapp: "523222262500",
    email: null,
    address: "Blvd. Francisco Medina Ascencio 2760, Zona Hotelera Norte"
  },
]

const consulateOptions = [
  { name: "US Consulate Guadalajara", phone: "523333682100", icon: "🇺🇸", address: "Progreso 175, Col. Americana, Guadalajara" },
  { name: "Canadian Consulate", phone: "523331091054", icon: "🇨🇦", address: "World Trade Center, Av. Mariano Otero 1249, Guadalajara" },
]

const texts = {
  es: { 
    title: "Emergencia", 
    subtitle: "Mis contactos de emergencia",
    back: "← Inicio",
    call: "Llamar",
    whatsapp: "WhatsApp",
    email: "Email",
    map: "Mapa",
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
    phone: "Teléfono / Celular",
    emailField: "Email (opcional)",
    address: "Dirección (opcional)",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    selectFromList: "Seleccionar de lista",
    addManually: "Agregar manual",
    specialty: "Especialidad (opcional)",
    required: "Este contacto te puede salvar la vida",
    chooseOption: "¿Cómo quieres agregarlo?"
  },
  en: { 
    title: "Emergency", 
    subtitle: "My emergency contacts",
    back: "← Home",
    call: "Call",
    whatsapp: "WhatsApp", 
    email: "Email",
    map: "Map",
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
    phone: "Phone / Cell",
    emailField: "Email (optional)",
    address: "Address (optional)",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    selectFromList: "Select from list",
    addManually: "Add manually",
    specialty: "Specialty (optional)",
    required: "This contact can save your life",
    chooseOption: "How do you want to add?"
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

const relationColors = {
  spouse: "#ec4899",
  child: "#8b5cf6",
  family: "#f59e0b",
  doctor: "#059669",
  consulate: "#1e40af",
  other: "#6b7280"
}

export default function Emergency() {
  const [lang, setLang] = useState("en")
  const [contacts, setContacts] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showDoctorChoice, setShowDoctorChoice] = useState(false)
  const [showDoctorList, setShowDoctorList] = useState(false)
  const [showConsulates, setShowConsulates] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [selectedRelation, setSelectedRelation] = useState(null)
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    address: "",
    specialty: "",
    hasWhatsapp: true 
  })
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
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
  const handleMap = (address) => window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "_blank")

  const resetForm = () => {
    setFormData({ name: "", phone: "", email: "", address: "", specialty: "", hasWhatsapp: true })
    setSelectedRelation(null)
    setShowForm(false)
    setShowDoctorChoice(false)
    setShowDoctorList(false)
    setShowConsulates(false)
  }

  const selectRelation = (rel) => {
    setSelectedRelation(rel)
    if (rel === "doctor") {
      setShowDoctorChoice(true)
    } else if (rel === "consulate") {
      setShowConsulates(true)
    } else {
      setShowForm(true)
    }
  }

  const addContact = () => {
    if (!formData.name || !formData.phone) return
    const newContact = {
      id: Date.now().toString(),
      type: "user",
      name: formData.name,
      relation: selectedRelation,
      icon: relationIcons[selectedRelation],
      color: relationColors[selectedRelation],
      phone: formData.phone.replace(/\D/g, ""),
      whatsapp: formData.hasWhatsapp ? formData.phone.replace(/\D/g, "") : null,
      email: formData.email || null,
      address: formData.address || null,
      specialty: formData.specialty || null
    }
    saveContacts([newContact, ...contacts])
    resetForm()
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
      email: null,
      address: consulate.address
    }
    saveContacts([newContact, ...contacts.filter(c => c.relation !== "consulate")])
    resetForm()
  }

  const deleteContact = (id) => {
    saveContacts(contacts.filter(c => c.id !== id))
  }

  // Relation selection screen
  const RelationSelector = () => (
    <div style={styles.formOverlay}>
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>{t.addContact}</h3>
        <div style={styles.relationGrid}>
          {["spouse", "child", "family", "doctor", "consulate", "other"].map(rel => (
            <button key={rel} onClick={() => selectRelation(rel)} style={styles.relationBtn}>
              <span style={{fontSize: "2rem"}}>{relationIcons[rel]}</span>
              <span style={{fontSize: "0.875rem", marginTop: "0.25rem"}}>{t[rel]}</span>
            </button>
          ))}
        </div>
        <button onClick={resetForm} style={styles.cancelBtn}>{t.cancel}</button>
      </div>
    </div>
  )

  // Contact form
  const ContactForm = () => (
    <div style={styles.formOverlay}>
      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <span style={{fontSize: "2rem"}}>{relationIcons[selectedRelation]}</span>
          <h3 style={styles.formTitle}>{t[selectedRelation]}</h3>
        </div>
        
        <input
          type="text"
          placeholder={t.name + " *"}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={styles.input}
        />
        <input
          type="tel"
          placeholder={t.phone + " *"}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          style={styles.input}
        />
        <input
          type="email"
          placeholder={t.emailField}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={styles.input}
        />
        <input
          type="text"
          placeholder={t.address}
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          style={styles.input}
        />
        
        {selectedRelation === "doctor" && (
          <input
            type="text"
            placeholder={t.specialty}
            value={formData.specialty}
            onChange={(e) => setFormData({...formData, specialty: e.target.value})}
            style={styles.input}
          />
        )}

        <label style={styles.checkLabel}>
          <input
            type="checkbox"
            checked={formData.hasWhatsapp}
            onChange={(e) => setFormData({...formData, hasWhatsapp: e.target.checked})}
            style={styles.checkbox}
          />
          <span>📱 WhatsApp</span>
        </label>

        <div style={styles.formActions}>
          <button onClick={resetForm} style={styles.cancelBtn}>{t.cancel}</button>
          <button onClick={addContact} style={styles.saveBtn}>{t.save}</button>
        </div>
      </div>
    </div>
  )

  // Doctor choice: list or manual
  const DoctorChoice = () => (
    <div style={styles.formOverlay}>
      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <span style={{fontSize: "2rem"}}>👨‍⚕️</span>
          <h3 style={styles.formTitle}>{t.doctor}</h3>
        </div>
        <p style={{textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "1rem"}}>{t.chooseOption}</p>
        
        <button 
          onClick={() => { setShowDoctorChoice(false); setShowDoctorList(true); }} 
          style={styles.choiceBtn}
        >
          📋 {t.selectFromList}
        </button>
        <button 
          onClick={() => { setShowDoctorChoice(false); setShowForm(true); }} 
          style={styles.choiceBtn}
        >
          ✏️ {t.addManually}
        </button>
        
        <button onClick={resetForm} style={{...styles.cancelBtn, marginTop: "1rem"}}>{t.cancel}</button>
      </div>
    </div>
  )

  // Doctor list
  const DoctorList = () => (
    <div style={styles.formOverlay}>
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>{t.selectFromList}</h3>
        <a 
          href={`/doctors?lang=${lang}&selectMode=emergency`} 
          style={styles.doctorListBtn}
        >
          👨‍⚕️ {t.selectFromList} →
        </a>
        <button onClick={resetForm} style={{...styles.cancelBtn, marginTop: "1rem"}}>{t.cancel}</button>
      </div>
    </div>
  )

  // Consulate list
  const ConsulateList = () => (
    <div style={styles.formOverlay}>
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>{t.consulate}</h3>
        <div style={styles.consulateList}>
          {consulateOptions.map((c, i) => (
            <button key={i} onClick={() => addConsulate(c)} style={styles.consulateBtn}>
              <span style={{fontSize: "2rem"}}>{c.icon}</span>
              <div style={{textAlign: "left"}}>
                <div style={{fontWeight: "600"}}>{c.name}</div>
                <div style={{fontSize: "0.75rem", color: "rgba(255,255,255,0.6)"}}>{c.address}</div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={resetForm} style={{...styles.cancelBtn, marginTop: "1rem"}}>{t.cancel}</button>
      </div>
    </div>
  )

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

      <div style={styles.actionBar}>
        {!editMode ? (
          <>
            <button onClick={() => setSelectedRelation("select")} style={styles.addBtn}>{t.addContact}</button>
            {contacts.length > 0 && (
              <button onClick={() => setEditMode(true)} style={styles.editBtn}>{t.editContacts}</button>
            )}
          </>
        ) : (
          <button onClick={() => setEditMode(false)} style={styles.doneBtn}>{t.done}</button>
        )}
      </div>

      {/* Modals */}
      {selectedRelation === "select" && <RelationSelector />}
      {showForm && <ContactForm />}
      {showDoctorChoice && <DoctorChoice />}
      {showDoctorList && <DoctorList />}
      {showConsulates && <ConsulateList />}

      {/* Contact list */}
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
                  {contact.specialty && ` • ${contact.specialty}`}
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
                {contact.address && (
                  <button onClick={() => handleMap(contact.address)} style={{...styles.actionBtn, background: "#f59e0b"}}>
                    📍 {t.map}
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

      {process.env.NEXT_PUBLIC_SHOW_FIRMA !== "false" && <footer style={styles.footer}>Hecho con 🧡 por duendes.app 2026</footer>}
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
  formOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 100 },
  formCard: { background: "#1e293b", borderRadius: "1.5rem", padding: "1.5rem", width: "100%", maxWidth: "400px", maxHeight: "90vh", overflowY: "auto" },
  formHeader: { display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" },
  formTitle: { margin: 0, fontSize: "1.25rem" },
  relationGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" },
  relationBtn: { display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem 0.5rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "1rem", color: "white", cursor: "pointer", transition: "background 0.2s" },
  input: { width: "100%", padding: "1rem", marginBottom: "0.75rem", borderRadius: "0.75rem", border: "none", fontSize: "1rem", background: "rgba(255,255,255,0.1)", color: "white", boxSizing: "border-box" },
  checkLabel: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", color: "rgba(255,255,255,0.9)", fontSize: "1rem" },
  checkbox: { width: "20px", height: "20px", accentColor: "#22c55e" },
  formActions: { display: "flex", gap: "0.75rem", marginTop: "0.5rem" },
  cancelBtn: { flex: 1, padding: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "0.75rem", color: "white", cursor: "pointer", fontSize: "1rem" },
  saveBtn: { flex: 1, padding: "1rem", background: "#22c55e", border: "none", borderRadius: "0.75rem", color: "white", fontWeight: "600", cursor: "pointer", fontSize: "1rem" },
  choiceBtn: { width: "100%", padding: "1.25rem", marginBottom: "0.75rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "1rem", color: "white", cursor: "pointer", fontSize: "1.1rem", fontWeight: "500" },
  consulateList: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  consulateBtn: { display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "1rem", color: "white", cursor: "pointer", textAlign: "left" },
  doctorListBtn: { display: "block", padding: "1.25rem", background: "rgba(255,255,255,0.1)", borderRadius: "1rem", color: "white", textDecoration: "none", textAlign: "center", fontSize: "1.1rem" },
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
  deleteBtn: { background: "#ef4444", border: "none", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "1rem" },
  actions: { padding: "0 1rem 1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  actionBtn: { flex: "1 1 auto", minWidth: "70px", padding: "0.75rem", border: "none", borderRadius: "0.75rem", color: "white", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" },
  bottomNav: { padding: "1rem", display: "flex", justifyContent: "center" },
  homeBtn: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: "rgba(255,255,255,0.2)", color: "white", textDecoration: "none", borderRadius: "2rem", fontSize: "1.1rem", fontWeight: "600" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}

