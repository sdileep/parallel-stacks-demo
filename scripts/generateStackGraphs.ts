import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { parseManifest } from './stackDeps';

const stages = ['demo'];
const stackGraphs: Record<string, unknown> = {};

stages.map((stage) => {
  execSync(`STAGE=${stage} npx cdk synth`, {
    stdio: ['ignore', 'ignore', 'ignore'],
  });
  stackGraphs[stage] = parseManifest();
});

const data = JSON.stringify(stackGraphs, undefined, 2);
fs.writeFileSync(path.join(__dirname, '..', 'generated', 'graph.json'), data);
