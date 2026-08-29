# Dare Abinde Portfolio

This is my personal portfolio as a product designer and UX researcher working across research, product strategy, interaction design, and AI-assisted product development.

Live site: [dareabinde.com](https://dareabinde.com)

## What This Is

I built this portfolio to present selected product design and research work across finance, mobility, sustainability, civic safety, and student decision support. Beyond being a visual portfolio, it is also a working product surface with responsive layouts, motion, video prototypes, and a lightweight personal AI assistant.

The site reflects how I like to work: starting from human insight, turning research into product direction, and carrying that direction through interface design, prototyping, and implementation.

## Featured Work

- **ICA Banken** — multilingual mobile banking redesign for international users in Sweden.
- **Calmotion** — AI mobility assistant concept spanning HUD, voice, and mobile experiences.
- **SafeMap** — counter-mapping tool for turning harassment reports into collective evidence.
- **Climate Hub** — sustainability engagement platform designed with Biotopia Uppsala.
- **Landa** — live decision-support tool for prospective international students considering Sweden.

## Role And Contribution

Across the portfolio and featured projects, my contribution includes:

- UX research and synthesis
- Product framing and opportunity mapping
- Journey maps, service models, and information architecture
- Wireframes, prototypes, and high-fidelity interface design
- Responsive front-end implementation with AI-assisted development
- Case-study storytelling, visual systems, and interaction details

## DARE LLM

The portfolio includes **DARE LLM**, a site-wide personal assistant that answers concise questions about my background, projects, skills, research interests, and availability.

I kept the assistant intentionally scoped:

- It answers in my first-person voice.
- It keeps responses brief and grounded in a server-side knowledge source.
- It does not expose prompts, implementation details, API keys, logs, or private configuration.
- It uses approved contextual media only when directly relevant.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- Lenis
- HLS.js / Mux playback
- Netlify Functions
- Netlify Blobs
- OpenRouter Chat Completions

## Local Development

Install dependencies:

```bash
npm install
```

Start the local Netlify/Vite development server:

```bash
npm run dev
```

For Vite only:

```bash
npm run dev:vite
```

Build for production:

```bash
npm run build
```

## Environment Variables

The AI assistant requires server-side environment variables. Keep these out of source control.

```bash
OPENROUTER_API_KEY=
DARE_LLM_PRIMARY_MODEL=
DARE_LLM_FALLBACK_MODEL=
```

Optional diagnostics can be enabled during testing, but should stay off for normal production use.

```bash
DEBUG_AI_RESPONSES=true
```

## Repository Notes

This repository is public for portfolio review. It should not contain secrets, API keys, private transcripts, local Netlify state, or user data.

Some implementation files are intentionally pragmatic because the site evolved through detailed visual design iterations into production-ready responsive pages. The repository is best read as a product-design portfolio implementation rather than a general-purpose component library.
