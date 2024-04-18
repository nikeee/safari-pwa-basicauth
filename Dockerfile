FROM node:alpine
COPY ./index.js /index.js
EXPOSE 80
CMD ["node", "/index.js"]
