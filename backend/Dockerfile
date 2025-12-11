# Utilise une image officielle Node.js
FROM node:18-alpine

# Crée un dossier de travail dans le conteneur
WORKDIR /app

# Copie package.json et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Expose le port de ton serveur (ex: 3000)
EXPOSE 3000

# Commande de lancement
CMD ["npm", "start"]
