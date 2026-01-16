import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(process.cwd(), 'src/content/garden');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(targetDir);
files.filter((f) => f.startsWith('mock-')).forEach((f) => fs.unlinkSync(path.join(targetDir, f)));

const types = ['evergreen', 'literature', 'article', 'seed'];
const tags = ['design', 'ai', 'react', 'astro', 'philosophy', 'system-design', 'testing', 'css'];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMock(index) {
  const date = randomDate(new Date(2020, 0, 1), new Date(2025, 0, 1));
  const type = types[Math.floor(Math.random() * types.length)];
  const numTags = Math.floor(Math.random() * 3) + 1;
  const selectedTags = [];
  for (let i = 0; i < numTags; i++) {
    selectedTags.push(tags[Math.floor(Math.random() * tags.length)]);
  }

  const id = `mock-${index.toString().padStart(3, '0')}`;
  const title = `Mock Note ${index}: ${type.charAt(0).toUpperCase() + type.slice(1)} Concept`;

  const content = `---
title: "${title}"
description: "This is a generated mock note to test the garden layout and timeline visualization."
pubDate: "${date.toISOString().split('T')[0]}"
type: "${type}"
tags: [${selectedTags.map((t) => `"${t}"`).join(', ')}]
lang: "en"
---

## Introduction

This is a mock note generated for testing purposes. It serves to fill the timeline and verify the density visualization.

### Key Concepts

- **Randomness**: Distributed over 5 years.
- **Density**: Checking if month clusters appear correctly.
- **Layout**: Verifying card interaction.

## Analysis

The timeline should show a distribution of nodes. Some months will be empty, others clustered.

> "Order is finding the patterns in chaos."

### Code Example

\`\`\`typescript
const garden = "blooming";
function water() {
  console.log("growing...");
}
\`\`\`

## Conclusion

This concludes the mock note ${index}.
`;

  return { id, content };
}

console.log('Generating 30 mock notes...');
for (let i = 1; i <= 30; i++) {
  const { id, content } = generateMock(i);
  fs.writeFileSync(path.join(targetDir, `${id}.md`), content);
}
console.log('Done.');
