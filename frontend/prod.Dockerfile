FROM node:24.13.0-alpine3.22 AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /frontend

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs --ingroup nodejs
USER nextjs

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /frontend/public ./public

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]