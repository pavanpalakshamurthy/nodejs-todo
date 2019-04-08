FROM node:9

#setting the working directory within the image
WORKDIR /usr/app/

#copying source code to the working directory
COPY . .

#install all the dependent node modules from NPM registry
RUN npm install --quiet

#run the application
CMD ["node", "index.js" ]

EXPOSE 3000