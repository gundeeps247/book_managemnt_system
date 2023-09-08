# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install the 'sqlite3' module and its dependencies
RUN npm install sqlite3 --build-from-source --unsafe-perm

# Copy all files from the current directory to the container's working directory
COPY . .

# Expose the port your Node.js app is running on (Change the port if needed)
EXPOSE 8080

# Start the Node.js app
CMD ["npm", "start"]
