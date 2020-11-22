const {spawn} = require('child_process');

const spawnFfmpegPromise = (args, env) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing ffmpeg with ${args.join(' ')}`);
    const ffmpeg = spawn('/opt/bin/ffmpeg', args, env);
    const bufferResult = [];

    ffmpeg.stdout.on('data', buffer => {
      console.log('---Buffer---');
      console.log(buffer.toString());
      bufferResult.push(buffer);
    })

    ffmpeg.stderr.on('data', buffer => {
      console.error('---Buffer Error---');
      console.error(buffer.toString());
    })

    ffmpeg.on('exit', (code, sig) => {
      if (code !== 0) {
        reject(`Buffer failed: ${code || sig}`)
        return
      }
      
      console.log('---Buffer Complete---');
      resolve(Buffer.concat(bufferResult).toString().trim());
    })
  })
}

const createThumbnail = (sourceFile, outputFileName, workDir) => {
  return spawnFfmpegPromise([
    '-i', 
    sourceFile, 
    '-vf', 
    `thumbnail,scale=200:-1`, 
    '-frames:v', 
    '1', 
    outputFileName
  ], {
    env: process.env,
    cwd: workDir
  })
}

module.exports = {
  createThumbnail
}