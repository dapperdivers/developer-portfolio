# Developer Portfolio Scripts

Utility scripts for developing, generating and optimizing the portfolio. All of them are ES modules run directly by Node (`node scripts/<name>.js`).

## Component generation

### generate.js

Scaffolds a component in TypeScript, in its own folder under `src/components/<layer>/<Name>/`:

| File | Contents |
|------|----------|
| `<Name>.tsx` | The component, exporting `interface <Name>Props` |
| `<Name>.css` | Styles built on the design tokens in `src/assets/css/design-system/tokens/` |
| `<Name>.stories.tsx` | Storybook story (`satisfies Meta<typeof <Name>>`, title `Atoms/`, `Molecules/`, `Organisms/` or `Layout/`) |
| `<Name>.test.tsx` | Vitest test |
| `index.ts` | `export { default }` plus `export type { <Name>Props }` |

```bash
yarn generate:component --name=Button --type=atom
yarn generate:component --name=PageShell --type=layout
yarn generate:component --help
```

Options:

- `--name` (required): component name, in PascalCase
- `--type`: `atom` (default), `molecule`, `organism` or `layout`
- `--dir`: parent directory to use instead of `src/components/<layer>`; the component goes in `<dir>/<Name>/`
- `--files`: `all` (default), or one of `tsx`, `css`, `story`, `test`, `index`

What the templates follow:

- **Atoms and molecules render with no provider around them.** They never import from `@context/*`, app data hooks or `@/portfolio` (ESLint enforces this). They take an optional `animated` prop (default `true`) and use `useMotionEnabled(animated)` and the shared variants from `@utils/motion`. Their tests render the component bare.
- **Organisms and layout components** may read `@context/AnimationContext` and `@context/PortfolioContext`. They pass data and `animated={animationEnabled}` down as props. Their tests render inside the real `AnimationProvider`.

To add a story to a component that already exists:

```bash
yarn generate:component story --component=Proficiency --type=organism
```

Story options: `--interactions` (adds a `play` test using `storybook/test`), `--context=portfolio` (adds a story wrapped in `PortfolioProvider`), `--detailed` (adds a documentation template), `--path` (parent directory holding the component folder). The story is written next to the component. If the component has required props, fill in `meta.args` before the story type-checks.

Things to know:

- The generator overwrites existing files without asking.
- `yarn generate-story` runs `node scripts/generate.js --type=story`, which is not a valid type, so it fails. Use `yarn generate:component story ...` as above.
- `yarn generate` is a different script: it runs `generate-asset-metadata.js` (below).

## Asset optimization

- **optimize-images.js**: creates optimized and WebP versions of the images in `src/assets/images`
  ```bash
  yarn optimize:images
  ```

- **optimize-svgs.js**: optimizes the SVG files in `src/assets/images` with SVGO
  ```bash
  yarn optimize:svgs
  ```

- Both at once:
  ```bash
  yarn optimize
  ```

- **generate-asset-metadata.js**: writes metadata files for the asset directories
  ```bash
  yarn generate
  ```

## Development environment

- **dev-all.sh** and **dev-simple.js**: `dev-all.sh` puts Ruby gems on the PATH and runs `dev-simple.js`, which frees the dev ports (it stops Docker containers and kills processes bound to them) and then starts Vite, Storybook, the dev API server and, when Ruby bundler is installed, the Jekyll docs
  ```bash
  yarn dev:all
  ```

- **dev-status.js**: reports which of the development services are listening
  ```bash
  yarn dev:status
  ```

## Analysis and maintenance

These have no package.json entry; run them with `node scripts/<name>.js`.

- **analyze-dependencies.js**: scans components, hooks, contexts and utils for import patterns and circular dependencies. Writes `dependency-report.html` and `dependency-report.json` to the project root.
- **finalize-package-cleanup.js**: lists the package.json scripts by category. With `--clean` it rewrites package.json (after saving `package.json.bak`) to drop the one-time reorganization scripts; none of those remain, so it currently removes nothing.
- **monitor-animation-performance.js**: not a command-line script. It is a browser module that measures animation frame times; `src/context/AnimationContext.tsx` loads it through the `@scripts` alias when performance monitoring is switched on.

## Not working

- **validate-config.js** (`yarn validate`): imports `config/env.js`, `config/paths.js`, `config/plugins/*`, `config/optimization/*` and `config/dev/server.js`, none of which exist any more (the configuration now lives under `config/vite/` and `config/test/`). It fails on start until it is rewritten or removed.

## Contributing

When adding new scripts:

1. Use descriptive naming that indicates the script's purpose
2. Add appropriate documentation at the top of the script file
3. Update this README.md to include the new script
4. Add an entry to package.json scripts if appropriate
