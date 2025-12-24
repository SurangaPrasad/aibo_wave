# AIBO Wave - Next.js Application

A Next.js application for AIBO Wave, empowering the global creative citizen by connecting artists and entrepreneurs across Europe and Asia.

## Features

- **Home Page**: Hero section with mission, vision, and core values
- **About Page**: Detailed information about AIBO Wave's philosophy and purpose
- **Events Page**: Platform for discovering and hosting cultural events
- **Societies Page**: Local chapters for community building
- **Stories Page**: Inspiring journeys from the creative community
- **Profile Page**: User account management

## Tech Stack

- **Framework**: Next.js 15 (Pages Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **UI**: React 19

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production application:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
├── components/          # React components organized by feature
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── home/           # Home page components
│   ├── about/          # About page components
│   ├── events/         # Events page components
│   ├── societies/      # Societies page components
│   ├── stories/        # Stories page components
│   └── profile/        # Profile page components
├── pages/              # Next.js pages (routing)
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # Document structure
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About page
│   ├── events.tsx      # Events page
│   ├── societies.tsx   # Societies page
│   ├── stories.tsx     # Stories page
│   └── profile.tsx     # Profile page
├── public/             # Static assets
│   ├── aibow-logo.png    # Logo with text
│   └── artboard-logo.png # Logo symbol
└── styles/             # Global styles
    └── globals.css     # Global CSS

```

## Design Theme

- **Primary Color**: Blue (#2563eb)
- **Accent Color**: Orange (#f59e0b)
- **Dark Background**: Gradients from #4a4a4a to #2d2d2d
- **Typography**: System fonts with modern styling

## License

© 2025 AIBO Wave. All rights reserved.