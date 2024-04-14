const express = require('express')
const productController = require('../controllers/productController')

const app = express.Router()

app.post('/add-product/:firmId', productController.addProduct)
app.get('/:firmId/get-product', productController.getProductByFirm)
app.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName
    req.headers('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})
app.delete('/:productId', productController.deleteProductById)
module.exports = app