#!/usr/bin/env node

/**
 * Simple Development Environment Runner
 * Handles missing dependencies gracefully and manages port conflicts
 */

import { spawn, spawnSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Kill processes running on specific ports
function killProcessesOnPorts() {
  const ports = [5173, 6006, 3001, 4000]; // vite, storybook, server, jekyll
  
  console.log('\x1b[33m🧹 Checking for existing services...\x1b[0m');
  
  ports.forEach(port => {
    try {
      // Find processes using the port
      const lsofResult = spawnSync('lsof', ['-ti', `:${port}`], { 
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      if (lsofResult.stdout && lsofResult.stdout.trim()) {
        const pids = lsofResult.stdout.trim().split('\n');
        pids.forEach(pid => {
          if (pid && pid.trim()) {
            console.log(`\x1b[90m   Killing process ${pid} on port ${port}\x1b[0m`);
            try {
              spawnSync('kill', ['-9', pid.trim()], { stdio: 'pipe' });
            } catch (e) {
              // Process might already be dead
            }
          }
        });
      }
    } catch (e) {
      // lsof might not be available or port not in use
    }
  });
  
  console.log('\x1b[32m✅ Service cleanup complete\x1b[0m\n');
}

// Check if bundler is available
function checkBundler() {
  try {
    const result = spawnSync('bundle', ['--version'], { stdio: 'pipe' });
    return result.status === 0;
  } catch (e) {
    return false;
  }
}

// Get available services based on dependencies
function getAvailableServices() {
  const hasBundler = checkBundler();
  
  const services = [
    {
      name: 'vite',
      command: 'vite --port 5173 --host',
      color: 'cyan'
    },
    {
      name: 'storybook',
      command: 'storybook dev -p 6006 --host 0.0.0.0',
      color: 'magenta'
    },
    {
      name: 'server',
      command: 'PORT=3001 node server.js',
      color: 'green'
    }
  ];

  if (hasBundler) {
    services.push({
      name: 'docs',
      command: 'cd docs && bundle exec jekyll serve --watch --livereload --host 0.0.0.0',
      color: 'yellow'
    });
  } else {
    console.log('\x1b[33m⚠️  Docs service skipped (Ruby bundler not installed)\x1b[0m');
    console.log('\x1b[90m   Install with: gem install --user-install bundler\x1b[0m\n');
  }

  return services;
}

// Build concurrently command
function buildCommand() {
  const services = getAvailableServices();
  
  const names = services.map(s => s.name).join(',');
  const colors = services.map(s => s.color).join(',');
  const commands = services.map(s => `"${s.command}"`).join(' ');
  
  const concurrentlyCmd = `npx concurrently --kill-others --prefix-colors "${colors}" --prefix "[{name}]" --names "${names}" ${commands}`;
  
  return concurrentlyCmd;
}

// Main
console.log('\x1b[36m🚀 Starting development environment...\x1b[0m\n');

// Kill any existing services first
killProcessesOnPorts();

const command = buildCommand();
const child = spawn(command, [], { 
  stdio: 'inherit', 
  shell: true,
  cwd: dirname(__dirname)
});

child.on('exit', (code) => {
  process.exit(code);
});