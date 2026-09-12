# TutorsPie Frontend

A modern React 19 application built with Vite, featuring academic writing services with Stripe payment integration and responsive design.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 22.13.0 or newer
- **npm**: Comes with Node.js

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build production-ready application |
| `npm start` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |

## 🏗️ Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm start
```

The production files will be generated in the `/dist` directory. Deploy this directory to your hosting provider.

## ✨ Features

- **Modern React 19**: Latest React features and performance improvements
- **Vite**: Lightning-fast development and optimized production builds
- **Stripe Integration**: Secure payment processing with `@stripe/react-stripe-js`
- **React Router**: Client-side routing with `react-router-dom`
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide Icons**: Beautiful, customizable icon library
- **Responsive Design**: Mobile-first, fully responsive across all devices

### Page Sections

- Hero banner with assignment selector
- Expert writers showcase
- Service benefits
- Ordering process flow
- Customer testimonials
- Service comparison
- FAQ section
- Contact information
- User authentication (Login/Sign Up)
- User dashboard area

## 📁 Project Structure

```
tutorspie/
├── src/                    # Source files
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── styles/           # CSS/styling files
├── public/               # Static assets
│   ├── images/          # Image files
│   └── reference/       # Reference design files
├── dist/                # Production build output
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🔐 Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
VITE_API_URL=your_api_url_here
```

**Note**: Never commit `.env` files to version control.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.6
- **Build Tool**: Vite 7.1.5
- **Styling**: Tailwind CSS 4.2.1
- **Payment**: Stripe
- **Icons**: Lucide React
- **Routing**: React Router DOM 7.9.1
- **Linting**: ESLint 9.39.4

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Deploy to Production

1. Build the project: `npm run build`
2. Upload the `/dist` directory to your hosting provider
3. Configure your server to serve `index.html` for all routes (for React Router)

### Recommended Hosting Providers

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Cloudflare Pages

## 🤝 Development

### Code Style

This project uses ESLint and Prettier for code quality and consistency.

```bash
# Check for linting issues
npm run lint

# Auto-format code
npm run format
```

## 📄 License

Private - All rights reserved

## 👥 Support

For support and inquiries, please contact the TutorsPie team.
