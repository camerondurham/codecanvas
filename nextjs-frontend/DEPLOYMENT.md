# Deployment Guide

This document provides comprehensive instructions for deploying the Next.js frontend to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Environment Variables](#environment-variables)
- [Deployment Platforms](#deployment-platforms)
- [CI/CD Pipeline](#cicd-pipeline)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 20+ (LTS)
- npm or yarn package manager
- Git for version control

### Platform-specific Requirements

- **Vercel**: Vercel CLI (`npm install -g vercel`)
- **Netlify**: Netlify CLI (`npm install -g netlify-cli`)
- **Docker**: Docker Desktop or Docker Engine
- **Fly.io**: Fly CLI ([installation guide](https://fly.io/docs/getting-started/installing-flyctl/))

## Build Configuration

### Available Build Scripts

```bash
# Development
npm run dev                 # Start development server
npm run dev:turbo          # Start development server with Turbo mode

# Production builds
npm run build              # Standard production build
npm run build:production   # Optimized production build
npm run build:standalone   # Standalone build for Docker
npm run build:analyze      # Build with bundle analysis

# Quality checks
npm run lint               # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run type-check         # TypeScript type checking
npm run test:ci           # Run tests for CI

# Utilities
npm run clean             # Clean build artifacts
npm run build:optimize    # Full optimization pipeline
```

### Build Optimizations

The build process includes several optimizations:

- **Code Splitting**: Automatic chunking for vendors, React, and CodeMirror
- **Tree Shaking**: Removes unused code from bundles
- **CSS Optimization**: Minification and critical CSS extraction
- **Image Optimization**: WebP and AVIF format support
- **Font Optimization**: Preloading and subsetting
- **Bundle Analysis**: Webpack Bundle Analyzer integration

## Environment Variables

### Required Variables

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://runner.fly.dev/api/v1
NEXT_PUBLIC_APP_ENV=production

# Optional Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional Error Reporting
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Environment Files

- `.env.local` - Development environment
- `.env.production` - Production environment
- `.env.example` - Template for environment variables

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel provides the best Next.js deployment experience with zero configuration.

#### Quick Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run build:optimize
vercel --prod
```

#### Configuration

The `vercel.json` file includes:
- Build settings and environment variables
- Security headers
- Caching rules for static assets
- Health check endpoint

#### Environment Setup

1. Set environment variables in Vercel dashboard
2. Configure production domain
3. Enable automatic deployments from Git

### 2. Netlify

Netlify offers excellent static site hosting with edge functions.

#### Quick Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build:production
netlify deploy --prod --dir=.next
```

#### Configuration

The `netlify.toml` file includes:
- Build commands and environment variables
- Header configuration for security
- Redirect rules
- Plugin configuration

### 3. Docker

Docker deployment provides maximum control and portability.

#### Build Docker Image

```bash
# Build production image
docker build -t nextjs-frontend .

# Run container
docker run -p 3000:3000 nextjs-frontend
```

#### Docker Compose

```bash
# Production deployment
docker-compose up -d

# Development with hot reload
docker-compose --profile dev up
```

#### Multi-stage Build

The Dockerfile uses multi-stage builds for optimization:
1. **deps**: Install dependencies
2. **builder**: Build the application
3. **runner**: Production runtime

### 4. Fly.io

Fly.io provides global edge deployment with excellent performance.

#### Quick Deploy

```bash
# Install Fly CLI
# Follow: https://fly.io/docs/getting-started/installing-flyctl/

# Initialize and deploy
fly launch
fly deploy
```

#### Configuration

The `fly.toml` file includes:
- Machine configuration (CPU, memory)
- Health checks
- Environment variables
- Auto-scaling settings

### 5. Custom Deployment Script

Use the provided deployment script for automated deployments:

```bash
# Deploy to Vercel (production)
./scripts/deploy.sh --platform vercel --environment production

# Deploy to Docker with analysis
./scripts/deploy.sh --platform docker --analyze

# Deploy to Netlify (skip tests)
./scripts/deploy.sh --platform netlify --skip-tests
```

## CI/CD Pipeline

### GitHub Actions

The `.github/workflows/ci-cd.yml` file provides:

- **Quality Checks**: Linting, type checking, testing
- **Multi-environment Builds**: Development and production
- **Security Scanning**: Dependency audit and Snyk integration
- **Docker Build**: Multi-platform image building
- **Automated Deployment**: Staging and production deployments

### Pipeline Stages

1. **Quality**: Code quality checks and tests
2. **Build**: Application building for different environments
3. **Security**: Security vulnerability scanning
4. **Docker**: Container image building and publishing
5. **Deploy**: Automated deployment to staging/production

### Environment Configuration

- **Staging**: Deployed on `develop` branch pushes
- **Production**: Deployed on `main` branch pushes
- **Pull Requests**: Build verification without deployment

## Performance Optimization

### Bundle Optimization

- **Code Splitting**: Automatic chunking by route and vendor
- **Dynamic Imports**: Lazy loading of heavy components
- **Tree Shaking**: Elimination of unused code
- **Minification**: JavaScript and CSS compression

### Asset Optimization

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: Preloading and font display swap
- **Static Asset Caching**: Long-term caching with content hashing

### Runtime Performance

- **Server-Side Rendering**: Pre-rendered pages for faster loading
- **Static Generation**: Build-time page generation where possible
- **Edge Caching**: CDN integration for global performance

### Monitoring

- **Bundle Analysis**: `npm run build:analyze` for size analysis
- **Performance Metrics**: Core Web Vitals tracking
- **Error Monitoring**: Sentry integration (optional)

## Monitoring and Health Checks

### Health Check Endpoint

The application includes a health check endpoint at `/api/health`:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600,
  "memory": { "rss": 50000000, "heapTotal": 30000000 },
  "node_version": "v20.0.0"
}
```

### Platform-specific Monitoring

- **Vercel**: Built-in analytics and performance monitoring
- **Netlify**: Analytics and form handling
- **Docker**: Container health checks and logging
- **Fly.io**: Built-in metrics and health checks

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and rebuild
npm run clean
npm ci
npm run build
```

#### Memory Issues

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### TypeScript Errors

```bash
# Check types without building
npm run type-check

# Fix common issues
npm run lint:fix
```

### Platform-specific Issues

#### Vercel

- Check build logs in Vercel dashboard
- Verify environment variables are set
- Ensure function timeout limits are appropriate

#### Netlify

- Check build logs in Netlify dashboard
- Verify build command and publish directory
- Check for plugin conflicts

#### Docker

- Verify Dockerfile syntax
- Check container logs: `docker logs <container-id>`
- Ensure proper port mapping

#### Fly.io

- Check deployment logs: `fly logs`
- Verify machine configuration
- Check health check endpoints

### Performance Issues

#### Large Bundle Size

```bash
# Analyze bundle
npm run build:analyze

# Check for duplicate dependencies
npm ls --depth=0
```

#### Slow Build Times

```bash
# Use Turbo mode for development
npm run dev:turbo

# Enable build caching
# (automatically enabled in CI/CD)
```

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review platform-specific documentation
- Check GitHub Issues for known problems
- Use the deployment script with `--help` flag

## Security Considerations

### Headers

Security headers are configured in:
- `next.config.ts` for Next.js
- `vercel.json` for Vercel
- `netlify.toml` for Netlify

### Environment Variables

- Never commit sensitive data to version control
- Use platform-specific secret management
- Validate environment variables at build time

### Dependencies

- Regular security audits: `npm audit`
- Automated dependency updates
- Snyk integration for vulnerability scanning