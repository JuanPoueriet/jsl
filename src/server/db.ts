import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import {
  SOLUTIONS,
  PRODUCTS,
  PROCESS_STEPS,
  TEAM_MEMBERS,
  TESTIMONIALS,
  PROJECTS,
  BLOG_POSTS,
  TECH_STACK,
  PARTNERS,
  CAREER_POSITIONS,
  FAQ_ITEMS,
} from '../app/core/data/mock-data';

const DATA_FILE = join(process.cwd(), 'data', 'content.json');

// Initial data structure combining all mock data
const INITIAL_DATA = {
  SOLUTIONS,
  PRODUCTS,
  PROCESS_STEPS,
  TEAM_MEMBERS,
  TESTIMONIALS,
  PROJECTS,
  BLOG_POSTS,
  TECH_STACK,
  PARTNERS,
  CAREER_POSITIONS,
  FAQ_ITEMS,
};

export async function getData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with initial data
      await ensureDirectory(DATA_FILE);
      await saveData(INITIAL_DATA);
      return INITIAL_DATA;
    }
    throw error;
  }
}

export async function saveData(data: any) {
  await ensureDirectory(DATA_FILE);
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function ensureDirectory(filePath: string) {
  const dir = dirname(filePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}
