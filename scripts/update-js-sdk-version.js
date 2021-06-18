const core = require('@actions/core');
const fs = require('fs');
const { process, spawnOrFail } = require('./utilities');

try {
  const updatedSdkVersion = spawnOrFail('npm', [
    `show amazon-chime-sdk-js version`,
  ]).trim();

  process.chdir(path.join(__dirname, '../amazon-chime-sdk/apps/meeting'));
  let componentsPackageJson = JSON.parse(
    fs.readFileSync('package.json', 'utf-8')
  );
  componentsPackageJson.peerDependencies[
    'amazon-chime-sdk-js'
  ] = `^${updatedSdkVersion}`;
  componentsPackageJson.devDependencies[
    'amazon-chime-sdk-js'
  ] = `^${updatedSdkVersion}`;

  fs.writeFileSync(
    'package.json',
    JSON.stringify(componentsPackageJson, null, 2)
  );
} catch (error) {
  core.setFailed(error.message);
}
