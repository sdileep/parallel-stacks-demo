import { awscdk, javascript } from 'projen';
import { GraphDeployWorkflow } from './.projen/workflows/graphDeploy';

const project = new awscdk.AwsCdkTypeScriptApp({
  name: 'parallel-stacks-demo',
  defaultReleaseBranch: 'main',
  minNodeVersion: '16.18.1',
  packageManager: javascript.NodePackageManager.PNPM,

  cdkVersion: '2.56.1',
  cdkVersionPinning: true,

  devDeps: ['esbuild', 'fs-extra', '@types/fs-extra', '@types/source-map-support'],
  deps: ['source-map-support'],
  depsUpgrade: false,
  devContainer: true,
  projenrcTs: true,
  stale: false,
  tsconfig: {
    compilerOptions: {
      rootDir: '.',
    },
  },
  tsconfigDev: {
    compilerOptions: {
      rootDir: '.',
    },
  },
});

project.tsconfig?.addInclude('scripts/**/*.ts');
project.tsconfigDev?.addInclude('scripts/**/*.ts');

project.tsconfig?.addExclude('node_modules');
project.tsconfigDev?.addExclude('cdk.out');

project.addTask('generate:stack-graphs', {
  exec: 'ts-node scripts/generateStackGraphs.ts',
});

new GraphDeployWorkflow(project, {
  name: 'Deploy',
});

project.synth();
