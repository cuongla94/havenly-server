# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including dev dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 4000

# Start the application using nodemon
CMD ["nodemon", "server.ts"]
