# Use official Node.js LTS Alpine base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Copy the app source code
COPY . .

# Expose port (override via env in Kubernetes)
EXPOSE 3005

# Start the service
CMD ["node", "src/index.js"]
