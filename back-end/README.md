# Celebrity Face Recognition - Backend

AWS CDK infrastructure for the Celebrity Face Recognition backend. This stack deploys a serverless architecture using API Gateway, Lambda, and AWS Rekognition.

## 📋 Overview

This backend provides a REST API endpoint that accepts base64-encoded images and returns celebrity recognition results using AWS Rekognition's `RecognizeCelebrities` API.

## 🏗️ Architecture

The CDK stack deploys:

- **API Gateway**: REST API with CORS enabled for cross-origin requests
- **Lambda Function**: Node.js 22.x function that processes images
- **IAM Roles & Policies**: Permissions for Lambda to access Rekognition
- **CloudFormation**: All resources are provisioned via Infrastructure as Code

## 📦 Prerequisites

- **Node.js** 22.x or higher
- **AWS CLI** configured with credentials
- **AWS CDK CLI**: `npm install -g aws-cdk`
- **AWS Account** with appropriate permissions:
  - Lambda, API Gateway, IAM, CloudFormation
  - Rekognition access

## 🚀 Installation

```bash
# Install dependencies
npm install

# Build TypeScript code
npm run build
```

## 🔧 Development

```bash
# Watch mode - automatically recompile on changes
npm run watch

# Run unit tests
npm run test

# Lint code (if configured)
npm run lint
```

## 📤 Deployment

### First Time Setup

```bash
# Bootstrap CDK (required once per account/region)
cdk bootstrap
```

### Deploy the Stack

```bash
# Preview changes before deployment
cdk diff

# Deploy to AWS
cdk deploy

# Deploy without confirmation prompts
cdk deploy --require-approval never
```

After deployment, you'll see an output similar to:
```
Outputs:
BackEndStack.apiUrl = https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/
```

**Save this URL** - you'll need it for the frontend configuration.

**For the frontend `.env.local` file, append `/rekognition` to this URL:**
```env
NEXT_PUBLIC_API_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/rekognition
```

## 🗑️ Cleanup

```bash
# Remove all deployed resources
cdk destroy
```

## 🛠️ CDK Commands

* `npm run build` - Compile TypeScript to JavaScript
* `npm run watch` - Watch for changes and compile automatically
* `npm run test` - Run Jest unit tests
* `cdk deploy` - Deploy this stack to your AWS account/region
* `cdk diff` - Compare deployed stack with current state
* `cdk synth` - Emit the synthesized CloudFormation template
* `cdk destroy` - Remove all stack resources from AWS

## 📁 Project Structure

```
back-end/
├── bin/
│   └── back-end.ts          # CDK app entry point
├── lib/
│   └── back-end-stack.ts    # Stack definition (API Gateway, Lambda, IAM)
├── src/
│   └── rekognition/
│       └── index.ts         # Lambda function handler
├── test/
│   └── back-end.test.ts     # Unit tests
├── cdk.json                 # CDK configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔌 Lambda Function

### Handler: `src/rekognition/index.ts`

The Lambda function:
1. Accepts base64-encoded images via API Gateway
2. Decodes the image
3. Calls AWS Rekognition's `RecognizeCelebrities` API
4. Returns celebrity matches with confidence scores

### Input Format

```json
{
  "imageBase64": "base64-encoded-image-string"
}
```

### Output Format

```json
{
  "celebrityFaces": [
    {
      "Name": "Celebrity Name",
      "Id": "celebrity-id",
      "Confidence": 99.5,
      "MatchConfidence": 98.7
    }
  ],
  "unrecognizedFaces": []
}
```

## 🔐 IAM Permissions

The Lambda function is granted the following permissions:
- `rekognition:RecognizeCelebrities` on all resources

The IAM policy is automatically created and attached by the CDK stack.

## ⚙️ Configuration

### Lambda Settings

- **Runtime**: Node.js 22.x
- **Timeout**: 29 seconds
- **Memory**: 128 MB (default)
- **Handler**: `index.main`

### API Gateway

- **Stage**: dev
- **CORS**: Enabled for all origins (`*`)
- **Allowed Methods**: GET, POST, PUT, PATCH, DELETE, OPTIONS
- **Allowed Headers**: Content-Type, X-Amz-Date, Authorization, X-Api-Key
- **Primary Endpoint**: GET `/rekognition`

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## 🐛 Troubleshooting

### CDK Bootstrap Error

If you get a bootstrap error:
```bash
cdk bootstrap aws://ACCOUNT-ID/REGION
```

### Permission Denied

Ensure your AWS credentials have the necessary permissions:
```bash
aws sts get-caller-identity
```

### Lambda Timeout

If images are large or processing is slow, the timeout is set to 29 seconds (maximum for API Gateway). You can adjust this in `lib/back-end-stack.ts`:
```typescript
timeout: Duration.seconds(29)  // Current setting (API Gateway max: 29s)
```

### CORS Issues

If you encounter CORS errors, verify the `allowOrigins` setting in `lib/back-end-stack.ts` and ensure the frontend origin is allowed.

## 📊 Monitoring

After deployment, monitor your stack:

- **CloudWatch Logs**: Lambda function logs
- **CloudWatch Metrics**: API Gateway and Lambda metrics
- **X-Ray**: (Optional) Enable for detailed tracing

Access logs:
```bash
aws logs tail /aws/lambda/BackEndStack-rekognitionlambda --follow
```

## 💰 Cost Considerations

- **Lambda**: Free tier includes 1M requests/month
- **API Gateway**: Free tier includes 1M API calls/month
- **Rekognition**: $0.001 per image (1,000 free images per month)
- **Data Transfer**: Standard AWS data transfer rates apply

## 🔄 Updates

To update the stack after making changes:

```bash
npm run build
cdk diff          # Review changes
cdk deploy        # Apply changes
```

## 📚 Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [AWS Rekognition Documentation](https://docs.aws.amazon.com/rekognition/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)

## 🤝 Contributing

When making changes to the infrastructure:

1. Update the TypeScript code
2. Run `npm run build` to compile
3. Test with `npm test`
4. Review changes with `cdk diff`
5. Deploy with `cdk deploy`

## 📝 Notes

- The `cdk.json` file configures how the CDK Toolkit executes your app
- Lambda code is bundled from the `src/rekognition` directory
- API Gateway automatically creates a `/rekognition` GET endpoint

---

For the complete project documentation, see the main [README.md](../README.md) in the root directory.
