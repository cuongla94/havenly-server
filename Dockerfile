# Stage 1: Build the application
FROM node:16-alpine AS builder

WORKDIR /app

# Copy .npmrc for npm authentication
COPY .npmrc .npmrc

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app .

EXPOSE 4000

CMD ["npm", "start"]
