# Use a specific Node.js version
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Set the environment variable
ENV NODE_ENV=production

# Specify the command to run the application
CMD ["node", "app.js"]
