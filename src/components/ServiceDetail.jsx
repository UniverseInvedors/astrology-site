import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

const WA = '919735805602'

// Per-service WhatsApp messages in all 3 languages
const SERVICE_WA_MSG = {
  bn: [
    'নমস্কার পণ্ডিতজি 🙏 আমি আমার কুণ্ডলী বিশ্লেষণের জন্য পরামর্শ নিতে চাই। আমার জন্মকুণ্ডলীর গ্রহ, ঘর ও দোষ সম্পর্কে বিস্তারিত জানতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি ভবিষ্যদ্বাণী পরামর্শের জন্য যোগাযোগ করছি। আমার ক্যারিয়ার, বিবাহ ও জীবনের গুরুত্বপূর্ণ ঘটনা সম্পর্কে জানতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি আমার জীবনের সমস্যা সমাধানের জন্য পরামর্শ চাই। আগামী বাধা ও প্রতিকার সম্পর্কে জানতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি প্রেম ও বিবাহ বিষয়ক পরামর্শের জন্য যোগাযোগ করছি। কুণ্ডলী মিল ও সম্পর্কের সমস্যা নিয়ে কথা বলতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি ক্যারিয়ার ও ব্যবসা বিষয়ক পরামর্শের জন্য যোগাযোগ করছি। সঠিক পথ ও সাফল্যের উপায় জানতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি স্বাস্থ্য জ্যোতিষ পরামর্শের জন্য যোগাযোগ করছি। আমার স্বাস্থ্য সমস্যার জ্যোতিষীয় কারণ ও প্রতিকার জানতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি রত্ন পরামর্শের জন্য যোগাযোগ করছি। আমার গ্রহ অনুযায়ী সঠিক রত্ন ও ধারণ পদ্ধতি জানতে চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি বাস্তু ও পূজা পরামর্শের জন্য যোগাযোগ করছি। বাস্তু দোষ সংশোধন ও পূজার নির্দেশনা চাই।',
    'নমস্কার পণ্ডিতজি 🙏 আমি সংখ্যাতত্ত্ব পরামর্শের জন্য যোগাযোগ করছি। নাম সংশোধন ও ভাগ্যসংখ্যা বিশ্লেষণ জানতে চাই।',
  ],
  en: [
    'Namaste Pandit Ji 🙏 I would like to consult you for Kundli Reading. I want to understand my birth chart — planets, houses, and doshas in detail.',
    'Namaste Pandit Ji 🙏 I would like a Life Prediction consultation. I want to know about my career, marriage, and important life events.',
    'Namaste Pandit Ji 🙏 I need help with Problem Resolution. I want to identify upcoming obstacles and receive powerful remedies.',
    'Namaste Pandit Ji 🙏 I would like to consult about Love & Marriage. I need kundli matching and relationship guidance.',
    'Namaste Pandit Ji 🙏 I need Career & Business consultation. Please guide me on the right career path and business success.',
    'Namaste Pandit Ji 🙏 I would like Health Astrology consultation. I want to know the astrological reasons for my health issues.',
    'Namaste Pandit Ji 🙏 I need Gemstone Therapy consultation. Please recommend the right gemstone for my planetary chart.',
    'Namaste Pandit Ji 🙏 I need Vastu & Remedies consultation. Please guide me on Vastu corrections and spiritual remedies.',
    'Namaste Pandit Ji 🙏 I would like Numerology consultation. I want name correction and lucky number analysis.',
  ],
  hi: [
    'नमस्ते पंडित जी 🙏 मैं कुंडली विश्लेषण के लिए परामर्श लेना चाहता/चाहती हूं। मेरी जन्म कुंडली के ग्रह, भाव और दोष के बारे में विस्तार से जानना चाहता/चाहती हूं।',
    'नमस्ते पंडित जी 🙏 मैं भविष्यवाणी परामर्श के लिए संपर्क कर रहा/रही हूं। करियर, विवाह और जीवन की महत्वपूर्ण घटनाओं के बारे में जानना चाहता/चाहती हूं।',
    'नमस्ते पंडित जी 🙏 मुझे समस्या समाधान के लिए परामर्श चाहिए। आने वाली बाधाओं और उपायों के बारे में जानना चाहता/चाहती हूं।',
    'नमस्ते पंडित जी 🙏 मैं प्रेम और विवाह के बारे में परामर्श लेना चाहता/चाहती हूं। कुंडली मिलान और संबंध मार्गदर्शन चाहिए।',
    'नमस्ते पंडित जी 🙏 मुझे करियर और व्यवसाय परामर्श चाहिए। सही करियर पथ और व्यापार में सफलता के बारे में मार्गदर्शन चाहिए।',
    'नमस्ते पंडित जी 🙏 मैं स्वास्थ्य ज्योतिष परामर्श लेना चाहता/चाहती हूं। मेरी स्वास्थ्य समस्याओं के ज्योतिषीय कारण और उपाय जानना चाहता/चाहती हूं।',
    'नमस्ते पंडित जी 🙏 मुझे रत्न परामर्श चाहिए। मेरी कुंडली के अनुसार सही रत्न और धारण विधि बताएं।',
    'नमस्ते पंडित जी 🙏 मुझे वास्तु और उपाय परामर्श चाहिए। वास्तु दोष सुधार और आध्यात्मिक उपायों के बारे में मार्गदर्शन चाहिए।',
    'नमस्ते पंडित जी 🙏 मैं अंक ज्योतिष परामर्श लेना चाहता/चाहती हूं। नाम सुधार और भाग्य संख्या विश्लेषण जानना चाहता/चाहती हूं।',
  ],
}

