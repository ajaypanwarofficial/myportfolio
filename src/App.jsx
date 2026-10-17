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
  { brand: 'Art Village Naggar', file: `${BASE}videos/naggar.mp4`, instagram: 'https://www.instagram.com/reel/DFsgamQTBuO/' },
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
        <video
          ref={ref}
          src={item.file}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${item.brand} ad reel by Ajay Panwar`}
        />
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
        {item.brand}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'inline', verticalAlign: 'middle', margin: '0 0 1px 2px' }}
        >
          <path d="M1 9L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 1H9V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (p, a, b) => clamp((p - a) / (b - a))
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const lerp = (a, b, t) => a + (b - a) * t

// Where the photo ends up as a print, in fractions of the image. The cutout is clipped to
// this window on the sides and bottom only, so the head climbs out over the top edge.
const PRINT = {
  desktop: { x: 0.34, y: 0.3, x2: 0.88, y2: 0.96, focus: 0.61, aspect: 16 / 9 },
  mobile: { x: 0.05, y: 0.3, x2: 0.95, y2: 0.97, focus: 0.5, aspect: 9 / 16 },
}

function PrintSet({ setRef, bg, cut, caption }) {
  const webp = (src) => src.replace(/\.(jpg|png)$/, '.webp')
  return (
    <div ref={setRef} className="intro-set">
      <div className="intro-card"><span>{caption}</span></div>
      <div className="intro-win">
        <picture>
          <source srcSet={webp(bg)} type="image/webp" />
          <img src={bg} alt="" loading="lazy" />
        </picture>
      </div>
      <picture>
        <source srcSet={webp(cut)} type="image/webp" />
        <img src={cut} alt="" className="intro-cut" loading="lazy" />
      </picture>
    </div>
  )
}

function IntroWipe({ isMobile }) {
  const sectionRef = useRef(null)
  const kidRef = useRef(null)
  const adultRef = useRef(null)
  const textRef = useRef(null)

  const adultBg = isMobile ? `${BASE}adult-3904-mobile.jpg` : `${BASE}adult-3904.jpg`
  const adultCut = isMobile ? `${BASE}adult-cutout-mobile.png` : `${BASE}adult-cutout.png`
  const childBg = isMobile ? `${BASE}Childhood_2-mobile.jpg` : `${BASE}Childhood_2.jpg`
  const childCut = isMobile ? `${BASE}childhood-cutout-mobile.png` : `${BASE}childhood-cutout.png`

  useEffect(() => {
    const section = sectionRef.current
    const sets = [kidRef.current, adultRef.current]
    const text = textRef.current
    if (!section || !text || sets.some((s) => !s)) return

    const R = isMobile ? PRINT.mobile : PRINT.desktop
    let g = null

    function layout() {
      const w = section.clientWidth
      const h = section.clientHeight
      const cover = w / h > R.aspect
      const fw = cover ? w : h * R.aspect
      const fh = fw / R.aspect
      const left0 = fw > w ? clamp(w / 2 - R.focus * fw, w - fw, 0) : 0
      const top0 = fh > h ? (h - fh) * 0.12 : 0
      const rw = (R.x2 - R.x) * fw
      const foot = 0.06 * fw
      const tall = R.y2 * fh + foot // head top to bottom of the print's white strip
      const c = { x: ((R.x + R.x2) / 2) * fw, y: ((R.y + R.y2) / 2) * fh }
      const stacked = isMobile || w < 900 || w / h < 1.1
      section.classList.toggle('is-stacked', stacked)

      let k, tx, headTop
      if (stacked) {
        headTop = 0.06 * h
        k = Math.min((0.9 * w) / rw, (text.offsetTop - 16 - headTop) / tall)
        tx = w / 2
      } else {
        const textRight = text.offsetLeft + text.offsetWidth
        k = (0.82 * h) / tall
        k = Math.min(k, (w - 32 - textRight - 40) / rw)
        tx = Math.max(0.66 * w, textRight + 40 + (rw * k) / 2)
        headTop = (h - tall * k) / 2
      }
      g = { w, fw, fh, left0, top0, rw, foot, c, k, tx, ty: headTop + c.y * k }

      sets.forEach((s) => {
        s.style.width = `${fw}px`
        s.style.height = `${fh}px`
      })
    }

    function place(set, t, s, rot, dx, open, caption) {
      const r = { x: lerp(0, R.x, open), y: lerp(0, R.y, open), x2: lerp(1, R.x2, open), y2: lerp(1, R.y2, open) }
      const pct = (v) => `${v * 100}%`
      const win = set.querySelector('.intro-win')
      const img = win.querySelector('img')
      const card = set.querySelector('.intro-card')
      const cut = set.querySelector('.intro-cut')
      const b = 0.012 * g.fw * open
      const foot = g.foot * open

      Object.assign(win.style, { left: pct(r.x), top: pct(r.y), width: pct(r.x2 - r.x), height: pct(r.y2 - r.y) })
      Object.assign(img.style, {
        left: pct(-r.x / (r.x2 - r.x)),
        top: pct(-r.y / (r.y2 - r.y)),
        width: pct(1 / (r.x2 - r.x)),
        height: pct(1 / (r.y2 - r.y)),
      })
      Object.assign(card.style, {
        left: `calc(${pct(r.x)} - ${b}px)`,
        top: `calc(${pct(r.y)} - ${b}px)`,
        width: `calc(${pct(r.x2 - r.x)} + ${2 * b}px)`,
        height: `calc(${pct(r.y2 - r.y)} + ${b + foot}px)`,
        opacity: seg(open, 0, 0.15),
      })
      caption.style.fontSize = `${g.foot * 0.42}px`
      caption.style.paddingBottom = `${g.foot * 0.28}px`
      caption.style.opacity = seg(open, 0.75, 1)
      cut.style.clipPath = `inset(0 ${pct(1 - r.x2)} ${pct(1 - r.y2)} ${pct(r.x)})`

      const x = g.left0 + lerp(0, g.tx - g.c.x - g.left0, t) + dx
      const y = g.top0 + lerp(0, g.ty - g.c.y - g.top0, t)
      set.style.transform = `translate(${x}px, ${y}px) translate(${g.c.x}px, ${g.c.y}px) rotate(${rot}deg) scale(${s}) translate(${-g.c.x}px, ${-g.c.y}px)`
    }

    function render(p) {
      if (!g) return
      const [kid, adult] = sets
      const shrink = ease(seg(p, 0.04, 0.34))
      const slide = ease(seg(p, 0.5, 0.82))
      const printW = g.rw * g.k

      place(kid, shrink, lerp(1, g.k, shrink), lerp(0, -3, ease(seg(p, 0.3, 0.82))), -0.08 * printW * slide, shrink, kid.querySelector('span'))
      kid.style.filter = slide > 0 ? `brightness(${lerp(1, 0.5, slide)})` : 'none'

      const offscreen = g.w - (g.tx - printW / 2) + 60
      adult.style.visibility = p < 0.48 ? 'hidden' : 'visible'
      place(adult, 1, g.k, lerp(6, 1.5, slide), lerp(offscreen, 0, slide), 1, adult.querySelector('span'))

      const show = seg(p, 0.22, 0.36)
      text.style.opacity = show
      text.style.transform = `translateY(${(1 - show) * 20}px)`
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => {
        layout()
        render(self.progress)
      },
    })
    layout()
    render(st.progress)

    return () => st.kill()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="intro-wipe" id="intro">
      <PrintSet setRef={kidRef} bg={childBg} cut={childCut} caption="Then" />
      <PrintSet setRef={adultRef} bg={adultBg} cut={adultCut} caption="Now" />
      <div ref={textRef} className="intro-magazine-text">
        <h1 className="intro-magazine-headline">Hi, I&apos;m Ajay</h1>
        <p className="intro-magazine-paragraph">I have grown up a little bit, but I try to preserve that kid. It&apos;s not easy, but that&apos;s what keeps it fun. I read somewhere on the internet that &ldquo;an artist is basically a kid who survived&rdquo; &mdash; I think I survived.</p>
      </div>
    </section>
  )
}

function App() {
  const [playingVideo, setPlayingVideo] = useState(null)
  const [garageExpanded, setGarageExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [garageExpanded])

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
          {GARAGE_ITEMS.map((item, i) => {
            if (isMobile && !garageExpanded && i >= 6) return null
            return <VideoCard key={i} item={item} onPlay={setPlayingVideo} />
          })}
        </div>
        {isMobile && !garageExpanded && GARAGE_ITEMS.length > 5 && (
          <div className="garage-show-more-wrap">
            <button className="garage-show-more" onClick={() => setGarageExpanded(true)}>
              Show more
            </button>
          </div>
        )}
      </section>

      <IntroWipe isMobile={isMobile} />

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
