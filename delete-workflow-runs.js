import fs from 'fs';
import path from 'path';

// Helper to load env variables from a .env file if it exists
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove surrounding quotes if present
        if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const token = process.env.GITHUB_TOKEN || process.env.GH_PAT;
if (!token) {
  console.error('❌ Error: GITHUB_TOKEN or GH_PAT not defined in environment or .env file.');
  process.exit(1);
}

// Target Repository details
const owner = 'keshavsoft';
const repo = 'vs-code-ext-from-any-js';

console.log(`Target Repository: ${owner}/${repo}`);

const headers = {
  'Authorization': `token ${token}`,
  'Accept': 'application/vnd.github+v3+json',
  'User-Agent': 'NodeJS-Workflow-Cleaner'
};

async function getRuns(page = 1) {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=100&page=${page}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch runs: ${res.statusText} (${res.status})`);
  }
  const data = await res.json();
  return data.workflow_runs || [];
}

async function deleteRun(runId) {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`;
  const res = await fetch(url, { method: 'DELETE', headers });
  return res.ok;
}

async function main() {
  try {
    console.log('🔄 Fetching workflow runs...');
    let runs = await getRuns(1);
    
    if (runs.length === 0) {
      console.log('✅ No workflow runs found to delete.');
      return;
    }
    
    console.log(`🗑️ Found ${runs.length} workflow runs. Deleting...`);
    for (const run of runs) {
      console.log(`Deleting run #${run.id} (${run.name} - ${run.head_branch})...`);
      const success = await deleteRun(run.id);
      if (success) {
        console.log(`  ✅ Run #${run.id} deleted.`);
      } else {
        console.log(`  ❌ Failed to delete run #${run.id}.`);
      }
    }
    
    // Check if there are more pages
    if (runs.length === 100) {
      console.log('🔄 Checking for next page of runs...');
      await main(); // Recursive check
    } else {
      console.log('🎉 All runs processed!');
    }
  } catch (error) {
    console.error('💥 An error occurred:', error.message);
  }
}

main();
