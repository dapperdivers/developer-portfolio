# Fonts Directory

This directory contains all font assets used in the portfolio project.

## Directory Structure

```
fonts/
├── agustina/           # Agustina font family
│   ├── Agustina.otf    # Original OTF format
│   └── font-info.json  # Metadata about the font
└── [other-font]/       # Other font families (if added)
```

## Font Standards

### Naming Conventions
- Font directories are named after the font family in lowercase
- Font files maintain their original names but use lowercase
- Include metadata files with licensing and source information

### File Format Guidelines
- Include multiple formats for cross-browser compatibility:
  - `.woff2` - Primary format for modern browsers
  - `.woff` - Fallback for broader compatibility
  - `.ttf` or `.otf` - Original formats for reference/fallback

### Font Usage Guidelines
- Define font-face declarations in the design system's typography tokens
- Always specify appropriate fallback fonts
- Use font-display property for performance (usually 'swap')
- Limit the number of font weights loaded to improve performance

### Metadata Documentation
Each font directory should include a `font-info.json` file with:
- Font name and family
- Designer/foundry
- License information
- Source URL
- Included weights and styles
