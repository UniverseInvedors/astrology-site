import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import AstrologyUniverse from './components/AstrologyUniverse'
import Services from './components/Services'
import Credentials from './components/Credentials'
import DosDonts from './components/DosDonts'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919735805602?text=Namaste%20Pandit%20Ji%2C%20I%20would%20like%20to%20consult%20you."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn pulse-gold"
      title="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 50,
        width: 56, height: 56, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', boxShadow: '0 4px 24px rgba(37,211,102,0.4)',
        textDecoration: 'none',
      }}
    >
      💬
    </a>
  )
}

function FloatingCall() {
  return (
    <a
      href="tel:9434999869"
      className="call-btn"
      title="Call Now"
      style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 50,
        width: 56, height: 56, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', boxShadow: '0 4px 24px rgba(255,215,0,0.35)',
        textDecoration: 'none',
      }}
    >
      📞
    </a>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <About />
      <AstrologyUniverse />
      <Services />
      <Credentials />
      <DosDonts />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <FloatingCall />
    </div>
  )
}

