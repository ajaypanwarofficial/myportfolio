import { useEffect, useRef } from 'react'
import './App.css'

const BRANDS = [
  { name: 'ChatGPT' },
  { name: 'Wint Wealth' },
  { name: 'Ather' },
  { name: 'Jio' },
]

const BASE = import.meta.env.BASE_URL

const WORK = [
  { label: 'Brand Film', file: `${BASE}videos/work1.mp4` },
  { label: 'Product Launch', file: `${BASE}videos/work2.mp4` },
  { label: 'Campaign', file: `${BASE}videos/work3.mp4` },
  { label: 'Social Cut', file: `${BASE}videos/work4.mp4` },
]

function VideoCard({ src, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {})
          } else {
            el.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="work-card">
      <video ref={ref} src={src} muted loop playsInline />
      <span className="work-card-label">{label}</span>
    </div>
  )
}

function App() {
  return (
    <>
      <section className="hero">
        <video
          className="hero-video"
          src={`${BASE}videos/work1.mp4`}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Ajay Panwar</h1>
          <p>
            I make ads people actually watch.
            <br />
            <span className="brand-chalk">ChatGPT · Wint Wealth · Ather · Jio</span>
          </p>
          <span className="hero-scroll">scroll to see work ↓</span>
        </div>
      </section>

      <section className="brands" id="brands">
        <div className="brands-header">
          <h2>Brands</h2>
        </div>
        <div className="brands-grid">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="brand-item">
              {brand.name}
            </div>
          ))}
        </div>
      </section>

      <section className="work" id="work">
        <div className="work-header">
          <h2>Selected Work</h2>
          <p>videos autoplay as you scroll</p>
        </div>
        <div className="work-grid">
          {WORK.map((item) => (
            <VideoCard key={item.file} src={item.file} label={item.label} />
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Let's create</h2>
        <p>
          Looking for a video that actually stops the scroll?
        </p>
        <a href="mailto:hello@ajaypanwar.com" className="contact-email">
          hello@ajaypanwar.com
        </a>
        <div className="contact-social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            IG
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            YT
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LI
          </a>
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Ajay Panwar
      </footer>
    </>
  )
}

export default App
