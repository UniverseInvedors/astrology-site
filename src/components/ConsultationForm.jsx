import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── CONSULTATION FORM ────────────────────────────────────────────────────────
// Editable WhatsApp + Email message generator
// WhatsApp: 9735805602 | Call: 9434999869

const WA_NUMBER = "919735805602"
const EMAIL = "subratamukherjeetheimmortal@gmail.com"

const PROBLEMS = [
  { value: "", label: "Select your concern..." },
  { value: "kundli", label: "Kundli / Birth Chart Reading" },
  { value: "marriage", label: "Marriage & Relationship" },
  { value: "career", label: "Career & Business" },
  { value: "health", label: "Health & Well-being" },
  { value: "finance", label: "Financial Problems" },
  { value: "family", label: "Family Disputes" },
  { value: "education", label: "Education & Studies" },
  { value: "property", label: "Property & Legal Matters" },
  { value: "spiritual", label: "Spiritual Guidance" },
  { value: "remedies", label: "Remedies & Gemstones" },
  { value: "other", label: "Other / General Consultation" },
]

function buildWAMessage(form) {
  const lines = [
    "Namaste Pandit Ji 🙏",
    "",
    "I would like to book a consultation with you.",
    "",
    `*Name:* ${form.name || "—"}`,
    `*Phone:* ${form.phone || "—"}`,
    `*Date of Birth:* ${form.dob || "—"}`,
    `*Time of Birth:* ${form.tob || "—"}`,
    `*Place of Birth:* ${form.pob || "—"}`,
    `*Concern:* ${PROBLEMS.find(p => p.value === form.problem)?.label || form.problem || "—"}`,
    "",
    `*My Query:*`,
    form.message || "Please guide me.",
    "",
    "Thank you 🙏",
  ]
  return lines.join("\n")
}

function buildEmailBody(form) {
  return `Namaste Pandit Ji,

I would like to book a consultation with you.

Name: ${form.name || "—"}
Phone: ${form.phone || "—"}
Date of Birth: ${form.dob || "—"}
Time of Birth: ${form.tob || "—"}
Place of Birth: ${form.pob || "—"}
Concern: ${PROBLEMS.find(p => p.value === form.problem)?.label || form.problem || "—"}

My Query:
${form.message || "Please guide me."}

Thank you,
${form.name || "A Seeker"}`
}

function buildEmailSubject(form) {
  const concern = PROBLEMS.find(p => p.value === form.problem)?.label || "Consultation"
  return `Consultation Request — ${concern} | ${form.name || "New Client"}`
}

// ─── INPUT COMPONENT ──────────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: "Cinzel, serif",
        fontSize: "0.68rem",
        letterSpacing: "0.2em",
        color: "rgba(245,200,66,0.7)",
        textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {label}
        {required && <span style={{ color: "#FF5E00", fontSize: "0.8rem" }}>*</span>}
      </label>
      {children}
      {hint && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(240,232,208,0.35)", marginTop: 2 }}>
          {hint}
        </p>
      )}
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  border: "1px solid rgba(245,200,66,0.2)",
  background: "rgba(245,200,66,0.04)",
  color: "rgba(240,232,208,0.9)",
  fontFamily: "Inter, sans-serif",
  fontSize: "0.85rem",
  outline: "none",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
}

