#!/bin/bash

# Add Ruby gems to PATH if available
if [ -d "$HOME/.local/share/gem/ruby/3.1.0/bin" ]; then
  export PATH="$HOME/.local/share/gem/ruby/3.1.0/bin:$PATH"
fi

# Run the dev-simple.js script
exec node scripts/dev-simple.js "$@"