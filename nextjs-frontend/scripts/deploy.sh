#!/bin/bash

# Deployment script for Next.js frontend
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
PLATFORM=""
ENVIRONMENT="production"
BUILD_ANALYZE=false
SKIP_TESTS=false

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -p, --platform PLATFORM    Deployment platform (vercel, netlify, docker, fly)"
    echo "  -e, --environment ENV       Environment (development, staging, production)"
    echo "  -a, --analyze              Run bundle analysis"
    echo "  -s, --skip-tests           Skip running tests"
    echo "  -h, --help                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --platform vercel --environment production"
    echo "  $0 --platform docker --analyze"
    echo "  $0 --platform netlify --skip-tests"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -a|--analyze)
            BUILD_ANALYZE=true
            shift
            ;;
        -s|--skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate platform
if [[ -z "$PLATFORM" ]]; then
    print_error "Platform is required. Use -p or --platform to specify."
    show_usage
    exit 1
fi

if [[ ! "$PLATFORM" =~ ^(vercel|netlify|docker|fly)$ ]]; then
    print_error "Invalid platform: $PLATFORM. Supported platforms: vercel, netlify, docker, fly"
    exit 1
fi

print_status "Starting deployment to $PLATFORM ($ENVIRONMENT environment)"

# Set environment variables based on environment
case $ENVIRONMENT in
    development)
        export NODE_ENV=development
        export NEXT_PUBLIC_API_BASE_URL=http://localhost:10100/api/v1
        export NEXT_PUBLIC_APP_ENV=development
        ;;
    staging)
        export NODE_ENV=production
        export NEXT_PUBLIC_API_BASE_URL=https://runner.fly.dev/api/v1
        export NEXT_PUBLIC_APP_ENV=staging
        ;;
    production)
        export NODE_ENV=production
        export NEXT_PUBLIC_API_BASE_URL=https://runner.fly.dev/api/v1
        export NEXT_PUBLIC_APP_ENV=production
        ;;
    *)
        print_error "Invalid environment: $ENVIRONMENT"
        exit 1
        ;;
esac

# Check if we're in the correct directory
if [[ ! -f "package.json" ]]; then
    print_error "package.json not found. Make sure you're in the nextjs-frontend directory."
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Run quality checks
if [[ "$SKIP_TESTS" == false ]]; then
    print_status "Running quality checks..."
    
    print_status "Running type checking..."
    npm run type-check
    
    print_status "Running linting..."
    npm run lint
    
    print_status "Running tests..."
    npm run test:ci
    
    print_success "Quality checks passed"
else
    print_warning "Skipping tests as requested"
fi

# Set analyze flag if requested
if [[ "$BUILD_ANALYZE" == true ]]; then
    export ANALYZE=true
fi

# Platform-specific deployment
case $PLATFORM in
    vercel)
        print_status "Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            print_error "Vercel CLI not found. Install it with: npm install -g vercel"
            exit 1
        fi
        
        # Deploy based on environment
        if [[ "$ENVIRONMENT" == "production" ]]; then
            vercel --prod --yes
        else
            vercel --yes
        fi
        
        print_success "Deployed to Vercel successfully"
        ;;
        
    netlify)
        print_status "Deploying to Netlify..."
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            print_error "Netlify CLI not found. Install it with: npm install -g netlify-cli"
            exit 1
        fi
        
        # Build the application
        npm run build:production
        
        # Deploy based on environment
        if [[ "$ENVIRONMENT" == "production" ]]; then
            netlify deploy --prod --dir=.next
        else
            netlify deploy --dir=.next
        fi
        
        print_success "Deployed to Netlify successfully"
        ;;
        
    docker)
        print_status "Building Docker image..."
        
        # Check if Docker is installed
        if ! command -v docker &> /dev/null; then
            print_error "Docker not found. Please install Docker."
            exit 1
        fi
        
        # Build Docker image
        IMAGE_TAG="nextjs-frontend:$ENVIRONMENT-$(date +%Y%m%d-%H%M%S)"
        docker build -t "$IMAGE_TAG" .
        docker tag "$IMAGE_TAG" "nextjs-frontend:$ENVIRONMENT-latest"
        
        print_success "Docker image built: $IMAGE_TAG"
        print_status "To run the container: docker run -p 3000:3000 $IMAGE_TAG"
        ;;
        
    fly)
        print_status "Deploying to Fly.io..."
        
        # Check if Fly CLI is installed
        if ! command -v fly &> /dev/null; then
            print_error "Fly CLI not found. Install it from: https://fly.io/docs/getting-started/installing-flyctl/"
            exit 1
        fi
        
        # Check if fly.toml exists
        if [[ ! -f "fly.toml" ]]; then
            print_warning "fly.toml not found. Creating a basic configuration..."
            cat > fly.toml << EOF
app = "nextjs-frontend-$ENVIRONMENT"
primary_region = "dfw"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 1024
EOF
        fi
        
        # Deploy to Fly.io
        fly deploy --ha=false
        
        print_success "Deployed to Fly.io successfully"
        ;;
esac

# Generate deployment report
REPORT_FILE="deployment-report-$(date +%Y%m%d-%H%M%S).json"
cat > "$REPORT_FILE" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "platform": "$PLATFORM",
  "environment": "$ENVIRONMENT",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "buildAnalyze": $BUILD_ANALYZE,
  "skipTests": $SKIP_TESTS,
  "success": true
}
EOF

print_success "Deployment completed successfully!"
print_status "Deployment report saved to: $REPORT_FILE"