# AWS Thumbnail Processor

Example code that takes advantage of AWS S3 event triggers and lambdas to process video files in order to generate thumbnails using ffmpeg in Nodejs.

This is a common pattern with AWS S3 for media processing.

# Requirements

- [Ffmpeg layer for AWS Lambda](https://serverlessrepo.aws.amazon.com/#!/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~ffmpeg-lambda-layer)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

# Deploying Example

1. Install SAM CLI
2. Deploy a layer with FFMpeg for AWS Lambdas
3. Add the following environment variables:

- S3_BUCKET (Location for Cloudformation builds to be stored)
- LAMBDA_FFMPEG_LAYER_ARN (Arn of the ffmpeg layer)

4. Configure AWS credentials on local machine to provide the appropriate credentials
5. Run `make deploy`

# Testing

Once deployment is complete and you have verified the AWS Lambda is up, find the S3 source bucket. Upload a video file into the bucket and wait for the event trigger to process the media file. Once complete, the thumbnail will be inserted into the thumbnail bucket.

You can see the lambda's logs in Cloudwatch.
