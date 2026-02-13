<!-- Developer: Matthew Msingathi - hlazomatthew@gmail.com -->

# Next.js Docker App

This is a **Next.js** application containerized using **Docker**.

## Dockerfile Overview

The Dockerfile uses Node 20 as the base image and follows these steps:

1. Set the working directory to `/app`.
2. Copy `package.json` and `package-lock.json` to the container.
3. Install dependencies using `npm install`.
4. Copy the rest of the project files into the container.
5. Build the Next.js application using `npm run build`.
6. Expose port `3000`.
7. Start the application with `npm start`.

### Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
