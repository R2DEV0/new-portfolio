# Kevin R. Chancey - Developer Portfolio

A modern, responsive developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features dark/light theme toggle, smooth animations, and a professional design.

## Features

- 🌓 **Dark/Light Theme** - Toggle between themes with persistent storage
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 14 and modern best practices
- 🎨 **Modern Design** - Clean, professional, and fun UI with smooth animations
- 📊 **Skills Visualization** - Interactive, categorized skill pills with proficiency badges
- 🚀 **Project Showcase** - Detailed project cards with metrics, technologies, and highlights
- 🎓 **Education Section** - Academic achievements and certifications
- 🖥️ **Interactive Terminal** - A real, keyboard-driven terminal (`kevin@kevtech:~`) with typed
  commands (`help`, `about`, `experience`, `projects`, `stats`, `neofetch`, easter eggs) that work
  **offline**, plus natural-language questions answered by OpenAI when a key is set and by a built-in
  local knowledge base when it isn't. Full-screen on mobile, floating window on desktop. Open it with
  the ›_ button, the "Open Terminal" hero CTA, or the `` ` `` key.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenAI API (GPT-4o-mini)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kevin_profile
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up environment variables:
```bash
# Create a .env.local file in the root directory and add your OpenAI API key.
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here
```
> The terminal assistant works **without** an API key — it falls back to a built-in local
> knowledge base. Add `OPENAI_API_KEY` only if you want free-form questions answered by GPT.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Netlify

This project is configured for easy deployment to Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. (Optional) Add your environment variable in Netlify:
   - Go to Site settings → Environment variables
   - Add `OPENAI_API_KEY` with your OpenAI API key
4. Netlify will automatically detect the Next.js configuration
5. The build will run automatically on each push

The `netlify.toml` file is already configured with the Next.js plugin.

**Note**: `OPENAI_API_KEY` is optional — the terminal answers from a local knowledge base without it.
Add the key only to enable GPT-powered free-form answers.

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles and theme variables
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Main page component
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts  # OpenAI API route
├── components/
│   ├── About.tsx         # About me section (stats, bio, timeline)
│   ├── Terminal.tsx      # Interactive terminal assistant (offline-first)
│   ├── Education.tsx     # Education and certifications
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero/landing section
│   ├── Navbar.tsx        # Navigation bar
│   ├── Projects.tsx      # Projects showcase
│   ├── Skills.tsx        # Skills visualization
│   ├── ThemeProvider.tsx # Theme context provider
│   └── ThemeToggle.tsx   # Theme toggle button
├── data/
│   ├── education.ts      # Education data
│   ├── projects.ts       # Projects data
│   └── skills.ts         # Skills data
└── public/               # Static assets
```

## Customization

### Update Personal Information

Edit the following files to update your information:
- `components/About.tsx` - About section content
- `components/Hero.tsx` - Hero section and social links
- `data/skills.ts` - Your skills and proficiency levels
- `data/education.ts` - Education and certifications
- `data/projects.ts` - Your projects and work experience

### Update Social Links

Edit the social links in:
- `components/Hero.tsx` - Hero section social icons
- `components/Footer.tsx` - Footer social icons

### Customize Colors

Edit `tailwind.config.ts` to customize the color scheme and theme colors.

## License

This project is open source and available under the MIT License.

