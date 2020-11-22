const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3();

const downloadFile = (bucket, fileKey, filePath) => {
  console.log(`Downloading ${fileKey}`);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    const stream = s3.getObject({
      Bucket: bucket,
      Key: fileKey
    }).createReadStream()

    stream.on('error', reject)
    file.on('error', reject)
    file.on('finish', () => {
      console.log(`Downloaded from ${bucket} and ${fileKey}`);
      resolve(filePath)
    })
    stream.pipe(file)
  })
}

const uploadFile = async (bucket, fileKey, filePath, contentType) => {
  console.log(`Uploading ${fileKey} from ${filePath} to ${bucket}`);

  return s3.upload({
    Bucket: bucket,
    Key: fileKey,
    Body: fs.createReadStream(filePath),
    ACL: 'private',
    ContentType: contentType
  }).promise();
}

module.exports = {
  downloadFile,
  uploadFile
}