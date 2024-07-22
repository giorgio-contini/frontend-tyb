# Usa un'immagine base per Node.js per il processo di build
FROM node:14-alpine AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il codice dell'applicazione
COPY . .

# Costruisci l'applicazione
RUN PUBLIC_URL=/tyb npm run build

# Usa un'immagine base Nginx per la produzione
FROM nginx:stable-alpine

# Copia il file di configurazione di Nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

# Copia i file di build dall'immagine di build
COPY --from=build /app/build /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80

# Comando per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]
