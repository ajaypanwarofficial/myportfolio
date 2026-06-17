import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL

const GARAGE_ITEMS = [
  { brand: 'ChatGPT', file: `${BASE}videos/work1.mp4`, instagram: 'https://www.instagram.com/reel/DVV1D6HEnaz/' },
  { brand: 'Wint Wealth', file: `${BASE}videos/work2.mp4`, instagram: 'https://www.instagram.com/reel/DZNC0msP2QC/' },
  { brand: 'ChatGPT', file: `${BASE}videos/work3.mp4`, instagram: 'https://www.instagram.com/reel/DSAQUdtkgJe/' },
  { brand: 'Mission Busi', file: `${BASE}videos/work4.mp4`, instagram: 'https://www.instagram.com/reel/DRloDL2EsV7/' },
  { brand: 'ChatGPT', file: `${BASE}videos/chatgpt2.mp4`, instagram: 'https://www.instagram.com/reel/DYR8J5uPKz0/' },
  { brand: 'ChatGPT', file: `${BASE}videos/chatgpt3.mp4`, instagram: 'https://www.instagram.com/reel/DZH5qoFvKJ5/' },
  { brand: 'Ather', file: `${BASE}videos/ather.mp4`, instagram: 'https://www.instagram.com/reel/C3sLlKSy1wG/' },
  { brand: 'Jio', file: `${BASE}videos/jio.mp4`, instagram: 'https://www.instagram.com/reel/C-C_1guyz4d/' },
  { brand: 'TVS', file: `${BASE}videos/tvs.mp4`, instagram: 'https://www.instagram.com/reel/DDrWfVtzvV6/' },
  { brand: 'Jagruk Journal', file: `${BASE}videos/jagruk.mp4`, instagram: 'https://www.instagram.com/reel/DSZ-4p7EuNE/' },
  { brand: 'Angel One', file: `${BASE}videos/angelone.mp4`, instagram: 'https://www.instagram.com/reel/DTfiU7pkkIw/' },
  { brand: 'MG', file: `${BASE}videos/mg.mp4`, instagram: 'https://www.instagram.com/reel/C5iBQz7ygu2/' },
]

function VideoCard({ item, onPlay }) {
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
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="garage-card">
      <div className="garage-card-media">
        <video ref={ref} src={item.file} muted loop playsInline />
        <div className="garage-card-overlay">
          <button className="garage-card-watch" onClick={() => onPlay(item.file)}>
            Watch
          </button>
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

const QUOTE_WORDS = "I make ads people actually watch.".split(' ')

function AnimatedQuote() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % QUOTE_WORDS.length)
    }, 750)
    return () => clearInterval(t)
  }, [])

  return (
    <h1 className="hero-quote">
      {QUOTE_WORDS.map((word, i) => (
        <span key={i} className={`word ${i === activeIdx ? 'highlight' : 'dim'}`}>
          {word}{' '}
        </span>
      ))}
    </h1>
  )
}

function VideoPlayer({ file, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div className="video-player-modal" onClick={(e) => e.stopPropagation()}>
        <button className="video-player-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <video src={file} controls autoPlay playsInline />
      </div>
    </div>
  )
}

