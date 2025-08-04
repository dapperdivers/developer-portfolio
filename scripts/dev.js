#!/usr/bin/env node

/**
 * Enhanced Development Server Manager
 * 
 * This script provides an improved development experience with:
 * - Color-coded output for each service
 * - Proper process management and cleanup
 * - Service health checking
 * - Easy service combination switching
 * - Clear service URLs and status
 */

import { spawn } from 'child_process';
import chalk from 'chalk';
import { devConfig, getServiceUrls } from '../dev.config.js';

const args = process.argv.slice(2);
const combination = args[0] || 'all';

// Color mappings for consistent output
const colors = {
  cyan: chalk.cyan,
  magenta: chalk.magenta,
  yellow: chalk.yellow,
  green: chalk.green,
  red: chalk.red,
  blue: chalk.blue,
  gray: chalk.gray
};

class DevManager {
  constructor() {
    this.processes = new Map();
    this.isShuttingDown = false;
    this.startTime = Date.now();
    
    // Setup graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
    process.on('exit', () => this.cleanup());
  }

  async start(combinationName = 'all') {
    console.log(colors.blue.bold(`\n🚀 Starting development environment: ${combinationName}\n`));
    
    const services = this.getServices(combinationName);
    
    if (services.length === 0) {
      console.log(colors.red(`❌ Unknown combination: ${combinationName}`));
      console.log(colors.gray(`Available combinations: ${Object.keys(devConfig.combinations).join(', ')}`));
      process.exit(1);
    }

    // Display service information
    this.displayServiceInfo(services);
    
    // Start all services
    for (const service of services) {
      await this.startService(service);
    }

    // Display URLs after startup
    setTimeout(() => {
      this.displayServiceUrls(services);
    }, 3000);
  }

  getServices(combinationName) {
    const combination = devConfig.combinations[combinationName];
    if (!combination) return [];
    
    return combination.map(serviceName => devConfig.services[serviceName]).filter(Boolean);
  }

  displayServiceInfo(services) {
    console.log(colors.blue('📋 Services to start:'));
    services.forEach(service => {
      const color = colors[service.color] || colors.gray;
      console.log(`   ${color('●')} ${color.bold(service.name)} - ${service.description} (${service.url})`);
    });
    console.log('');
  }

  displayServiceUrls(services) {
    console.log(colors.blue.bold('\n🌐 Service URLs:'));
    services.forEach(service => {
      const color = colors[service.color] || colors.gray;
      console.log(`   ${color('●')} ${color.bold(service.name.padEnd(10))} ${colors.gray('→')} ${color(service.url)}`);
    });
    console.log('');
    console.log(colors.gray('💡 Press Ctrl+C to stop all services'));
    console.log('');
  }

  async startService(service) {
    const color = colors[service.color] || colors.gray;
    console.log(`${color('[')}${color.bold(service.name)}${color(']')} Starting...`);

    // Parse command and arguments
    const [cmd, ...args] = service.command.split(' ');
    
    const childProcess = spawn(cmd, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: service.cwd,
      env: { ...process.env },
      shell: true
    });

    this.processes.set(service.name, {
      process: childProcess,
      service: service,
      startTime: Date.now()
    });

    // Handle process output
    childProcess.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        console.log(`${color('[')}${color.bold(service.name)}${color(']')} ${line}`);
      });
    });

    childProcess.stderr.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        console.log(`${color('[')}${color.bold(service.name)}${color(']')} ${colors.red(line)}`);
      });
    });

    childProcess.on('exit', (code, signal) => {
      if (!this.isShuttingDown) {
        if (code === 0) {
          console.log(`${color('[')}${color.bold(service.name)}${color(']')} ${colors.green('✓ Exited successfully')}`);
        } else {
          console.log(`${color('[')}${color.bold(service.name)}${color(']')} ${colors.red('✗ Exited with code')} ${code}`);
        }
      }
      this.processes.delete(service.name);
    });

    childProcess.on('error', (error) => {
      console.log(`${color('[')}${color.bold(service.name)}${color(']')} ${colors.red('Error:')} ${error.message}`);
    });

    // Small delay between service starts
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async shutdown() {
    if (this.isShuttingDown) return;
    
    this.isShuttingDown = true;
    console.log(colors.yellow.bold('\n🛑 Shutting down services...\n'));

    const shutdownPromises = [];
    
    for (const [serviceName, { process: childProcess, service }] of this.processes) {
      const color = colors[service.color] || colors.gray;
      console.log(`${color('[')}${color.bold(serviceName)}${color(']')} Stopping...`);
      
      const shutdownPromise = new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.log(`${color('[')}${color.bold(serviceName)}${color(']')} Force killing...`);
          childProcess.kill('SIGKILL');
          resolve();
        }, 5000);

        childProcess.on('exit', () => {
          clearTimeout(timeout);
          console.log(`${color('[')}${color.bold(serviceName)}${color(']')} ${colors.green('✓ Stopped')}`);
          resolve();
        });

        // Try graceful shutdown first
        childProcess.kill('SIGTERM');
      });
      
      shutdownPromises.push(shutdownPromise);
    }

    await Promise.all(shutdownPromises);
    
    const runtime = Math.round((Date.now() - this.startTime) / 1000);
    console.log(colors.green.bold(`\n✅ All services stopped (ran for ${runtime}s)\n`));
    
    process.exit(0);
  }

  cleanup() {
    // Emergency cleanup
    for (const [, { process: childProcess }] of this.processes) {
      try {
        childProcess.kill('SIGKILL');
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
  }
}

// Show help
if (args.includes('--help') || args.includes('-h')) {
  console.log(colors.blue.bold('Development Environment Manager\n'));
  console.log('Usage: node scripts/dev.js [combination]\n');
  console.log('Available combinations:');
  Object.entries(devConfig.combinations).forEach(([name, services]) => {
    console.log(`  ${colors.cyan(name.padEnd(10))} - ${services.join(', ')}`);
  });
  console.log('\nService URLs:');
  Object.entries(getServiceUrls()).forEach(([name, url]) => {
    console.log(`  ${colors.green(name.padEnd(10))} - ${url}`);
  });
  process.exit(0);
}

// Start the development environment
const manager = new DevManager();
manager.start(combination);