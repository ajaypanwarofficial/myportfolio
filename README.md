# Ajay Panwar — Portfolio

Personal portfolio site for **Ajay Panwar**, a video content creator and ad filmmaker.

> *"I make ads people actually watch."*

Built with **React + Vite**. Deployed to **GitHub Pages** via GitHub Actions.

## Sections

- **Hero** — Full-viewport video background with tagline
- **Brands** — Brands worked with (ChatGPT, Wint Wealth, Ather, Jio)
- **Selected Work** — Autoplaying 9:16 video reels with IntersectionObserver
- **Contact** — Email & social links (Instagram, YouTube, LinkedIn)

## Tech Stack

| Layer | |
|---|---|
| Framework | React 18 |
| Build | Vite 5 |
| Linting | ESLint 9 |
| Fonts | Inter + Playfair Display (Google Fonts) |
| CI/CD | GitHub Actions → GitHub Pages |

## Development

```bash
# Install dependencies
npm install

# Start dev server (HMR at localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

## How to Update the Website (Commit & Push to GitHub)

### Using GitHub Desktop (Easiest — No terminal needed)

1. Open **GitHub Desktop**
2. You'll see a list of changed files on the left
3. At the bottom-left, write a short description of what you changed (e.g., "Updated video reel" or "Fixed contact link")
4. Click **"Commit to main"**
5. Click **"Push origin"** (top bar)
6. That's it! The website will update automatically in a few minutes.

### Using Terminal

```bash
# 1. See what files changed
git status

# 2. Stage all changes
git add .

# 3. Commit with a message
git commit -m "what you changed"

# 4. Push to GitHub
git push origin main
```

Once pushed, the site builds and deploys automatically via GitHub Actions. Wait 2–3 minutes and visit your live site.
