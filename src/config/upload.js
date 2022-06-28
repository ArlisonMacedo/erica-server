const multer = require('multer')
const path = require('path')

const multerConfig = {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`

            callback(null, fileName)
        }
    })
}

module.exports = multerConfig