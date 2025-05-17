# Next.js 15 Modern Starter Template

A modern, feature-rich Next.js 15 starter template with the latest tech stack and best practices.

## Features

- ⚡️ Next.js 15 with TurboPack
- 🎨 Tailwind CSS v4 for styling
- 📱 Responsive design out of the box
- 🔍 TanStack React Query v5 for data fetching
- 🌙 Dark mode with next-themes
- 🎭 Framer Motion for animations
- 🔒 ESLint and Prettier configured
- 📦 Absolute imports with `@/*` alias
- 🚀 Fast refresh and hot reloading
- 🎯 TypeScript support
- 🔄 Husky & lint-staged for Git hooks
- 📝 Commitlint for conventional commits
- 🎁 React Icons and Lucide React for icons
- 🔥 React Hot Toast for notifications

## Prerequisites

- Node.js 20.0 or later
- pnpm (recommended package manager)

## Getting Started

1. Clone this repository:
```bash
git clone [your-repo-url]
cd next-template
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

The development server will start with TurboPack enabled. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/                 # Source directory
│   ├── app/            # Next.js 15 App Router
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   └── styles/        # Global styles
├── public/            # Static assets
└── config/           # Configuration files
```

## Available Scripts

- `pnpm dev` - Start development server with TurboPack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint and Prettier
- `pnpm format` - Format code and fix linting issues
- `pnpm eslint` - Run ESLint only
- `pnpm prettier` - Run Prettier only
- `pnpm ngrok` - Start ngrok tunnel (for testing)

## Code Quality Tools

- ESLint with Next.js config
- Prettier for code formatting
- TypeScript for type safety
- Husky for Git hooks
- lint-staged for pre-commit checks
- Commitlint for commit message standards

## Dependencies

### Core
- Next.js 15.3.2
- React 19.1.0
- TanStack React Query 5.76.1
- Tailwind CSS 4.1.7
- Framer Motion 12.12.1

### Development
- TypeScript 5.8.3
- ESLint 9.27.0
- Prettier 3.5.3
- Husky 9.1.7

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
