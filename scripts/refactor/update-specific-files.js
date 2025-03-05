/**
 * Script to update specific files with path alias imports
 * This addresses files that weren't properly updated by the generic script
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of specific files to update with their import fixes
const filesToUpdate = [
  {
    path: 'src/components/molecules/FeedbackCard.jsx',
    replacements: [
      { from: 'import Card from "./ui/Card";', to: 'import Card from "@atoms/Card";' },
      { from: 'import ResponsiveImage from "./ui/ResponsiveImage";', to: 'import ResponsiveImage from "@atoms/ResponsiveImage";' },
      { from: 'import useIntersectionObserver from "../hooks/useIntersectionObserver";', to: 'import useIntersectionObserver from "@hooks/useIntersectionObserver";' }
    ]
  },
  {
    path: 'src/components/molecules/EducationCard.jsx',
    replacements: [
      { from: 'import Card from "./ui/Card";', to: 'import Card from "@atoms/Card";' },
      { from: 'import useIntersectionObserver from "../hooks/useIntersectionObserver";', to: 'import useIntersectionObserver from "@hooks/useIntersectionObserver";' }
    ]
  },
  {
    path: 'src/components/molecules/ExperienceCard.jsx',
    replacements: [
      { from: 'import Card from "./ui/Card";', to: 'import Card from "@atoms/Card";' },
      { from: 'import ResponsiveImage from "./ui/ResponsiveImage";', to: 'import ResponsiveImage from "@atoms/ResponsiveImage";' },
      { from: 'import useIntersectionObserver from "../hooks/useIntersectionObserver";', to: 'import useIntersectionObserver from "@hooks/useIntersectionObserver";' },
      { from: 'import useImageColor from "../hooks/useImageColor";', to: 'import useImageColor from "@hooks/useImageColor";' }
    ]
  },
  {
    path: 'src/components/organisms/Education.jsx',
    replacements: [
      { from: 'import useEducation from "../hooks/useEducation";', to: 'import useEducation from "@hooks/useEducation";' }
    ]
  },
  {
    path: 'src/components/organisms/Experience.jsx',
    replacements: [
      { from: 'import useExperience from "../hooks/useExperience";', to: 'import useExperience from "@hooks/useExperience";' },
      { from: 'import useTimelineView from "../hooks/useTimelineView";', to: 'import useTimelineView from "@hooks/useTimelineView";' },
      { from: 'import { usePortfolio } from "../context/PortfolioContext";', to: 'import { usePortfolio } from "@context/PortfolioContext";' }
    ]
  },
  {
    path: 'src/components/organisms/Feedbacks.jsx',
    replacements: [
      { from: 'import useFeedback from "../hooks/useFeedback";', to: 'import useFeedback from "@hooks/useFeedback";' }
    ]
  }
];

// Process a single file
async function processFile(fileConfig) {
  try {
    const filePath = path.join(process.cwd(), fileConfig.path);
    const content = await fs.readFile(filePath, 'utf8');
    let newContent = content;
    let changed = false;
    
    // Apply replacements
    for (const replacement of fileConfig.replacements) {
      if (newContent.includes(replacement.from)) {
        newContent = newContent.replace(replacement.from, replacement.to);
        changed = true;
        console.log(`[${path.basename(filePath)}] Replaced: ${replacement.from} → ${replacement.to}`);
      } else {
        console.log(`[${path.basename(filePath)}] Warning: Could not find pattern "${replacement.from}"`);
      }
    }
    
    // Save the file if changes were made
    if (changed) {
      await fs.writeFile(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing file ${fileConfig.path}:`, error);
    return false;
  }
}

// Main function
async function main() {
  try {
    console.log('🔍 Updating specific files...');
    
    // Process all files
    let changedCount = 0;
    for (const fileConfig of filesToUpdate) {
      const changed = await processFile(fileConfig);
      if (changed) {
        changedCount++;
      }
    }
    
    console.log(`✅ Done! Updated imports in ${changedCount} files.`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();