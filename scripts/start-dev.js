#!/usr/bin/env node

/**
 * Simple Development Environment Starter
 * Uses concurrently with enhanced configuration for better development experience
 */

import { spawn } from 'child_process';
import { devConfig } from '../dev.config.js';

const args = process.argv.slice(2);
const combination = args[0] || 'all';

// Get services for the combination
const availableCombinations = Object.keys(devConfig.combinations);
if (!availableCombinations.includes(combination)) {
  console.error(`❌ Unknown combination: ${combination}`);
  console.error(`Available combinations: ${availableCombinations.join(', ')}`);
  process.exit(1);
}

const services = devConfig.combinations[combination];
const serviceConfigs = services.map(name => devConfig.services[name]);

// Build concurrently command
const commands = serviceConfigs.map(service => service.command);
const names = serviceConfigs.map(service => service.name);
const colors = serviceConfigs.map(service => service.color);

console.log(`🚀 Starting development environment: ${combination}\n`);
console.log('Services:');
serviceConfigs.forEach(service => {
  console.log(`  • ${service.name} - ${service.description} (${service.url})`);
});
console.log('');

// Execute concurrently with proper configuration
const concurrentlyArgs = [
  '--kill-others',
  '--prefix-colors', colors.join(','),
  '--prefix', '[{name}]',
  '--names', names.join(','),
  '--timestamp-format', 'HH:mm:ss',
  '--restart-tries', '3',
  '--restart-after', '1000',
  ...commands
];

const concurrentlyProcess = spawn('npx', ['concurrently', ...concurrentlyArgs], {
  stdio: 'inherit',
  shell: true
});

// Handle process cleanup
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');
  concurrentlyProcess.kill('SIGTERM');
});

process.on('SIGTERM', () => {
  concurrentlyProcess.kill('SIGTERM');
});

concurrentlyProcess.on('exit', (code) => {
  process.exit(code);
});