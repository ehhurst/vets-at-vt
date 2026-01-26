# Use Node 20 LTS (matches Volta)
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Add build deps needed for node-gyp (bufferutil via @vercel/postgres/ws)
RUN apk add --no-cache python3 make g++

# Copy dependency files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Run Next.js dev server
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
