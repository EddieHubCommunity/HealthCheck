ARG NODE_VERSION=22
FROM node:${NODE_VERSION} AS builder
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci  --omit=dev --ignore-scripts

COPY . .

RUN npx prisma generate && \
    npm run build

# Production image
FROM node:${NODE_VERSION} AS production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

# Create a non-root user and group
RUN groupadd -r appuser && useradd -r -g appuser -d /usr/src/app -s /sbin/nologin appuser

# Copy application files from builder
COPY --from=builder /usr/src/app /usr/src/app

# Change ownership of the application directory
RUN chown -R appuser:appuser /usr/src/app

# Switch to the non-root user
USER appuser

# Added healthcheck to satisfy checkov lint, you should configure this according to your application
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "run", "start"]
