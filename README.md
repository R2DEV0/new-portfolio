# Kevin R. Chancey - Developer Portfolio

A modern, responsive developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features dark/light theme toggle, smooth animations, and a professional design.

## Features

- 🌓 **Dark/Light Theme** - Toggle between themes with persistent storage
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 14 and modern best practices
- 🎨 **Modern Design** - Clean, professional, and fun UI with smooth animations
- 📊 **Skills Visualization** - Interactive skill bars with categorized display
- 🚀 **Project Showcase** - Detailed project cards with technologies and highlights
- 🎓 **Education Section** - Academic achievements and certifications
- 🤖 **AI Chat Assistant** - Interactive AI-powered chat to answer questions about Kevin

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

3. Set up environment variables:
```bash
# Create a .env.local file in the root directory
cp .env.local.example .env.local

# Add your OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here
```

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
3. Add your environment variable in Netlify:
   - Go to Site settings → Environment variables
   - Add `OPENAI_API_KEY` with your OpenAI API key
4. Netlify will automatically detect the Next.js configuration
5. The build will run automatically on each push

The `netlify.toml` file is already configured with the Next.js plugin.

**Note**: Make sure to add your `OPENAI_API_KEY` as an environment variable in Netlify for the AI chat feature to work.

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
│   ├── About.tsx         # About me section
│   ├── AIChat.tsx        # AI chat assistant component
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

