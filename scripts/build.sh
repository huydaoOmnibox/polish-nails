#!/bin/bash

# Production build script for Vercel deployment

echo "🚀 Starting production build..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build

# Check build output
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: .next/"
    echo "📊 Build size:"
    du -sh .next
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Ready for deployment!" 