# Celebrity Face Recognition - Frontend



A modern Next.js application for identifying celebrities in uploaded images using AWS Rekognition.A modern, responsive Next.js application for identifying celebrities in uploaded images using AWS Rekognition.



Built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**.## 📋 Overview



## ✨ FeaturesThis frontend provides an intuitive user interface for uploading images and displaying celebrity recognition results. Built with Next.js 15, React 19, and Tailwind CSS 4.



- Image upload with drag-and-drop## ✨ Features

- Real-time image preview

- Celebrity recognition with confidence scores- **Image Upload**: Drag-and-drop or click to upload

- Responsive design (mobile & desktop)- **Real-time Preview**: See your image before processing

- Error handling and validation- **Loading States**: Visual feedback during processing

- File size limit: 5MB- **Results Display**: Celebrity names with confidence scores

- Supported formats: PNG, JPEG, JPG- **Responsive Design**: Works seamlessly on desktop and mobile

- **Error Handling**: User-friendly error messages

## 🚀 Getting Started- **File Validation**: 

  - Max file size: 5MB

### Prerequisites  - Supported formats: PNG, JPEG, JPG



- Node.js 22.x or higher## 🚀 Getting Started

- Backend API deployed (see [back-end README](../back-end/README.md))

### Prerequisites

### Installation

- Node.js 22.x or higher

```bash- npm, yarn, pnpm, or bun

npm install- Backend API deployed and running (see [back-end README](../back-end/README.md))

```

### Installation

### Configuration

```bash

Create a `.env.local` file:# Install dependencies

npm install

```env# or

NEXT_PUBLIC_API_URL=https://your-api-id.execute-api.region.amazonaws.com/dev/rekognitionyarn install

```# or

pnpm install

Get your API URL from the backend deployment output and add `/rekognition` to the end.```



### Run Development Server### Development Server



```bash```bash

npm run devnpm run dev

```# or

yarn dev

Open [http://localhost:3000](http://localhost:3000)# or

pnpm dev

## 🛠️ Scripts# or

bun dev

```bash```

npm run dev          # Start development server

npm run build        # Build for productionOpen [http://localhost:3000](http://localhost:3000) with your browser to see the application.

npm run start        # Start production server

npm run lint         # Run ESLintThe page will auto-reload when you make changes to the code.

```

## 🔧 Configuration

## 📤 Deployment

### Environment Variables

### Vercel (Recommended)

Create a `.env.local` file in the root of the `front-end` directory:

1. Push to GitHub

