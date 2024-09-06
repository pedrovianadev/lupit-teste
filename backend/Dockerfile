# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Instalando o Prisma Client e o CLI
RUN npm install -g @nestjs/cli prisma

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código fonte
COPY . .

# Gerando o Prisma Client
RUN npx prisma generate

# Expondo a porta do Nest.js
EXPOSE 3001

# Iniciando a aplicação Nest.js
CMD ["npm", "run", "start:dev"]