// ─── PREVIEW PANEL ────────────────────────────────────────────────────────────
function MessagePreview({ form, mode, onEdit, onClose }) {
  const [text, setText] = useState(
    mode === "wa" ? buildWAMessage(form) : buildEmailBody(form)
  )
  const subject = buildEmailSubject(form)

  const handleSend = () => {
    if (mode === "wa") {
      const encoded = encodeURIComponent(text)
      window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank")
    } else {
      const encodedBody = encodeURIComponent(text)
      const encodedSubj = encodeURIComponent(subject)
      window.open(`mailto:${EMAIL}?subject=${encodedSubj}&body=${encodedBody}`, "_blank")
    }
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(16px)",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 600,
          borderRadius: 24,
          background: "linear-gradient(160deg, rgba(6,0,14,0.98), rgba(4,4,24,0.98))",
          border: `1px solid ${mode === "wa" ? "rgba(37,211,102,0.3)" : "rgba(96,165,250,0.3)"}`,
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          boxShadow: `0 0 60px ${mode === "wa" ? "rgba(37,211,102,0.1)" : "rgba(96,165,250,0.1)"}, 0 40px 80px rgba(0,0,0,0.8)`,
          maxHeight: "90vh",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "18px 24px",
          borderBottom: `1px solid ${mode === "wa" ? "rgba(37,211,102,0.15)" : "rgba(96,165,250,0.15)"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: mode === "wa" ? "rgba(37,211,102,0.06)" : "rgba(96,165,250,0.06)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.4rem" }}>{mode === "wa" ? "��" : "✉️"}</span>
            <div>
              <p style={{ fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.9rem", color: mode === "wa" ? "#4ade80" : "#60a5fa" }}>
                {mode === "wa" ? "WhatsApp Message Preview" : "Email Preview"}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(240,232,208,0.4)", marginTop: 2 }}>
                {mode === "wa" ? `To: +91 97358 05602` : `To: ${EMAIL}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%", width: 32, height: 32, color: "rgba(255,255,255,0.5)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.9rem",
          }}>✕</button>
        </div>

        {/* Email subject */}
        {mode === "email" && (
          <div style={{ padding: "12px 24px", borderBottom: "1px solid rgba(96,165,250,0.1)", flexShrink: 0 }}>
            <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.62rem", color: "rgba(96,165,250,0.6)", letterSpacing: "0.2em", marginBottom: 4 }}>SUBJECT</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(240,232,208,0.8)" }}>{subject}</p>
          </div>
        )}

        {/* Editable message */}
        <div style={{ padding: "16px 24px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.62rem", color: "rgba(245,200,66,0.5)", letterSpacing: "0.2em", flexShrink: 0 }}>
            ✏️ EDIT BEFORE SENDING
          </p>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            style={{
              flex: 1,
              minHeight: 220,
              padding: "14px",
              borderRadius: 12,
              border: "1px solid rgba(245,200,66,0.15)",
              background: "rgba(245,200,66,0.03)",
              color: "rgba(240,232,208,0.85)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.82rem",
              lineHeight: 1.65,
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>

        {/* Actions */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: 12, flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "rgba(240,232,208,0.5)",
              fontFamily: "Cinzel, serif", fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            ← Back &amp; Edit
          </button>
          <button
            onClick={handleSend}
            style={{
              flex: 2, padding: "12px",
              borderRadius: 12,
              border: "none",
              background: mode === "wa"
                ? "linear-gradient(135deg, #25D366, #128C7E)"
                : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#fff",
              fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.82rem",
              cursor: "pointer",
              boxShadow: mode === "wa" ? "0 4px 20px rgba(37,211,102,0.4)" : "0 4px 20px rgba(59,130,246,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{mode === "wa" ? "💬" : "✉️"}</span>
            {mode === "wa" ? "Send on WhatsApp" : "Send Email"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────
export default function ConsultationForm({ onClose }) {
  const [form, setForm] = useState({
    name: "", phone: "", dob: "", tob: "", pob: "", problem: "", message: "",
  })
  const [preview, setPreview] = useState(null) // "wa" | "email" | null
  const [errors, setErrors] = useState({})

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.dob.trim()) e.dob = "Date of birth is required"
    if (!form.problem) e.problem = "Please select your concern"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePreview = (mode) => {
    if (!validate()) return
    setPreview(mode)
  }

  const focusStyle = {
    borderColor: "rgba(245,200,66,0.5)",
    boxShadow: "0 0 0 3px rgba(245,200,66,0.08)",
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(14px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 640,
            maxHeight: "92vh",
            overflowY: "auto",
            borderRadius: 28,
            background: "linear-gradient(160deg, rgba(6,0,14,0.99), rgba(4,4,24,0.99))",
            border: "1px solid rgba(245,200,66,0.2)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 0 80px rgba(245,200,66,0.08), 0 40px 80px rgba(0,0,0,0.8)",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid rgba(245,200,66,0.1)",
            display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 10,
            background: "rgba(6,0,14,0.98)",
            backdropFilter: "blur(20px)",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: "1.6rem", filter: "drop-shadow(0 0 8px rgba(245,200,66,0.5))" }}>🔮</span>
                <h2 style={{
                  fontFamily: "Cinzel Decorative, serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #FFE066, #F5C842)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Book Consultation
                </h2>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(240,232,208,0.5)", lineHeight: 1.5 }}>
                Fill your details &rarr; Preview &amp; edit message &rarr; Send via WhatsApp or Email
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%", width: 36, height: 36, color: "rgba(255,255,255,0.5)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", flexShrink: 0,
              }}
            >✕</button>
          </div>

          {/* Form body */}
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Row 1: Name + Phone */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Your Name" required>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.name ? "rgba(248,113,113,0.5)" : inputStyle.borderColor }}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e => { e.target.style.borderColor = errors.name ? "rgba(248,113,113,0.5)" : "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
                />
                {errors.name && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#f87171", marginTop: 2 }}>{errors.name}</p>}
              </Field>
              <Field label="Phone Number" hint="For callback if needed">
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  style={inputStyle}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e => { e.target.style.borderColor = "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
                />
              </Field>
            </div>

            {/* Row 2: DOB + TOB */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Date of Birth" required hint="DD/MM/YYYY">
                <input
                  type="text"
                  placeholder="e.g. 15/08/1990"
                  value={form.dob}
                  onChange={e => set("dob", e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.dob ? "rgba(248,113,113,0.5)" : inputStyle.borderColor }}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e => { e.target.style.borderColor = errors.dob ? "rgba(248,113,113,0.5)" : "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
                />
                {errors.dob && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#f87171", marginTop: 2 }}>{errors.dob}</p>}
              </Field>
              <Field label="Time of Birth" hint="Exact time if known">
                <input
                  type="text"
                  placeholder="e.g. 10:30 AM"
                  value={form.tob}
                  onChange={e => set("tob", e.target.value)}
                  style={inputStyle}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e => { e.target.style.borderColor = "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
                />
              </Field>
            </div>

            {/* Place of Birth */}
            <Field label="Place of Birth" hint="City, State, Country">
              <input
                type="text"
                placeholder="e.g. Kolkata, West Bengal, India"
                value={form.pob}
                onChange={e => set("pob", e.target.value)}
                style={inputStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => { e.target.style.borderColor = "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
              />
            </Field>

            {/* Concern */}
            <Field label="Your Concern" required>
              <select
                value={form.problem}
                onChange={e => set("problem", e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: errors.problem ? "rgba(248,113,113,0.5)" : inputStyle.borderColor,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23F5C842' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: 36,
                }}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => { e.target.style.borderColor = errors.problem ? "rgba(248,113,113,0.5)" : "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
              >
                {PROBLEMS.map(p => (
                  <option key={p.value} value={p.value} style={{ background: "#04000E", color: "#F0E8D0" }}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.problem && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#f87171", marginTop: 2 }}>{errors.problem}</p>}
            </Field>

            {/* Message */}
            <Field label="Describe Your Problem" hint="The more detail you share, the better Pandit Ji can help you">
              <textarea
                placeholder="e.g. I have been facing financial difficulties for the past 2 years. My business is not growing despite hard work. I want to know the astrological reason and remedy..."
                value={form.message}
                onChange={e => set("message", e.target.value)}
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 100,
                  lineHeight: 1.6,
                }}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => { e.target.style.borderColor = "rgba(245,200,66,0.2)"; e.target.style.boxShadow = "none" }}
              />
            </Field>

            {/* Info strip */}
            <div style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(245,200,66,0.04)",
              border: "1px solid rgba(245,200,66,0.12)",
              display: "flex", alignItems: "flex-start", gap: 10,
            }}>
              <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>💡</span>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(240,232,208,0.55)", lineHeight: 1.6 }}>
                After clicking below, you can <strong style={{ color: "rgba(245,200,66,0.8)" }}>review and edit</strong> the message before sending.
                Your details are never stored — they go directly to Pandit Ji.
              </p>
            </div>

            {/* Send buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreview("wa")}
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  color: "#fff",
                  fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.8rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>💬</span>
                WhatsApp
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreview("email")}
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  color: "#fff",
                  fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.8rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>✉️</span>
                Email
              </motion.button>
            </div>

            {/* Direct call */}
            <div style={{ textAlign: "center", paddingTop: 4 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(240,232,208,0.35)", marginBottom: 8 }}>
                — or call directly —
              </p>
              <a
                href="tel:9434999869"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.82rem",
                  color: "#F5C842",
                  padding: "10px 24px",
                  borderRadius: 9999,
                  border: "1px solid rgba(245,200,66,0.3)",
                  background: "rgba(245,200,66,0.05)",
                  textDecoration: "none",
                }}
              >
                📞 +91 94349 99869
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Message preview modal */}
      <AnimatePresence>
        {preview && (
          <MessagePreview
            form={form}
            mode={preview}
            onClose={() => setPreview(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
