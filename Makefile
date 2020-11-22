build:
	sam build

deploy: build
	sam deploy --stack-name $(STACK_NAME) --s3-bucket $(S3_BUCKET) --s3-prefix server --parameter-overrides \
		LambdaFfmpegLayer=$(LAMBDA_FFMPEG_LAYER_ARN)