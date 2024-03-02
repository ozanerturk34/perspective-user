# Base image. Using alpine for smaller image size
FROM node:21-alpine

# Set environment variables
ENV NODE_ENV production

# User to run app
USER node

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lon
COPY --chown=node:node package.json yarn.lock ./

# Install app dependencies
RUN yarn install
RUN yarn global add @nestjs/cli

# Bundle app source
COPY --chown=node:node . .

# Build app
RUN yarn run build

# Expose port
EXPOSE 3000

# Start app
CMD ["yarn", "start:prod"]