const SERVICE_META = [
  { icon: '📿', accent: '#FFD700', gradient: 'linear-gradient(135deg, rgba(255,215,0,0.12) 0%, rgba(255,140,0,0.06) 100%)', bg: 'rgba(255,215,0,0.04)' },
  { icon: '🔮', accent: '#9C27B0', gradient: 'linear-gradient(135deg, rgba(156,39,176,0.12) 0%, rgba(103,58,183,0.06) 100%)', bg: 'rgba(156,39,176,0.04)' },
  { icon: '⚡', accent: '#FF3B3B', gradient: 'linear-gradient(135deg, rgba(255,59,59,0.12) 0%, rgba(233,30,99,0.06) 100%)', bg: 'rgba(255,59,59,0.04)' },
  { icon: '💑', accent: '#FF69B4', gradient: 'linear-gradient(135deg, rgba(255,105,180,0.12) 0%, rgba(236,64,122,0.06) 100%)', bg: 'rgba(255,105,180,0.04)' },
  { icon: '💼', accent: '#2196F3', gradient: 'linear-gradient(135deg, rgba(33,150,243,0.12) 0%, rgba(3,169,244,0.06) 100%)', bg: 'rgba(33,150,243,0.04)' },
  { icon: '🏥', accent: '#4CAF50', gradient: 'linear-gradient(135deg, rgba(76,175,80,0.12) 0%, rgba(67,160,71,0.06) 100%)', bg: 'rgba(76,175,80,0.04)' },
  { icon: '💎', accent: '#00BCD4', gradient: 'linear-gradient(135deg, rgba(0,188,212,0.12) 0%, rgba(0,172,193,0.06) 100%)', bg: 'rgba(0,188,212,0.04)' },
  { icon: '🕯️', accent: '#FF9800', gradient: 'linear-gradient(135deg, rgba(255,152,0,0.12) 0%, rgba(251,140,0,0.06) 100%)', bg: 'rgba(255,152,0,0.04)' },
  { icon: '🌟', accent: '#673AB7', gradient: 'linear-gradient(135deg, rgba(103,58,183,0.12) 0%, rgba(94,53,177,0.06) 100%)', bg: 'rgba(103,58,183,0.04)' },
]

const CONNECT_LABEL = {
  bn: 'পণ্ডিতজির সাথে WhatsApp-এ কথা বলুন',
  en: 'Connect with Pandit Ji on WhatsApp',
  hi: 'पंडित जी से WhatsApp पर बात करें',
}
const BACK_LABEL = {
  bn: '← ফিরে যান',
  en: '← Back',
  hi: '← वापस',
}
const CONSULT_LABEL = {
  bn: 'এখনই পরামর্শ নিন',
  en: 'Consult Now',
  hi: 'अभी परामर्श लें',
}
const WHATSAPP_LABEL = {
  bn: 'WhatsApp-এ পাঠান',
  en: 'Send on WhatsApp',
  hi: 'WhatsApp पर भेजें',
}
const EDIT_LABEL = {
  bn: 'বার্তা সম্পাদনা করুন',
  en: 'Edit Message',
  hi: 'संदेश संपादित करें',
}

