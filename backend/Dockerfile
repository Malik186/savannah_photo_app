# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port the app runs on (make sure it matches your .env PORT, e.g., 5000)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
