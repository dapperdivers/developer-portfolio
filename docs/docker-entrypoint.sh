#!/bin/sh

# Docker entrypoint script for Jekyll docs with runtime environment variable injection
# This script injects environment variables into the Jekyll site configuration

CONFIG_FILE="/usr/share/nginx/html/_config.yml"
TEMP_CONFIG="/tmp/_config_runtime.yml"

# Function to safely append to Jekyll config if environment variable is set
append_config() {
    local var_name=$1
    local config_name=$2
    local var_value=$(eval echo \$${var_name})
    
    if [ ! -z "$var_value" ]; then
        echo "${config_name}: \"${var_value}\"" >> "$TEMP_CONFIG"
        echo "✓ Set $config_name to $var_value"
    fi
}

echo "🚀 Starting Jekyll documentation site with runtime configuration..."

# Create runtime config file
if [ -f "$CONFIG_FILE" ]; then
    cp "$CONFIG_FILE" "$TEMP_CONFIG"
else
    touch "$TEMP_CONFIG"
fi

# Inject environment variables if they exist
append_config "VITE_SITE_MAIN_URL" "site_main_url"
append_config "VITE_SITE_STORYBOOK_URL" "site_storybook_url" 
append_config "VITE_SITE_DOCS_URL" "site_docs_url"

# Replace the original config if we have runtime values
if [ -f "$TEMP_CONFIG" ]; then
    cp "$TEMP_CONFIG" "$CONFIG_FILE" 2>/dev/null || true
    rm "$TEMP_CONFIG" 2>/dev/null || true
fi

echo "✅ Jekyll site configuration updated with runtime environment variables"

# Start nginx
exec "$@"