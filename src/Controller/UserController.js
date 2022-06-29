const connection = require('../database/connection')



class UserController {
    async create(request, response) {

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
        if (alreadyUsername[0]) {
            return response.status(400).json({ error: 'Usuário já existe' })
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

        if (!status) {
            return response.status(400).json({ error: 'Erro na Requisição' })
        }

        return response.status(201).json({ status: 'Criado com sucesso!!!' })
    }

    async login(request, response) {

        const { username, password } = request.body

        const auth = await connection('users')
            .where('username', username)
            .andWhere('password', password)
            .select('id', 'name', 'username', 'bio', 'functionBand', 'image')
            .first()

        if (!auth){
            return response.status(400).json({Error: 'Usuário ou senha inválidos'})
        }


        const serializeAuth = {
            ...auth,
            image_url: `http://localhost:3333/uploads/${auth.image}`
        }

        return response.status(200).json(serializeAuth)
    }

    async editProfile(request, response) {

        const { id } = request.params

        const auth = await connection('users')
            .where('id', id)
            // .andWhere('password', password)
            .select('id', 'name', 'username', 'password', 'bio', 'functionBand', 'image')
            .first()


        // const serializeAuth = {
        //     ...auth,
        //     image_url: `http://localhost:3333/uploads/${auth.image}`
        // }


        
        const imageData = {
            image: request.file?.filename
        }

        // console.log(imageData.image)

        const data = await connection('users')
            .where('id', id)
            .update({
                'image': imageData.image
            })

        return response.status(201).json(data)

    }

    async profile(request, response) {
        const {username} = request.params

        const user = await connection('users')
            .where('username', username)
            .select('id', 'name', 'username', 'password', 'bio', 'functionBand', 'image')
            .first()

        if (!user){
            return response.status(400).json({Error: 'usuario não disponivel'})
        }

        const serializeUser = {
            ...user,
            image_url: `http://localhost:3333/uploads/${user.image}`
        }

        return response.json(serializeUser)
    }
}

module.exports = UserController