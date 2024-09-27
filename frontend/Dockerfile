# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /var/www

# Copy the package.json and package-lock.json files
COPY package*.json .

# Install React app dependencies

RUN npm install
# Copy the React app code into the container
COPY . .


# Build the React app for production
# RUN npm run build

# Install serve to run the production build
# RUN npm install -g serve


# Expose port 5173
EXPOSE 5173

# Serve the app using serve
#CMD ["serve", "-s", "build", "-l", "5173"]
