# 🎓 Basic Development and Operation — Lab 12: Final Work

**Academic Year 2024**

---

## 👤 Team Member

| Name | Student ID | Image | Contribution |
|------|------------|-------|-------------|
| Wang Liangxu | 20242189 | <img src="personal-website/profile.jpg" width="120" alt="profile" /> | 50% |
| Cai Junru | 20242190 | <img src="personal-website/profile.jpg" width="120" alt="profile" /> | 50% |

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
