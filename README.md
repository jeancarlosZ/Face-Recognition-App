# Face-Recognition-App

This application can detect faces in an image from a URL link and surround each face with a blue box. This frontend application works together with the backend server [face-recognition-app-api](https://github.com/jeancarlosZ/face-recognition-app-api).

## Getting Started

Clone this repo and run:

```bash
npm install
```

## Setup .env File

Create a `.env` file in the root directory of this project. Add the following to the `.env` file:

```env
VITE_API_URL="http://localhost:3000"
```

## Development

Start the development application by running:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

Create a free account for [Netlify](https://www.netlify.com/). Replace `http://localhost:3000` in the `.env` file with your backend URL. Deploy this application with the environment variable in the `.env` file.
