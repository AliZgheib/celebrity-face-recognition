# 🌟 Celebrity Face Recognition

A full-stack application that uses AWS Rekognition to identify celebrities in uploaded images. Built with Next.js for the frontend and AWS CDK for the serverless backend infrastructure.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![AWS](https://img.shields.io/badge/AWS-Rekognition-orange.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Technologies Used](#-technologies-used)
- [License](#-license)

## ✨ Features

- **Celebrity Recognition**: Upload an image and identify celebrities using AWS Rekognition
- **Real-time Processing**: Fast image analysis with confidence scores
- **Responsive UI**: Modern, mobile-friendly interface built with Next.js and Tailwind CSS
- **Serverless Architecture**: Scalable backend using AWS Lambda and API Gateway
- **Image Preview**: See your uploaded image before processing
- **Detailed Results**: View celebrity names, confidence scores, and match percentages
- **Error Handling**: Comprehensive error messages and validation

## 🏗️ Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│  Next.js    │-------->│ API Gateway │-------->│   Lambda    │
│  Frontend   │  HTTPS  │             │  Event  │  Function   │
│             │<--------│             │<--------│             │
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                       │
                                                       │
                                                       ▼
                                                ┌─────────────┐
                                                │     AWS     │
                                                │ Rekognition │
                                                └─────────────┘
```

### Components:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: AWS CDK stack deploying:
  - API Gateway REST API with CORS enabled
  - Lambda function (Node.js 22.x runtime)
  - IAM roles and policies for Rekognition access
- **AI Service**: AWS Rekognition for celebrity detection

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22 or higher)
- **npm** or **yarn**
- **AWS CLI** configured with appropriate credentials
- **AWS CDK CLI** (`npm install -g aws-cdk`)
- **AWS Account** with Rekognition permissions

### AWS Permissions Required:

- `rekognition:RecognizeCelebrities`
- `lambda:CreateFunction`, `lambda:UpdateFunctionCode`
- `apigateway:*`
- `iam:CreateRole`, `iam:AttachRolePolicy`
- `cloudformation:*`

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AliZgheib/celebrities-face-recognition.git
cd celebrity-face-recognition
```

### 2. Backend Setup

```bash
cd back-end

# Install dependencies
npm install

# Build the TypeScript code
npm run build

# (Optional) Run tests
npm test

# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy the backend stack
cdk deploy
```

**Important**: After deployment, note the API Gateway URL from the CloudFormation outputs. You'll need this for the frontend.

### 3. Frontend Setup

```bash
cd front-end

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your API Gateway URL
# NEXT_PUBLIC_API_URL=https://your-api-id.execute-api.region.amazonaws.com/dev/rekognition

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Backend Deployment

The backend is deployed to AWS using CDK:

```bash
cd back-end

# See what will be deployed
cdk diff

# Deploy to AWS
cdk deploy

# Destroy the stack (cleanup)
cdk destroy
```

### Frontend Deployment

The frontend can be deployed to various platforms:

#### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set the root directory to `front-end`
4. Add environment variable: `NEXT_PUBLIC_API_URL=<your-api-gateway-url>/rekognition`
5. Deploy

#### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

## 🔧 Environment Variables

### Frontend

Create a `.env.local` file in the `front-end` directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/dev/rekognition
```

**Example with your deployed API:**
```env
NEXT_PUBLIC_API_URL=https://qklryfviw3.execute-api.us-east-1.amazonaws.com/dev/rekognition
```

**Note:** Make sure to append `/rekognition` to the end of your API Gateway URL.

### Backend

No environment variables needed - IAM roles are automatically configured by CDK.

## 🛠️ Technologies Used

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ESLint](https://eslint.org/)** - Code linting

### Backend
- **[AWS CDK](https://aws.amazon.com/cdk/)** - Infrastructure as Code
- **[AWS Lambda](https://aws.amazon.com/lambda/)** - Serverless compute
- **[API Gateway](https://aws.amazon.com/api-gateway/)** - REST API management
- **[AWS Rekognition](https://aws.amazon.com/rekognition/)** - AI-powered image analysis
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Jest](https://jestjs.io/)** - Testing framework

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Ali Zgheib**

- GitHub: [@AliZgheib](https://github.com/AliZgheib)

## 🐛 Known Issues

- Maximum image size: 5MB
- Supported formats: PNG, JPEG, JPG
- API Gateway timeout: 29 seconds

## 💡 Tips

- Use high-quality images for better recognition accuracy
- Ensure faces are clearly visible and well-lit
- The API works best with frontal face images
- Keep image sizes under 5MB for faster processing

---

Made with ❤️ using AWS Rekognition, Next.js, and AWS CDK
