FROM node:lts-alpine

# create destination directory
RUN mkdir -p /usr/src/vue-ticket-reports
WORKDIR /usr/src/vue-ticket-reports

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/vue-ticket-reports/
RUN npm i

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV VITE_HOST 0.0.0.0

# set app port
ENV VITE_PORT 3000

ENV VITE_API_URL http://127.0.0.1:8000/api/v2/ticket/report

# start the app
CMD [ "npm", "run", "preview" ]