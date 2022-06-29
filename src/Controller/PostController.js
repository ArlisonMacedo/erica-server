const res = require("express/lib/response")
const connection = require("../database/connection")



class PostController {

    async create (request, response) {
        const {
            text,
            user_id
        }= request.body

        const trx = await connection.transaction()
        const post = {
            text,
            user_id,
            image: request.file?.filename
        }

        await trx('posts').insert(post)
        const status = await trx.commit()

        if(!status){
            return response.status(400).json({Error: 'Erro na requisição'})
        }

        return response.status(201).json({status: 'criado com sucesso!'})
    }
    
    async index(request,response) {

        const posts = await connection.select('posts.*','users.username')
            .from('posts')
            .join('users', {'posts.id': 'posts.user_id'})
            // .orderBy('id', 'desc')
            // .select('*')
        
        const serializePosts = posts.map(post => {
            return {
                ...post,
                image_url: `http://localhost:3333/uploads/${post.image}`
            }
        })
        
        return response.json(serializePosts)

    }

}

module.exports = PostController