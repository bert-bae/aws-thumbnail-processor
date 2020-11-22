const {createThumbnail} = require('./services/ffmpeg');
const os = require('os');
const path = require('path');
const s3Client = require('./services/s3')

const workDir = os.tmpdir()

exports.handler = async (event, context) => {
  const eventRecord = event.Records && event.Records[0];
	const	inputBucket = eventRecord.s3.bucket.name;
	const	key = eventRecord.s3.object.key;
	const	resultKey = key.replace(/\.[^.]+$/, '.jpg');
	const	inputFile = path.join(workDir,  context.awsRequestId + path.extname(key));
  const	outputFile = path.join(workDir, 'thumbnail-' + context.awsRequestId + process.env.EXTENSION);
  
  try{
    await s3Client.downloadFile(inputBucket, key, inputFile)
    await createThumbnail(inputFile, outputFile, workDir)
    await s3Client.uploadFile(process.env.OUTPUT_BUCKET, resultKey, outputFile, process.env.MIME_TYPE)
  } catch(err) {
    console.log('-----------err-----------');
    console.log(err);
  }
}