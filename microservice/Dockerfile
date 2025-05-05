# 1. Use an official Node.js runtime as the base image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only package.json and package-lock.json first
COPY package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy the rest of your application code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Command to run your app
CMD ["node", "index.js"]