export default function ServiceDetail({ serviceIndex, onClose }) {
  const lang = useLang()
  const t = T[lang]?.services || T.bn.services
  const service = t.items[serviceIndex]
  const meta = SERVICE_META[serviceIndex]
  const msgs = SERVICE_WA_MSG[lang] || SERVICE_WA_MSG.bn
  const [msg, setMsg] = React.useState(msgs[serviceIndex] || msgs[0])
  const [editing, setEditing] = React.useState(false)

  if (!service) return null

  const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 800,
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(18px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(12px, 3vw, 24px)',
          overflowY: 'auto',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 32 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 560,
            borderRadius: 28,
            background: 'linear-gradient(160deg, rgba(6,0,14,0.99), rgba(4,4,24,0.99))',
            border: `1px solid ${meta.accent}35`,
            backdropFilter: 'blur(24px)',
            boxShadow: `0 0 80px ${meta.accent}15, 0 40px 80px rgba(0,0,0,0.8)`,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            padding: 'clamp(20px, 4vw, 32px)',
            background: meta.gradient,
            borderBottom: `1px solid ${meta.accent}20`,
            position: 'relative',
          }}>
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>

            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: 12, filter: `drop-shadow(0 0 12px ${meta.accent}80)` }}>
              {meta.icon}
            </div>
            <h2 style={{
              fontFamily: "'Hind Siliguri', 'Baloo Da 2', 'Cinzel', serif",
              fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
              fontWeight: 700,
              color: meta.accent,
              marginBottom: 10,
              lineHeight: 1.3,
            }}>
              {service.title}
            </h2>
            <p style={{
              fontFamily: "'Hind Siliguri', 'Hind', 'Raleway', sans-serif",
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(0.88rem, 2vw, 1rem)',
              lineHeight: 1.75,
            }}>
              {service.desc}
            </p>
          </div>

          {/* Message section */}
          <div style={{ padding: 'clamp(20px, 4vw, 28px)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 12,
            }}>
              <p style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'rgba(245,200,66,0.6)',
                textTransform: 'uppercase',
              }}>
                💬 {EDIT_LABEL[lang]}
              </p>
              <button
                onClick={() => setEditing(e => !e)}
                style={{
                  padding: '4px 12px', borderRadius: 999,
                  border: `1px solid ${meta.accent}40`,
                  background: editing ? `${meta.accent}15` : 'transparent',
                  color: meta.accent,
                  fontSize: '0.65rem',
                  fontFamily: 'Cinzel, serif',
                  cursor: 'pointer',
                }}
              >
                {editing ? '✓ Done' : '✏️ Edit'}
              </button>
            </div>

            {editing ? (
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: 140,
                  padding: '14px',
                  borderRadius: 14,
                  border: `1px solid ${meta.accent}30`,
                  background: `${meta.accent}06`,
                  color: 'rgba(240,232,208,0.88)',
                  fontFamily: "'Hind Siliguri', 'Hind', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
            ) : (
              <div style={{
                padding: '14px 16px',
                borderRadius: 14,
                background: `${meta.accent}06`,
                border: `1px solid ${meta.accent}20`,
                color: 'rgba(240,232,208,0.75)',
                fontFamily: "'Hind Siliguri', 'Hind', sans-serif",
                fontSize: '0.88rem',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}>
                {msg}
              </div>
            )}

            {/* Pandit Ji info strip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginTop: 16, marginBottom: 20,
              padding: '12px 16px',
              borderRadius: 14,
              background: 'rgba(255,215,0,0.04)',
              border: '1px solid rgba(255,215,0,0.12)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                overflow: 'hidden', flexShrink: 0,
                border: '2px solid rgba(255,215,0,0.4)',
              }}>
                <img src="/pandit_primary.jpeg" alt="Pandit Ji"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#FFD700', fontWeight: 700 }}>
                  Pandit Subrata Kumar Mukherjee
                </p>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(255,215,0,0.5)', letterSpacing: '0.1em' }}>
                  +91 97358 05602 · WhatsApp
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: 'clamp(14px, 3vw, 18px)',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff',
                fontFamily: "'Hind Siliguri', 'Baloo Da 2', 'Cinzel', serif",
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                textDecoration: 'none',
                boxShadow: '0 6px 28px rgba(37,211,102,0.45)',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>💬</span>
              {WHATSAPP_LABEL[lang]}
            </motion.a>

            <button
              onClick={onClose}
              style={{
                display: 'block', width: '100%', marginTop: 10,
                padding: '12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              {BACK_LABEL[lang]}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
