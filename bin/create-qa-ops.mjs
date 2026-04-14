#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';

function log(msg) { console.log(msg); }
function success(msg) { console.log(`${GREEN}✓${RESET} ${msg}`); }
function warn(msg) { console.log(`${YELLOW}⚠${RESET} ${msg}`); }

function copyDir(src, dest, stats) {
  const entries = readdirSync(src);
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true });
      }
      copyDir(srcPath, destPath, stats);
    } else {
      if (entry === '.gitkeep') return;
      if (existsSync(destPath)) {
        stats.skipped.push(relative(process.cwd(), destPath));
      } else {
        const content = readFileSync(srcPath, 'utf-8');
        writeFileSync(destPath, content);
        stats.created.push(relative(process.cwd(), destPath));
      }
    }
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    log('');
    log(`${BOLD}create-qa-ops${RESET}`);
    log('');
    log('Scaffold a quality governance system for agent-assisted development.');
    log('');
    log(`${BOLD}Usage:${RESET}`);
    log('  npx create-qa-ops [directory]');
    log('');
    log(`${BOLD}Options:${RESET}`);
    log('  --help, -h     Show this help message');
    log('  --version, -v  Show version');
    log('');
    log(`${BOLD}Examples:${RESET}`);
    log('  npx create-qa-ops          # scaffold in current directory');
    log('  npx create-qa-ops my-app   # scaffold in ./my-app');
    log('');
    log(`${DIM}https://github.com/0xnavarro/qa-ops${RESET}`);
    log('');
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    log('1.1.0');
    return;
  }

  const targetDir = args.find(a => !a.startsWith('-')) || '.';
  const root = targetDir === '.'
    ? process.cwd()
    : targetDir.startsWith('/')
      ? targetDir
      : join(process.cwd(), targetDir);

  log('');
  log(`${BOLD}create-qa-ops${RESET} ${DIM}v1.1.0${RESET}`);
  log(`${DIM}Quality governance for agent-assisted development${RESET}`);
  log('');

  const mappings = [
    { src: 'docs/quality', dest: join(root, 'docs', 'quality') },
    { src: 'steering', dest: join(root, '.kiro', 'steering') },
  ];

  const stats = { created: [], skipped: [] };

  for (const { src, dest } of mappings) {
    const srcPath = join(TEMPLATES_DIR, src);
    if (!existsSync(srcPath)) {
      warn(`Template source not found: ${src}`);
      continue;
    }
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    copyDir(srcPath, dest, stats);
  }

  log('');
  if (stats.created.length > 0) {
    log(`${BOLD}Created:${RESET}`);
    for (const f of stats.created) {
      success(f);
    }
  }

  if (stats.skipped.length > 0) {
    log('');
    log(`${BOLD}Skipped (already exist):${RESET}`);
    for (const f of stats.skipped) {
      warn(f);
    }
  }

  if (stats.created.length === 0 && stats.skipped.length > 0) {
    log('');
    log(`${DIM}All files already exist. Nothing to do.${RESET}`);
  }

  log('');
  log(`${GREEN}${BOLD}Done!${RESET} QA ops scaffolded.`);
  log('');
  log(`${BOLD}Next steps:${RESET}`);
  log(`  1. Tell your agent to read ${CYAN}docs/quality/AGENTS.md${RESET} to auto-configure`);
  log(`  2. Or manually adapt templates in ${CYAN}docs/quality/templates/${RESET}`);
  log(`  3. Replace ${CYAN}{{PLACEHOLDERS}}${RESET} with your project values`);
  log(`  4. Start logging findings in ${CYAN}docs/quality/findings/open.md${RESET}`);
  log('');
  log(`${DIM}Docs: https://github.com/0xnavarro/qa-ops${RESET}`);
  log(`${DIM}Based on: https://www.0xnavarro.com/es/writing/founder-led-engineering-ops/${RESET}`);
  log('');
}

main();
