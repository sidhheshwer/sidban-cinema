# 🎬 SidbanCinema

> **SidbanCinema is a full-stack movie streaming portfolio application built with React, Spring Boot, MongoDB, Docker, and TMDB API.**

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?logo=springboot)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 About

SidbanCinema is a full-stack movie streaming platform developed as a **portfolio project** to demonstrate enterprise-level web application development.

The project focuses on building a secure, scalable, and modern streaming platform with clean architecture, JWT authentication, AI integration, and responsive UI.

---

## ✨ Features

- 🎥 Browse Popular Movies
- 📺 Browse TV Series
- 🔥 Trending Movies
- ⭐ Top IMDb Movies
- 🔍 Smart Movie Search
- 🤖 SidbanAI Movie Assistant
- 🔐 JWT Authentication
- 👤 User Profile
- 🖼️ Cloudinary Profile Picture Upload
- 📜 Watch History
- 🎭 Cast & Crew Information
- 📖 Movie Overview
- ▶️ Movie,Series Player with Episodes Section
- ♾️ Infinite Scrolling
- ⚡ Backend Caching
- 📱 Responsive UI

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS3
- React Icons
- React Hot Toast

---

## Backend

- Spring Boot
- Spring Security
- JWT
- OAuth2
- MongoDB
- Cloudinary
- RestTemplate

---

## APIs

- TMDB API
- OMDB API

---

# 🏗 Architecture

```
React
   │
   ▼
Spring Boot REST APIs
   │
   ▼
MongoDB
   │
   ▼
TMDB API
```

---

# 📂 Project Structure

```
sidban-cinema

├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── services
│   ├── dto
│   ├── configurations
│   ├── repository
│   └── pom.xml
│
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

---

# 🚀 Running Locally

## Clone Repository

```bash
git clone https://github.com/sidhheshwer/sidban-cinema.git
```

---

## Frontend

```bash
cd frontend

npm install

npm start
```

Runs on

```
http://localhost:3000
```

---

## Backend

```bash
cd backend

./mvnw spring-boot:run
```

Runs on

```
http://localhost:8080
```

---

# 🐳 Docker

Build Image

```bash
docker build -t sidban-cinema .
```

Run Container

```bash
docker run -p 8080:8080 sidban-cinema
```

---

# 🌐 Live Demo

**Render**

> https://sidban-cinema.onrender.com

---

# 📸 Screenshots


# 📸 Screenshots

## 🔐 Sign In Page
![Sign In Page](screenshots/sidban-des-sign.png)

---

## 🔑 Login Page
![Login Page](screenshots/sidban-des-alert.png)

---

## 🛡️ Sidban Alert
![Sidban Alert](screenshots/login.png)

---

## 🏠 Home Page
![Home Page](screenshots/sidban-des-home.png)

---

## 🎬 Header
![Header](screenshots/sidban-des-head.png)

---

## 🧭 Navigation Bar
![Navigation Bar](screenshots/sidban-des-nav.png)

---

## 🎭 Categories Section
![Categories Section](screenshots/sidban-des-cat.png)

---

## 📂 Category Page
![Category Page](screenshots/sidban-des-catpage.png)

---

## 🕒 Watch History
![Watch History](screenshots/sidban-des-history.png)

---

## 🤖 SidbanAI
![SidbanAI](screenshots/sidban-des-ai.png)

---

## 📖 Movie Overview
![Movie Overview](screenshots/sidban-des-overview.png)

---

## 🎭 Cast & Crew
![Cast & Crew](screenshots/sidban-des-cast.png)

---

## 🔍 Search
![Search](screenshots/sidban-des-search.png)

---

## ▶️ Movie Player
![Movie Player](screenshots/sidban-des-player.png)

---

## 🎞️ Player Controls
![Player Controls](screenshots/sidban-des-playernav.png)

---

## 📺 Episodes Section
![Episodes Section](screenshots/sidban-des-episodes.png)

---

## ❌ Error Page
![Error Page](screenshots/sidban-des-error.png)

---

## ℹ️ About Page
![About Page](screenshots/sidban-des-about.png)

---

## ⏳ Sidban Loader
![Sidban Loader](screenshots/sidban-des-loader.png)

---

## 📄 Footer
![Footer](screenshots/sidban-des-footer.png)

# 🔒 Authentication

- JWT Authentication
- HTTP-Only Cookies
- Secure Login
- Protected Routes

---

# 🤖 SidbanAI

SidbanAI helps users discover movies,answer movie-related Summarys,and improve the browsing experience through AI-powered assistance.

---

# ⚡ Performance Optimizations

- Backend API Caching
- Infinite Scrolling
- Lazy Loading
- Optimized REST APIs
- Responsive UI
- Cloudinary Image Optimization

---

# ⚠ Disclaimer

SidbanCinema is an educational and portfolio project created to demonstrate full-stack development skills.

This project:

- Does **not** host or distribute copyrighted media.
- Does **not** store movies on its own servers.
- Uses publicly available third-party APIs and services.
- All movie posters, metadata, and related content belong to their respective copyright owners.

I strongly encourage supporting the film industry by watching movies in **theaters** or through **official licensed streaming platforms**.

---

# 👨‍💻 Developer

## Sidhheshwer Bansode

> "Dreams are the silent promises we make to ourselves."

---

⭐ If you enjoyed this project, consider giving it a Star.