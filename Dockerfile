# Use a specific Node.js version
FROM node:14-alpine as base

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


FROM base as test
#layer test tools and assets on top as optional test stage
RUN apk add --no-cache apache2-utils


FROM base as final