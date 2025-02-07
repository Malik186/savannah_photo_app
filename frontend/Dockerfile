# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port (make sure it matches your next.config.js or default port 3000)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
