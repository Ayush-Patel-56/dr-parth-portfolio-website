---
description: How to deploy the Dr. Parth Portfolio Website to Vercel
---

# Deploying to Vercel

This guide outlines the steps to deploy your static portfolio website to Vercel directly from your GitHub repository.

## Prerequisites

1.  **GitHub Repository**: Ensure your project is pushed to GitHub (which you have already done).
2.  **Vercel Account**: You need an account at [vercel.com](https://vercel.com/signup). You can sign up using your GitHub account.

## Step-by-Step Deployment

1.  **Log in to Vercel**
    *   Go to [vercel.com](https://vercel.com/) and log in.

2.  **Add New Project**
    *   On your dashboard, click the **"Add New..."** button (usually top right) and select **"Project"**.

3.  **Import Git Repository**
    *   You will see a list of your GitHub repositories.
    *   Find **`dr-parth-portfolio-website`** in the list.
    *   Click the **"Import"** button next to it.

4.  **Configure Project**
    *   **Project Name**: You can leave this as the default or name it `dr-parth-portfolio`.
    *   **Framework Preset**: Since this is a plain HTML/CSS/JS site, Vercel usually detects it automatically as **"Other"** or **"Static"**. If it asks, select **"Other"**.
    *   **Root Directory**: Leave as `./` (default).
    *   **Build & Output Settings**:
        *   **Build Command**: Leave empty (since it's static, there is no build step).
        *   **Output Directory**: Leave empty.

5.  **Deploy**
    *   Click the blue **"Deploy"** button.
    *   Vercel will clone your repo and deploy it. This usually takes less than a minute.

6.  **Verify**
    *   Once done, you will see a success screen with a thumbnail of your site.
    *   Click on the **Domain** link (e.g., `dr-parth-portfolio.vercel.app`) to view your live website.

## Production Branch

*   By default, Vercel treats the **`main`** branch as your Production branch.
*   Any time you push changes to `main`, Vercel will automatically redeploy the site.

## Preview Deployments (Optional)

*   If you push to other branches (like `dev`), Vercel will create a **Preview Deployment**.
*   This allows you to test changes on a unique URL before merging them into `main`.
