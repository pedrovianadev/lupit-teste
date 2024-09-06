# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o código fonte
COPY . .

# Expondo a porta 3000
EXPOSE 3000

# Iniciando a aplicação Next.js
CMD ["npm", "run", "dev"]
