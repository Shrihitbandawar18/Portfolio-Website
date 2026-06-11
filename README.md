# Shrihit Bandawar — Personal Portfolio

A modern, production-ready personal portfolio website built with pure **HTML, CSS, and JavaScript**.

## Features

- **Dark / Light mode** with localStorage persistence
- **Typing animation** in the hero section
- **Scroll reveal animations** with IntersectionObserver
- **Project filtering** (All / Full Stack / AI-ML / Analytics / Freelance)
- **Glassmorphism** design elements
- **Custom cursor** (desktop)
- **Contact form** with JavaScript validation
- **Mobile hamburger menu**
- **Sticky navbar** with active section detection
- **Responsive** — Mobile, Tablet, Laptop, Desktop
- **SEO** meta tags + Open Graph
- **Netlify & GitHub ready**

## File Structure

```
portfolio/
├── index.html              # Main HTML
├── style.css               # All styles
├── script.js               # All interactions
├── Full_Stack_Resume.pdf   # ← Add your resume here
├── Data_Analyst_Resume.pdf # ← Add your resume here
└── README.md
```

##  Getting Started

### Local Development
Just open `index.html` in any browser — no build step needed.

### Deploy to Netlify
1. Push this folder to a GitHub repository
2. Log in to [netlify.com](https://netlify.com)
3. Click **"Add new site → Import an existing project"**
4. Connect your GitHub repo
5. Set publish directory to `/` (root)
6. Click **Deploy**

### Deploy to GitHub Pages
1. Push to a repo named `shrihitbandawar18.github.io`
2. Go to Settings → Pages → Source: `main` branch → `/root`
3. Your site will be live at `https://shrihitbandawar18.github.io`

## 📝 Customization Guide

### Add Your Profile Photo
In `index.html`, find the `.profile-img-placeholder` div and replace it:
```html
<img src="profile.jpg" alt="Shrihit Bandawar" class="profile-photo" />
```
Then add to `style.css`:
```css
.profile-photo { width: 280px; height: 280px; border-radius: 50%; object-fit: cover; }
```

### Add Your LeetCode URL
In `index.html`, find the LeetCode social link and replace `https://leetcode.com/` with your profile URL.

### Add Resumes
Place your PDF files in the portfolio root:
- `Full_Stack_Resume.pdf`
- `Data_Analyst_Resume.pdf`

### Add Real Project Screenshots
Replace `.project-img-placeholder` divs with `<img>` tags pointing to your screenshots.

### Connect Contact Form
Replace the `setTimeout` in `script.js` with one of:
- **Formspree**: `fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })`
- **EmailJS**: Use their SDK
- **Your own backend**: Flask/Node endpoint

## 🎨 Design System

| Token | Value |
|---|---|
| Accent | `#6c63ff` (purple) |
| Accent 2 | `#ff6584` (pink) |
| Accent 3 | `#43e6b5` (teal) |
| Font Display | Syne |
| Font Body | DM Sans |
| Font Mono | JetBrains Mono |

## 📞 Contact

- **Email**: shrihitbandawar@gmail.com
- **GitHub**: [Shrihitbandawar18](https://github.com/Shrihitbandawar18)
- **LinkedIn**: [shrihit-bandawar-904671229](https://www.linkedin.com/in/shrihit-bandawar-904671229/)

---

© 2026 Shrihit Bandawar. Built with ❤️ and pure web technologies.
