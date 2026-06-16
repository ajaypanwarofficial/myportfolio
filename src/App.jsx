import { useEffect, useRef, useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL

const GARAGE_ITEMS = [
  {
    brand: 'ChatGPT',
    file: `${BASE}videos/work1.mp4`,
    instagram: 'https://www.instagram.com/reel/DVV1D6HEnaz/?igsh=emJqaXJ2am41cGpi',
  },
  {
    brand: 'Wint Wealth',
    file: `${BASE}videos/work2.mp4`,
    instagram: 'https://www.instagram.com/reel/DZNC0msP2QC/?igsh=MWhuYm52bm43Z21zbw==',
  },
  {
    brand: 'ChatGPT',
    file: `${BASE}videos/work3.mp4`,
    instagram: 'https://www.instagram.com/reel/DSAQUdtkgJe/?igsh=MWJ4b21ocnVyczBtdw==',
  },
  {
    brand: 'Mission Busi',
    file: `${BASE}videos/work4.mp4`,
    instagram: 'https://www.instagram.com/reel/DRloDL2EsV7/?igsh=MWt6bGgybG43MDFobA==',
  },
]

function GarageCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (hovered) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [hovered])

  return (
    <div
      className="garage-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="garage-card-media">
        <video ref={videoRef} src={item.file} muted loop playsInline />
        <div className={`garage-door ${hovered ? 'open' : ''}`}>
          <div className="garage-door-brand">{item.brand}</div>
        </div>
      </div>
      <a
        href={item.instagram}
        target="_blank"
        rel="noreferrer"
        className="garage-card-link"
      >
        {item.brand} ↗
      </a>
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
          <p className="hero-quote">I make ads people actually watch.</p>
          <span className="hero-scroll">scroll ↓</span>
        </div>
      </section>

      <section className="intro">
        <div className="intro-slide">
          <div className="intro-image">
            <img src={`${BASE}childhood.jpg`} alt="Childhood photo" />
          </div>
          <div className="intro-text">
            <h2>That&apos;s me!</h2>
          </div>
        </div>
        <div className="intro-slide">
          <div className="intro-image">
            <img src={`${BASE}recent.jpg`} alt="Recent photo" />
          </div>
          <div className="intro-text">
            <h2>but now I look like this</h2>
          </div>
        </div>
      </section>

      <section className="garage" id="garage">
        <div className="garage-header">
          <h2>Content Garage</h2>
          <p>stuff i&apos;ve made</p>
        </div>
        <div className="garage-grid">
          {GARAGE_ITEMS.map((item, i) => (
            <GarageCard key={i} item={item} />
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Let&apos;s create</h2>
        <p>Looking for a video that actually stops the scroll?</p>
        <a href="mailto:collabwithajay@gmail.com" className="contact-email">
          collabwithajay@gmail.com
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
