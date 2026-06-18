//esse arquivo serve para configurar o jwt e guardar em um local seguro 
//o segredo do jwt, é uma string aleatória que será usada para gerar o token

export const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
    }
}