# 🚀 Reddit Clone - Fully Functional Social Media Platform

A modern, feature-rich Reddit clone built with React, TypeScript, and Vite. This application demonstrates advanced web development techniques with a focus on user experience, accessibility, and performance.

## ✨ Features

### 🏠 **Core Functionality**
- **Complete Post System**: Create, view, vote, and save posts
- **Comment System**: Nested comments with voting and threading
- **Subreddit Communities**: Join, browse, and interact with communities
- **User Profiles**: User management with karma and badges
- **Search & Discovery**: AI-powered semantic search with filters
- **Real-time Interactions**: Optimistic updates for smooth UX

### 🎨 **Advanced UI/UX**
- **Modern Design**: Clean, responsive interface with Reddit branding
- **Dark/Light Mode**: Theme switching with system preference detection
- **Microinteractions**: Smooth animations and hover effects
- **Mobile-First**: Fully responsive design for all devices
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: Graceful error states with retry mechanisms

### 🤖 **AI-Powered Features**
- **Smart Search**: Semantic search with typo correction
- **Content Analysis**: AI-generated summaries and insights
- **Personalization**: Interest-based content recommendations
- **Trending Detection**: AI-powered trend analysis
- **Sentiment Analysis**: Content sentiment classification

### ♿ **Accessibility**
- **WCAG 2.1 Compliant**: Full accessibility support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility
- **High Contrast Mode**: Enhanced visibility options
- **Reduced Motion**: Respects user motion preferences
- **Large Text Support**: Scalable typography

### 🔧 **Technical Excellence**
- **TypeScript**: Full type safety throughout the application
- **React Query**: Advanced data fetching with caching
- **State Management**: Optimistic updates and real-time sync
- **Performance**: Lazy loading and code splitting
- **SEO Optimized**: Meta tags and structured data
- **PWA Ready**: Service worker and offline support

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Express.js** - Node.js web framework
- **CORS** - Cross-origin resource sharing
- **Zod** - Schema validation
- **Dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **SWC** - Fast TypeScript compilation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd builder-vortex-world
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:8080](http://localhost:8080)

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Testing
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm typecheck    # Run TypeScript type checking
```

## 📁 Project Structure

```
builder-vortex-world/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Radix UI components
│   │   └── *.tsx          # Custom components
│   ├── context/           # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   └── main.tsx           # Application entry point
├── server/                # Backend Express server
│   ├── routes/            # API routes
│   └── index.ts           # Server entry point
├── shared/                # Shared code between client/server
│   └── api.ts             # API types and functions
├── public/                # Static assets
└── netlify/               # Netlify deployment configuration
```

## 🎯 Key Features Explained

### 1. **Smart Data Management**
The application uses React Query for efficient data fetching with:
- Automatic caching and background updates
- Optimistic updates for instant feedback
- Error handling and retry logic
- Real-time synchronization

### 2. **AI-Powered Search**
Advanced search functionality includes:
- Semantic search with natural language processing
- Typo correction and suggestions
- Related queries and trending topics
- Filtered results by type, time, and engagement

### 3. **Accessibility First**
Comprehensive accessibility features:
- Screen reader compatibility
- Keyboard navigation support
- High contrast and large text modes
- Reduced motion preferences
- Focus management

### 4. **Performance Optimized**
Built for speed and efficiency:
- Code splitting and lazy loading
- Optimized bundle sizes
- Efficient re-rendering
- Progressive enhancement

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_PUBLIC_BUILDER_KEY=your_builder_key

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ANALYTICS=false

# Development
NODE_ENV=development
PORT=8080
```

### Customization
The application is highly customizable through:
- Tailwind CSS configuration
- Component theming
- Feature flags
- API endpoints

## 🧪 Testing

The application includes comprehensive testing:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run specific test files
pnpm test components/PostCard.test.tsx
```

## 📦 Deployment

### Netlify (Recommended)
The project is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Build command: `pnpm build`
3. Publish directory: `dist/spa`
4. Environment variables configured in Netlify dashboard

### Other Platforms
The application can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Reddit** - For inspiration and design patterns
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **React Query** - For excellent data fetching patterns
- **Vite** - For the fast build tool


