# Resume Craft Deployment Guide

This guide outlines the steps to effectively deploy your complete Resume Craft application, which consists of a Node.js Backend on Render and a vanilla HTML/JS Frontend on Vercel.

---

## 1. Deploying the Backend on Render

Render is an excellent platform for hosting Node.js applications.

### Prerequisites:
- A [Render](https://render.com/) account.
- Your project must be pushed to a GitHub repository.

### Steps:
1. **Push to GitHub**:
   Ensure all changes are committed and pushed to your GitHub repository.
2. **Log in to Render**:
   Go to your Render Dashboard and click **New > Web Service**.
3. **Connect Repository**:
   Authenticate with GitHub and select your `RESUME-BUILDER` repository.
4. **Configure the Service**:
   - **Name**: `resume-craft-backend` (or similar)
   - **Root Directory**: `BACKEND` (Important: you must specify the backend folder)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Set Environment Variables**:
   Under the "Environment" tab or "Advanced" section, add:
   - `MONGODB_URL`: Your MongoDB connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.../`)
6. **Deploy**:
   Click **Create Web Service**. Wait for the build to finish.
7. **Copy Backend URL**:
   Once deployed, Render will provide a URL like `https://resumebuilder-pv1p.onrender.com`. Copy this URL, you will need it for the frontend!

---

## 2. Configuring the Frontend

Before deploying your frontend, you need to point it to your newly deployed backend.

### Steps:
1. Open `FRONT_END/Js/config.js` in your text editor.
2. Verify or update the `API_BASE_URL` to match your Render backend URL:
   ```javascript
   const API_BASE_URL = "https://resumebuilder-pv1p.onrender.com"; // Your render URL
   ```
3. Commit and push this change to your GitHub repository.

---

## 3. Deploying the Frontend on Vercel

Vercel is optimized for static sites and frontend frameworks.

### Prerequisites:
- A [Vercel](https://vercel.com/) account.

### Steps:
1. **Log in to Vercel**:
   Go to your Vercel Dashboard and click **Add New... > Project**.
2. **Import Repository**:
   Import your `RESUME-BUILDER` repository from GitHub.
3. **Configure Project Settings**:
   - **Project Name**: `resume-craft`
   - **Root Directory**: Select the `FRONT_END` folder. (Since our front-end is in this specific folder, it needs to be the root).
   - **Framework Preset**: `Other` (since it's a plain HTML/JS/CSS site).
4. **Build and Output Settings** (Optional):
   For plain HTML, no build command is required.
   *Note: Due to the `vercel.json` rewrite rules you already have, routes will gracefully handle default `.html` extensions.*
5. **Deploy**:
   Click **Deploy**. Vercel will process your files and go live.
6. **Visit Your Site**:
   Click on the generated domain (e.g., `https://resume-craft.vercel.app`) and test the features (login, register, create resume).

---

## Troubleshooting

- **CORS Error on Frontend**: I've already set the backend to allow incoming requests from all origins (`cors({ origin: "*" })`). This should prevent any backend request blocking.
- **Save Profile/Resume Doesn't Work**: Open the Browser Developer console (F12) and ensure requests are pointing to the correct Render URL (they shouldn't be pointing to localhost anymore since we fixed them).
- **Environment Variable Missing error in Render Logs**: Ensure `MONGODB_URL` is set exactly as configured in Render Environment settings.
