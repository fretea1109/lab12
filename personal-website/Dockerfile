# ============================================================
# Personal Website — Nginx static site
# ============================================================
FROM nginx:latest AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our static website
COPY index.html /usr/share/nginx/html/index.html
COPY style.css  /usr/share/nginx/html/style.css
COPY profile.jpg /usr/share/nginx/html/profile.jpg

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
