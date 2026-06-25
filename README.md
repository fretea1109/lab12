# 🎓 Basic Development and Operation — Lab 12: Final Work

**Academic Cooperation**  
School of Computer Science and Engineering, North Minzu University  
&  
Software Engineering, College of Arts, Media and Technology, Chiang Mai University  
**Academic Year 2024**

---

## 👤 Team Member

| Name | Student ID | Image | Contribution |
|------|------------|-------|-------------|
| Wang Liangxu | 20242189 | <img src="personal-website/profile.jpg" width="120" alt="profile" /> | 50% |
| Cai Junru | 20242189 | <img src="personal-website/profile.jpg" width="120" alt="profile" /> | 50% |

---

## 🌐 Application URLs

| Application | URL | Description |
|-------------|-----|-------------|
| **Personal Website** | [http://100.48.46.12:8080](http://100.48.46.12:8080) | Personal portfolio site (Nginx) |
| **Todo Application** | [http://100.48.46.12:8082](http://100.48.46.12:8082) | Open-source todo app (Node.js/Express) |

---

## 📂 Project Structure

```
.
├── .github/workflows/deploy.yml     # CI/CD — GitHub Actions
├── docker-compose.yml               # Orchestrates both apps
├── personal-website/
│   ├── Dockerfile                   # Nginx container
│   ├── nginx.conf                   # Reverse proxy config
│   ├── index.html                   # Personal website
│   ├── style.css                    # Styles
│   └── profile.jpg                  # Profile photo
├── todo-app/
│   ├── Dockerfile                   # Node.js container
│   ├── app.js                       # Todo app source code
│   └── package.json                 # Node dependencies
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (on the server)

```bash
# SSH into server
ssh -i lab07.pem ubuntu@100.48.46.12

# Clone and deploy
git clone https://github.com/fretea1109/lab12.git
cd lab12
docker compose up -d --build
```

---

## 🐳 Docker Setup

| Service | Container Name | Host Port | Base Image |
|---------|---------------|-----------|------------|
| `personal-website` | `personal-site` | `8080:80` | nginx:latest |
| `todo-app` | `todo-app` | `8082:3000` | node:18-alpine |

Both share the `app-network` bridge network.

---

## ⚙️ CI/CD — GitHub Actions

Triggers on push to `main` → SSH into server → `git pull` → `docker compose up -d --build`

### Required GitHub Secrets

| Secret | Value |
|--------|-------|
| `SERVER_HOST` | `100.48.46.12` |
| `SERVER_USER` | `ubuntu` |
| `SERVER_SSH_KEY` | Content of `lab07.pem` |
| `SERVER_PORT` | `22` |

---

## ✅ Todo Application

Open-source todo app built with **Node.js + Express.js** and JSON file storage.  
Deployed alongside the personal website on the **same server** at the **same deployment step**.

---

## 📹 Demo Video

[Upload your .mp4 screen recording here]

---

## 📬 Submission Checklist

- [x] GitHub Repository (public)
- [x] Personal Website (with photo)
- [x] Dockerfile
- [x] GitHub Workflow (CI/CD)
- [x] Docker Compose
- [x] Todo Application (open source)
- [x] Both Apps on Same Server
- [ ] Screen recording (.mp4)
