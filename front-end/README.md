# Celebrity Face Recognition - Frontend

Modern Next.js application for celebrity face recognition using AWS Rekognition.

## Features

- 🖼️ **Image Upload**: Click to upload images
- 👁️ **Preview**: See your image before analyzing
- 🎭 **Celebrity Detection**: Identify celebrities in photos
- 📊 **Confidence Scores**: View match confidence percentages
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Fast Performance**: Built with Next.js 15 and Turbopack

## Tech Stack

- **Framework**: Next.js 15.5.5
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Build Tool**: Turbopack

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Configuration

Create a `.env.local` file in the `front-end` directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-id.execute-api.region.amazonaws.com/dev/rekognition
```

Replace `your-api-id` with your actual API Gateway ID from the backend deployment.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api-id.execute-api.region.amazonaws.com/dev/rekognition
```

After deploying the backend with CDK, you'll get an API URL. Add `/rekognition` to the end.

## Features in Detail

### Image Upload
- Supports PNG and JPG formats
- Maximum file size: 5MB
- Client-side validation

### Celebrity Recognition
- Analysis using AWS Rekognition API
- Multiple celebrity detection in one image
- Confidence scores for each match
- Displays unrecognized faces count

## License

MIT
