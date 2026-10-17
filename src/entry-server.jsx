import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used at build time only (scripts/prerender.mjs) so search engines get real HTML
export function render() {
  return renderToString(<App />)
}
