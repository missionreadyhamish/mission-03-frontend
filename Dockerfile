FROM node:22
WORKDIR /missionready
COPY . . 
RUN npm install 
RUN npm run build 
EXPOSE 3000
CMD ["react-scripts", "start"]
