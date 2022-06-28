const connection  = require('../database/connection')



class UserController {
    async create (request, response) {

        

        const {
            name,
            username,
            password,
            functionBand,
            bio,
        } = request.body

        const alreadyUsername = await connection('users')
            .where('username', username)
            .select('id')
        if(alreadyUsername[0]){
            return response.status(400).json({error: 'usuario já existe'})
        } 
        
        const trx = await connection.transaction()
        const user = {
            name,
            username,
            password,
            functionBand,
            bio,
            image: request.file?.filename
        }

        await trx('users').insert(user)
        const status = await trx.commit()

        if (!status){
            return response.status(400).json({error: 'Erro na Requisição'})
        }

        return response.status(201).json({status: 'Criado com sucesso!!!'})
    }
}

module.exports = UserController