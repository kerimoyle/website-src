const execa = require('execa')
const fs = require('fs')

;(async () => {
  try {
    let targetGitBranch = 'main'
    let deployRepo = 'git@github.com:libcellml/libcellml.github.io.git'
    let cname = 'libcellml.org'
    let readmeTitle =
      'Production version of libCellML website\n=======================================\n\n'
    if (process.argv[2] === 'staging') {
      console.log('Staging run.')
      targetGitBranch = 'gh-pages'
      deployRepo = 'git@github.com:libcellml/staging.git'
      cname = 'staging.libcellml.org'
      readmeTitle =
        'Staging version of libCellML website\n====================================\n\n'
    } else {
      console.log('Production run.')
    }

    const result = await execa('git', ['branch', '--show-current'])
    const currentGitBranch = result.stdout

    const workingGitBranch = 'dist'
    await execa('git', ['checkout', '--orphan', workingGitBranch])
    await execa('git', ['remote', 'add', 'deploy', deployRepo])
    console.log('Building ...')
    await execa('npm', ['run', 'build'])
    // Understand if it's dist or build folder
    const folderName = fs.existsSync('dist') ? 'dist' : 'build'
    // Write out README.rst
    const content = `${readmeTitle}Do **not** make changes to this repository. It is generated from a source repository. See the source repository https://github.com/libcellml/website-src for instructions on how to build and deploy this website.`
    await fs.promises.writeFile(`${folderName}/README.rst`, content)
    // Write out CNAME
    await fs.promises.writeFile(`${folderName}/CNAME`, cname)
    await execa('git', ['--work-tree', folderName, 'add', '--all'])
    await execa('git', [
      '--work-tree',
      folderName,
      'commit',
      '-m',
      workingGitBranch,
    ])
    console.log('Building ... success.')
    console.log(`Pushing to deploy/${targetGitBranch} ...`)
    await execa('git', ['push', 'deploy', `HEAD:${targetGitBranch}`, '--force'])
    console.log(`Pushing to deploy/${targetGitBranch} ... success.`)
    console.log('Cleaning up ...')
    await execa('rm', ['-r', folderName])
    await execa('git', ['checkout', '-f', currentGitBranch])
    await execa('git', ['branch', '-D', workingGitBranch])
    await execa('git', ['remote', 'rm', 'deploy'])
    console.log('Cleaning up ... success.')
    console.log('Successfully deployed!')
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
})()