function IntroWipe() {
  const sectionRef = useRef(null)
  const topLayerRef = useRef(null)
  const cutoutRef = useRef(null)
  const glowRunRef = useRef(null)
  const topOverlayRef = useRef(null)
  const topBadgeRef = useRef(null)
  const backlightRef = useRef(null)
  const cutoutBottomRef = useRef(null)
  const glowBottomRef = useRef(null)
  const bottomBacklightRef = useRef(null)
  const bottomBadgeRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const topLayer = topLayerRef.current
    const cutout = cutoutRef.current
    const glowRun = glowRunRef.current
    const topOverlay = topOverlayRef.current
    const topBadge = topBadgeRef.current
    const backlight = backlightRef.current
    const cutoutBottom = cutoutBottomRef.current
    const glowBottom = glowBottomRef.current
    const bottomBacklight = bottomBacklightRef.current
    const bottomBadge = bottomBadgeRef.current
    if (!section || !topLayer) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: true,
      },
    })

    tl.set(topLayer, { clipPath: 'inset(0 0 0 0)' })
    tl.set(topBadge, { opacity: 0 })
    tl.set(glowRun, { opacity: 0, '--glow-angle': '10deg' })
    tl.set(backlight, { opacity: 0 })
    tl.set(bottomBadge, { opacity: 0 })
    tl.set(glowBottom, { opacity: 0, '--glow-angle': '10deg' })
    tl.set(bottomBacklight, { opacity: 0 })

    tl.to(cutout, { opacity: 1, scale: 1.025, duration: 0.5, ease: 'power2.out' }, 0)
    tl.to(topOverlay, { opacity: 0.7, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to(backlight, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)

    tl.to(glowRun, {
      opacity: 0.75,
      '--glow-angle': '380deg',
      duration: 1.0,
      ease: 'power2.inOut',
    }, 0.1)

    tl.to(topBadge, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.2)

    tl.to(glowRun, {
      opacity: 0.08,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.8)

    tl.to(topLayer, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'none' }, 0.5)

    tl.to(cutoutBottom, { opacity: 1, scale: 1.015, duration: 0.5, ease: 'power2.out' }, 0.65)
    tl.to(glowBottom, { opacity: 0.5, '--glow-angle': '200deg', duration: 0.6, ease: 'power2.out' }, 0.75)
    tl.to(bottomBacklight, { opacity: 0.6, duration: 0.5, ease: 'power2.out' }, 0.7)
    tl.to(bottomBadge, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.2)

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="intro-wipe" id="intro">
      <div className="bottom-layer">
        <img src={`${BASE}adult-3904.jpg`} alt="Adult" className="layer-image" />
        <div className="cutout-wrapper cutout-bottom-wrapper">
          <div ref={glowBottomRef} className="cutout-glow-run">
            <img src={`${BASE}adult-cutout.png`} alt="" className="cutout-glow-image" />
          </div>
          <div ref={bottomBacklightRef} className="backlight" />
          <img ref={cutoutBottomRef} src={`${BASE}adult-cutout.png`} alt="" className="cutout-subject cutout-bottom" />
        </div>
        <div className="layer-overlay" />
        <div className="layer-text bottom-text">
          <div ref={bottomBadgeRef} className="text-badge">
            <p className="bottom-text-paragraph">Although I have grown up a little bit, I try to preserve that childlike quality. It&apos;s not easy, but that&apos;s the only thing which keeps it fun. I read somewhere on the internet that an artist is basically a kid who survived&hellip; I think I survived.</p>
          </div>
        </div>
      </div>
      <div ref={topLayerRef} className="top-layer">
        <img src={`${BASE}Childhood_2.jpg`} alt="Childhood" className="layer-image" />
        <div className="cutout-wrapper">
          <div ref={glowRunRef} className="cutout-glow-run">
            <img src={`${BASE}childhood-cutout.png`} alt="" className="cutout-glow-image" />
          </div>
          <div ref={backlightRef} className="backlight" />
          <img ref={cutoutRef} src={`${BASE}childhood-cutout.png`} alt="" className="cutout-subject" />
        </div>
        <div ref={topOverlayRef} className="layer-overlay" />
        <div className="layer-glow" />
        <div className="layer-text top-text">
          <div ref={topBadgeRef} className="text-badge">
            <p className="subject-callout">Hi, I&apos;m Ajay.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [playingVideo, setPlayingVideo] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <div className="film-grain" />

      <section className="hero">
        <div className="hero-content">
          <AnimatedQuote />
        </div>
        <div className="hero-bar" />
      </section>

      <section className="garage" id="garage">
        <div className="garage-header">
          <h2>Content Garage</h2>
          <p>stuff i&apos;ve made</p>
        </div>
        <div className="garage-grid">
          {GARAGE_ITEMS.map((item, i) => (
            <VideoCard key={i} item={item} onPlay={setPlayingVideo} />
          ))}
        </div>
      </section>

      <IntroWipe />

      <section className="philosophy" id="philosophy">
        <div className="philosophy-content">
          <h2 className="philosophy-heading">Marketing Philosophy</h2>
          <p>
            I could mention the numbers and achievements from my work, but
            that&apos;s not why you are here. If you need numbers, platforms
            already sell them at a reasonable price. If numbers were everything,
            marketing would be simple — get the most-followed person, pay them,
            done. But branding is beyond numbers. It&apos;s the art of
            communication beyond the viral hook or trends. If you are looking
            for authentic communication, you are at the right place.
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="contact-intro">Best way to contact me is mail.</p>
        <a href="mailto:collabwithajay@gmail.com" className="contact-email">
          collabwithajay@gmail.com
        </a>
        <div className="contact-social">
          <a
            href="https://www.instagram.com/ajaypanwarofficial"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@AjayPanwarOfficial"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Ajay Panwar
      </footer>

      {playingVideo && (
        <VideoPlayer file={playingVideo} onClose={() => setPlayingVideo(null)} />
      )}
    </>
  )
}

export default App
