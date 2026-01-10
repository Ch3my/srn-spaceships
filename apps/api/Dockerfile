FROM node:lts-slim

WORKDIR /app

# Copy root package.json and package-lock.json for workspace setup
COPY package.json package-lock.json ./

# Copy workspace packages
COPY packages/shared-types ./packages/shared-types
COPY apps/api ./apps/api

# Install dependencies for the entire monorepo
RUN npm install

# Build shared-types first, then api
RUN npm run build --workspace=packages/shared-types
RUN npm run build --workspace=apps/api

EXPOSE 3000

# Run the api from its workspace
WORKDIR /app/apps/api
CMD ["npm", "start"]
