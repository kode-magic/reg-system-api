# Pull in the official lightweight version of Node 12.
FROM node:14.15.3-alpine3.12

# Create and change to the app directory.
WORKDIR /app

ADD . /app

COPY package.json ./

# Install production dependencies.
RUN npm install

RUN npm run build

ENV PORT 8080
ENV DB_USER=ugdmlwkabalvwdimtet5
ENV DB_PASSWORD=IXKRu4vMEKkm5veFk2GL
ENV DB_NAME=blhgiob4s2tasl6cuwv0
ENV DB_HOST=blhgiob4s2tasl6cuwv0-postgresql.services.clever-cloud.com
ENV DB_PORT=5432
ENV SECRET=fhgfsd65sdbv$!fg87644/5v!76vcn$
ENV GOOGLE_APPLICATION_CREDENTIALS=mamie-koka-key.json
ENV DATABASE_URL=postgres://eoiggywf:i3U84uP1OwSJIfs9qHmPcXxoaO6VmphT@otto.db.elephantsql.com:5432/eoiggywf

# Start the api server
CMD [ "npm", "start" ]