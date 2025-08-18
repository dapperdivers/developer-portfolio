#!/bin/sh

# Docker entrypoint script for Storybook with runtime environment variable injection
# This script injects environment variables into the built HTML files

INDEX_FILE="/usr/share/nginx/html/index.html"

# Function to inject meta tags into HTML files
inject_meta_tags() {
    local file=$1
    local temp_file="${file}.tmp"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        return
    fi
    
    # Create meta tags for site navigator configuration
    local meta_tags=""
    
    if [ ! -z "$VITE_SITE_MAIN_URL" ]; then
        meta_tags="${meta_tags}<meta name=\"site-main-url\" content=\"${VITE_SITE_MAIN_URL}\">"
    fi
    
    if [ ! -z "$VITE_SITE_STORYBOOK_URL" ]; then
        meta_tags="${meta_tags}<meta name=\"site-storybook-url\" content=\"${VITE_SITE_STORYBOOK_URL}\">"
    fi
    
    if [ ! -z "$VITE_SITE_DOCS_URL" ]; then
        meta_tags="${meta_tags}<meta name=\"site-docs-url\" content=\"${VITE_SITE_DOCS_URL}\">"
    fi
    
    if [ ! -z "$meta_tags" ]; then
        # Inject meta tags before closing </head>
        sed "s|</head>|${meta_tags}</head>|g" "$file" > "$temp_file"
        mv "$temp_file" "$file"
        echo "✓ Injected runtime configuration into $(basename "$file")"
    fi
}

echo "🚀 Starting Storybook with runtime configuration..."

# Inject into Storybook index.html
inject_meta_tags "$INDEX_FILE"

echo "✅ Runtime environment variable injection complete"

# Execute the main command (nginx)
exec "$@"