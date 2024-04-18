FROM node:alpine
COPY ./index.js /index.js
USER node
EXPOSE 3000
CMD ["node", "/index.js"]