2. Import to [Vercel](https://vercel.com/new)```env

3. Set root directory to `front-end`NEXT_PUBLIC_API_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/dev/rekognition

4. Add environment variable: `NEXT_PUBLIC_API_URL````

5. Deploy

**Important**: Replace `your-api-gateway-url` with the actual API Gateway URL from your backend deployment.

### Other Options

- AWS AmplifyYou can also copy the `.env.example` file:

- Netlify```bash

- Railwaycp .env.example .env.local

- Render```



## 🐛 TroubleshootingThen edit `.env.local` with your actual API URL.



**API Connection Failed**### Getting Your API URL

- Check backend is deployed

- Verify API URL in `.env.local`After deploying the backend with `cdk deploy`, you'll see output like:

- Check browser console for errors```

Outputs:

**Image Not Uploading**BackEndStack.apiUrl = https://qklryfviw3.execute-api.us-east-1.amazonaws.com/dev/

- Check file size (<5MB)```

- Verify format (PNG, JPEG, JPG)

Add `/rekognition` to the end of this URL for the `NEXT_PUBLIC_API_URL` value:

**Build Errors**```env

```bashNEXT_PUBLIC_API_URL=https://qklryfviw3.execute-api.us-east-1.amazonaws.com/dev/rekognition

rm -rf .next node_modules```

npm install

npm run build## ️ Scripts

```

```bash

## 📚 Learn More# Development

npm run dev          # Start development server with Turbopack

- [Next.js Documentation](https://nextjs.org/docs)

- [React Documentation](https://react.dev/)# Production

- [Tailwind CSS](https://tailwindcss.com/docs)npm run build        # Build for production with Turbopack

npm run start        # Start production server

---

# Code Quality

For complete project documentation, see the main [README.md](../README.md)npm run lint         # Run ESLint

```

## 🎨 Styling

This project uses:
- **Tailwind CSS 4**: Utility-first CSS framework
- **PostCSS**: CSS preprocessing
- **Custom CSS**: Additional styles in `globals.css`

### Color Scheme

The app uses a modern gradient-based design:
- Primary gradient: `from-violet-600 to-indigo-600`
- Success: `text-green-600`
- Error: `text-red-600`
- Background: `bg-gradient-to-br from-purple-50 to-blue-50`

## 🌐 Production Build

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Test Production Build Locally

```bash
npm run build
npm run start
```

Navigate to [http://localhost:3000](http://localhost:3000)

## 📤 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js app:

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com/new)
3. Configure the project:
   - **Root Directory**: `front-end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your API Gateway URL
5. Click **Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AliZgheib/celebrities-face-recognition)

### Deploy on AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting

# Publish your app
amplify publish
```

### Deploy on Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Base directory**: `front-end`
   - **Build command**: `npm run build`
   - **Publish directory**: `front-end/.next`
3. Add environment variables
4. Deploy

### Other Platforms

This Next.js app can be deployed to:
- Railway
- Render
- DigitalOcean App Platform
- Any platform supporting Node.js

## 🔍 Features Deep Dive

### Image Upload Flow

1. User selects or drags an image
2. Frontend validates file type and size
3. Image is displayed as preview
4. User clicks "Identify Celebrities"
5. Image is converted to base64
6. API request sent to backend
7. Results displayed in modal

### Error Handling

The app handles various error scenarios:
- Invalid file format
- File too large (>5MB)
- No celebrities detected
- Network errors
- API errors

### TypeScript Interfaces

```typescript
interface CelebrityFace {
  Name: string;
  Id?: string;
  Confidence?: number;
  MatchConfidence?: number;
}

interface CelebritiesData {
  celebrityFaces: CelebrityFace[];
  unrecognizedFaces: any[];
}
```

## 🎯 Performance Optimization

- **Turbopack**: Fast bundler for development and production
- **Next.js 15**: Latest performance improvements
- **React 19**: Concurrent rendering features
- **Image Optimization**: Client-side preview optimization
- **Code Splitting**: Automatic by Next.js

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload valid image (PNG/JPEG)
- [ ] Upload invalid file format
- [ ] Upload file >5MB
- [ ] Test with image containing celebrities
- [ ] Test with image without celebrities
- [ ] Test error scenarios
- [ ] Test on mobile devices
- [ ] Test on different browsers

### Future: Automated Testing

Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests

## 🐛 Troubleshooting

### CORS Errors

Ensure the backend API Gateway has CORS enabled with the correct origin:
```typescript
allowOrigins: ["http://localhost:3000", "https://your-production-domain.com"]
```

### API Connection Failed

1. Check that the backend is deployed and running
2. Verify the API URL in environment variables
3. Check browser console for detailed error messages
4. Verify network connectivity

### Image Not Uploading

1. Check file size (<5MB)
2. Verify file format (PNG, JPEG, JPG)
3. Check browser console for errors
4. Ensure File API is supported in browser

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Source code and issues

### Related Technologies

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Test thoroughly before submitting PR
5. Update documentation as needed

## 📝 Code Style

- Use functional components with hooks
- Prefer `const` over `let`
- Use async/await for asynchronous operations
- Follow TypeScript best practices
- Use Tailwind classes for styling

## 🔐 Security

- Never commit `.env.local` files
- Validate all user inputs
- Sanitize file uploads
- Use HTTPS in production
- Keep dependencies updated

## 🎓 Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a modern font family by Vercel.

---

For the complete project documentation, see the main [README.md](../README.md) in the root directory.
