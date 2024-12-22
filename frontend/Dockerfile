FROM node:16 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3021

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]