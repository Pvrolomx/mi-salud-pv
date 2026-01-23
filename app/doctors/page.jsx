"use client"
import { useState, useEffect } from "react"

const doctors = [
  { name: "Dra. Alma Vargas", specialty: "Dermatologist", specialtyEs: "Dermatóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Alma-VargasDermatologist.webp" },
  { name: "Dr. Adolfo Curiel", specialty: "Cardiologist", specialtyEs: "Cardiólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Aldo-Curiel-Internal-Medicine-1.webp" },
  { name: "Dra. Laura Garcia", specialty: "OB-GYN", specialtyEs: "Ginecóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra-Laura-Garcia-GYN.webp" },
  { name: "Dr. Daniel Velasco", specialty: "Surgical Oncologist", specialtyEs: "Oncólogo Quirúrgico", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/10/Dr-Velasco-oncological-surgeon.jpg" },
  { name: "Dra. Patricia Garcia", specialty: "Dermatologist", specialtyEs: "Dermatóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Patricia-GarciaDermatologist.webp" },
  { name: "Dra. Marcela Curiel", specialty: "OB-GYN", specialtyEs: "Ginecóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Marcela-Curiel-Obgyn.webp" },
  { name: "Dra. Leslie Swindle", specialty: "Cardiologist", specialtyEs: "Cardióloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Leslie-SwindleCardiologist.webp" },
  { name: "Dr. Armando Joya", specialty: "Gastroenterologist", specialtyEs: "Gastroenterólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Armando-Joya-Gastroenterologist-1.webp" },
  { name: "Dra. Fabiola Gallegos", specialty: "Physical Therapy", specialtyEs: "Fisioterapia", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Fabiola-GallegosPhysical-Therapy.webp" },
  { name: "Dra. Cinthia Becerra", specialty: "BioIdentical Hormones", specialtyEs: "Hormonas Bioidénticas", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Cinthia-BecerraSpecialist-in-BioIdentical-Hormones.webp" },
  { name: "Dr. Luis Santillan", specialty: "Interventional Cardiology", specialtyEs: "Cardiología Intervencionista", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Luis-Santillan-Cardiologist-Interventionalist.webp" },
  { name: "Dra. Paty Villanueva", specialty: "Foot Clinic", specialtyEs: "Clínica del Pie", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra-Paty-Villanueva.webp" },
  { name: "Dra. Paola Esquivel", specialty: "Dermatologist", specialtyEs: "Dermatóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra-Paola-Esquivel-Dermatologist.webp" },
  { name: "Dra. Giovanna Partida", specialty: "Oncology Surgeon", specialtyEs: "Cirujana Oncóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra-Giovanna-Partida-oncology-surgeon.webp" },
  { name: "Dra. Brenda Martinez", specialty: "OB-GYN", specialtyEs: "Ginecóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra-Brenda-Martinez-Ob-gyn.webp" },
  { name: "Dra. Marianne Esteva", specialty: "Gastric Surgeon", specialtyEs: "Cirujana Gástrica", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/10/Dra-Marianne-Esteva-1.jpg" },
  { name: "Dr. Hector Escoto", specialty: "Vascular Specialist", specialtyEs: "Especialista Vascular", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Hector-EscotoVascular-Specialist.webp" },
  { name: "Dr. Antonio Matilla Torres", specialty: "Internal Medicine", specialtyEs: "Medicina Interna", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Antonio-Matilla-TorresSurgeon.webp" },
  { name: "Dr. Alejandro Rios", specialty: "Pulmonologist", specialtyEs: "Neumólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Alejandro-RiosPulmonologist.webp" },
  { name: "Dr. Rodrigo Gonzalez", specialty: "Ophthalmologist", specialtyEs: "Oftalmólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Rodrigo-gonzalez-ophthalmologist.webp" },
  { name: "Dr. Ricardo Martinez", specialty: "Spine Specialist", specialtyEs: "Especialista en Columna", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Ricardo-Martinez-Spine-specialist.webp" },
  { name: "Dr. Paul Tellez", specialty: "Anesthesiology & Pain", specialtyEs: "Anestesiología y Dolor", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Paul-Tellez-Anesthesiologist-and-pain-control.webp" },
  { name: "Dra. Claudia de Morales", specialty: "Breast Radiologist", specialtyEs: "Radióloga de Mama", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Claudia-de-MoralesRadiologist-–-Breast-Specialist.webp" },
  { name: "Dr. Najera", specialty: "Urologist", specialtyEs: "Urólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Najera-Urologist.webp" },
  { name: "Dr. Jonathan Robles", specialty: "Urologist", specialtyEs: "Urólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Jonathan-Robles-urologist.webp" },
  { name: "Dr. Joel Galindo", specialty: "Orthopedic Traumatologist", specialtyEs: "Traumatólogo Ortopédico", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Joel-Galindo-orthopedic-traumatologist.webp" },
  { name: "Dr. Guillermo Ramos", specialty: "Plastic Surgeon", specialtyEs: "Cirujano Plástico", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Guillermo-Ramos-Plastic-surgeon.webp" },
  { name: "Dra. Leticia Arechiga", specialty: "Pediatrician", specialtyEs: "Pediatra", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Leticia-Arechiga-Pediatrician.webp" },
  { name: "Dr. Felipe Martinez", specialty: "Anesthesiology & Pain", specialtyEs: "Anestesiología y Dolor", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Felipe-Martinez-Anesthesiologist-and-pain-contril.webp" },
  { name: "Dr. Oscar Bravo", specialty: "Neurologist", specialtyEs: "Neurólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Noe-Vega-Hematologist.webp" },
  { name: "Dra. May Cadena", specialty: "Oculoplastic Surgeon", specialtyEs: "Cirujana Oculoplástica", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra-May-Cadena-Occular-plastic-surgeon-Opthamologist.webp" },
  { name: "Dr. Noe Vega", specialty: "Hematologist", specialtyEs: "Hematólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Noe-Vega-Hematologist-1.webp" },
  { name: "Dra. Ciambelli", specialty: "Plastic Surgeon", specialtyEs: "Cirujana Plástica", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dra.-Ciambelli-Plastic-Surgeon.webp" },
  { name: "Dr. Jose Rivas", specialty: "Radiologist", specialtyEs: "Radiólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Jose-RivasRadiologist.webp" },
  { name: "Dr. Javier Diaz Nuñez", specialty: "ENT Specialist", specialtyEs: "Otorrinolaringólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr.-Javier-Diaz-Nunez-Ear-Nose-and-Throat-Specialist.webp" },
  { name: "Dra. Angeles López Vega", specialty: "Clinical Oncologist", specialtyEs: "Oncóloga Clínica", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Ma.-De-los-Angeles-Lopez-Vega-Clinical-Oncologist.webp" },
  { name: "Dr. Aldo Curiel", specialty: "Internal Medicine", specialtyEs: "Medicina Interna", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/09/Dr-Aldo-Curiel-Internal-Medicine-2.webp" },
  { name: "Dra. Paola Jacobo", specialty: "Retinologist", specialtyEs: "Retinóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/10/Dra-Paola-Jacobo-Retinologist.jpg" },
  { name: "Dr. David Rosas", specialty: "Orthopedic Traumatologist", specialtyEs: "Traumatólogo Ortopédico", img: "https://healthcareresourcespv.com/wp-content/uploads/2024/10/Dr-David-Rosas-Orthopedic-Traumatologist.jpg" },
  { name: "Christina Lawrence", specialty: "Audiologist", specialtyEs: "Audióloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2025/04/Christina-Lawrence.webp" },
  { name: "Dr. Juan Manuel Davila", specialty: "Endocrinologist", specialtyEs: "Endocrinólogo", img: "https://healthcareresourcespv.com/wp-content/uploads/2025/05/Dr.-Juan-Manuel-Davila.webp" },
  { name: "Dra. Andrea Robledo", specialty: "Ophthalmologist", specialtyEs: "Oftalmóloga", img: "https://healthcareresourcespv.com/wp-content/uploads/2025/05/Dra-Andrea-Robledo.webp" },
  { name: "Dr. Abraham Villavazo", specialty: "Clinical Gastric", specialtyEs: "Gastroenterólogo Clínico", img: "https://healthcareresourcespv.com/wp-content/uploads/2025/09/Dr-Abraham-Villavazo-clinical-gastric.webp" },
]

const texts = {
  es: { 
    title: "Doctores", 
    back: "← Regresar", 
    all: "Todos", 
    search: "Buscar doctor...", 
    bookAppointment: "📅 Concertar Cita",
    addToEmergency: "🆘 Agregar a Emergencia",
    selectForEmergency: "✓ Seleccionar"
  },
  en: { 
    title: "Doctors", 
    back: "← Back", 
    all: "All", 
    search: "Search doctor...", 
    bookAppointment: "📅 Book Appointment",
    addToEmergency: "🆘 Add to Emergency",
    selectForEmergency: "✓ Select"
  }
}

export default function Doctors() {
  const [lang, setLang] = useState("en")
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState(null)
  const [selectMode, setSelectMode] = useState(null)
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("lang")) setLang(params.get("lang"))
    if (params.get("selectMode")) setSelectMode(params.get("selectMode"))
  }, [])

  const t = texts[lang]
  const specialties = [...new Set(doctors.map(d => d.specialty))].sort()
  
  const filtered = doctors.filter(d => {
    const matchesFilter = filter === "all" || d.specialty === filter
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                         d.specialty.toLowerCase().includes(search.toLowerCase()) ||
                         d.specialtyEs.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const hcrpvNumber = "523221234567"

  const bookAppointment = (doc) => {
    const specialty = lang === "es" ? doc.specialtyEs : doc.specialty
    const msg = lang === "es" 
      ? `Hola, quiero agendar una cita con ${doc.name} (${specialty})` 
      : `Hello, I would like to schedule an appointment with ${doc.name} (${specialty})`
    window.open(`https://wa.me/${hcrpvNumber}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const addToEmergency = (doc) => {
    const newContact = {
      id: Date.now().toString(),
      type: "user",
      name: doc.name,
      relation: "doctor",
      icon: "👨‍⚕️",
      color: "#059669",
      phone: hcrpvNumber,
      whatsapp: hcrpvNumber,
      email: null,
      address: null,
      specialty: lang === "es" ? doc.specialtyEs : doc.specialty
    }
    const saved = localStorage.getItem("emergencyContacts")
    const contacts = saved ? JSON.parse(saved) : []
    const filtered = contacts.filter(c => c.relation !== "doctor")
    localStorage.setItem("emergencyContacts", JSON.stringify([newContact, ...filtered]))
    
    if (selectMode === "emergency") {
      window.location.href = `/emergency?lang=${lang}`
    } else {
      alert(lang === "es" ? "✓ Doctor agregado a contactos de emergencia" : "✓ Doctor added to emergency contacts")
    }
  }

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <a href="/" style={styles.back}>{t.back}</a>
        <h1 style={styles.title}>👨‍⚕️ {t.title}</h1>
        <button onClick={() => setLang(lang === "es" ? "en" : "es")} style={styles.langBtn}>
          {lang === "es" ? "🇺🇸" : "🇲🇽"}
        </button>
      </header>
      
      <div style={styles.searchBox}>
        <input 
          type="text" 
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.filters}>
        <button onClick={() => setFilter("all")} style={{...styles.filterBtn, ...(filter === "all" ? styles.filterActive : {})}}>
          {t.all}
        </button>
        {specialties.slice(0, 8).map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{...styles.filterBtn, ...(filter === s ? styles.filterActive : {})}}>
            {s}
          </button>
        ))}
      </div>
      
      <div style={styles.count}>{filtered.length} {lang === "es" ? "doctores" : "doctors"}</div>

      <div style={styles.list}>
        {filtered.map((doc, i) => (
          <div key={i} style={styles.card}>
            <button onClick={() => setExpanded(expanded === i ? null : i)} style={styles.cardHeader}>
              <img src={doc.img} alt={doc.name} style={styles.avatar} />
              <div style={styles.info}>
                <h2 style={styles.name}>{doc.name}</h2>
                <p style={styles.specialty}>{lang === "es" ? doc.specialtyEs : doc.specialty}</p>
              </div>
              <span style={styles.expandIcon}>{expanded === i ? "▲" : "▼"}</span>
            </button>
            
            {expanded === i && (
              <div style={styles.actions}>
                {selectMode === "emergency" ? (
                  <button onClick={() => addToEmergency(doc)} style={styles.selectBtn}>
                    {t.selectForEmergency}
                  </button>
                ) : (
                  <>
                    <button onClick={() => bookAppointment(doc)} style={styles.bookBtn}>
                      {t.bookAppointment}
                    </button>
                    <button onClick={() => addToEmergency(doc)} style={styles.emergencyBtn}>
                      {t.addToEmergency}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <footer style={styles.footer}>Hecho con 🧡 por duendes.app 2026</footer>
    </main>
  )
}

const styles = {
  main: { minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "system-ui, sans-serif" },
  header: { background: "rgba(30, 58, 95, 0.9)", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" },
  back: { color: "white", textDecoration: "none", fontSize: "1rem" },
  title: { fontSize: "1.25rem", margin: 0 },
  langBtn: { background: "rgba(255,255,255,0.15)", border: "none", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.25rem" },
  searchBox: { padding: "1rem" },
  searchInput: { width: "100%", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", background: "rgba(255,255,255,0.1)", color: "white", boxSizing: "border-box" },
  filters: { display: "flex", gap: "0.5rem", padding: "0 1rem", overflowX: "auto", paddingBottom: "0.5rem" },
  filterBtn: { padding: "0.5rem 1rem", borderRadius: "2rem", border: "none", background: "rgba(255,255,255,0.1)", color: "white", cursor: "pointer", whiteSpace: "nowrap", fontSize: "0.875rem" },
  filterActive: { background: "#2563eb" },
  count: { padding: "0.5rem 1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
  list: { padding: "0 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem" },
  card: { background: "rgba(255,255,255,0.08)", borderRadius: "1rem", overflow: "hidden" },
  cardHeader: { width: "100%", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left" },
  avatar: { width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" },
  info: { flex: 1 },
  name: { margin: 0, fontSize: "1rem", fontWeight: "600" },
  specialty: { margin: "0.25rem 0 0", color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" },
  expandIcon: { color: "rgba(255,255,255,0.5)" },
  actions: { padding: "0 1rem 1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  bookBtn: { flex: 1, padding: "0.875rem", background: "#22c55e", border: "none", borderRadius: "0.75rem", color: "white", fontSize: "0.95rem", fontWeight: "600", cursor: "pointer" },
  emergencyBtn: { flex: 1, padding: "0.875rem", background: "#dc2626", border: "none", borderRadius: "0.75rem", color: "white", fontSize: "0.95rem", fontWeight: "600", cursor: "pointer" },
  selectBtn: { flex: 1, padding: "1rem", background: "#22c55e", border: "none", borderRadius: "0.75rem", color: "white", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" },
  footer: { textAlign: "center", padding: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" },
}
