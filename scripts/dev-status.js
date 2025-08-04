#!/usr/bin/env node

/**
 * Development Environment Status Checker
 * 
 * Checks which development services are currently running and displays their status
 */

import { spawn } from 'child_process';
import { promisify } from 'util';
import { exec } from 'child_process';
import chalk from 'chalk';

const execAsync = promisify(exec);

const services = [
  { name: 'Vite', port: 5173, url: 'http://localhost:5173', color: 'cyan' },
  { name: 'Storybook', port: 6006, url: 'http://localhost:6006', color: 'magenta' },
  { name: 'Docs', port: 4000, url: 'http://localhost:4000', color: 'yellow' },
  { name: 'Server', port: 3001, url: 'http://localhost:3001', color: 'green' }
];

const colors = {
  cyan: chalk.cyan,
  magenta: chalk.magenta,
  yellow: chalk.yellow,
  green: chalk.green,
  red: chalk.red,
  gray: chalk.gray
};

async function checkPort(port) {
  try {
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    return stdout.trim() !== '';
  } catch (error) {
    return false;
  }
}

async function checkService(service) {
  const isRunning = await checkPort(service.port);
  const color = colors[service.color] || colors.gray;
  const status = isRunning ? colors.green('●') : colors.red('○');
  const statusText = isRunning ? colors.green('RUNNING') : colors.red('STOPPED');
  
  console.log(`  ${status} ${color.bold(service.name.padEnd(10))} ${statusText.padEnd(15)} ${colors.gray('→')} ${service.url}`);
  
  return isRunning;
}

async function main() {
  console.log(colors.cyan.bold('\n🚀 Development Environment Status\n'));
  
  let runningCount = 0;
  
  for (const service of services) {
    const isRunning = await checkService(service);
    if (isRunning) runningCount++;
  }
  
  console.log('');
  console.log(`${colors.gray('Services running:')} ${runningCount}/${services.length}`);
  
  if (runningCount === 0) {
    console.log(colors.yellow('💡 Start services with: yarn dev:all, yarn dev:frontend, or yarn dev:minimal'));
  } else if (runningCount < services.length) {
    console.log(colors.yellow('💡 Start all services with: yarn dev:all'));
  } else {
    console.log(colors.green('✅ All services are running!'));
  }
  
  console.log('');
}

main().catch(console.error);