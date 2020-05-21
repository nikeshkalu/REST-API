const express = require('express')
const router = express.Router();
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const productController = require('../controllers/controller_product')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname);
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    filefilter: filefilter
})

router.get('/', productController.product_get_all)

router.post('/', checkAuth, upload.single('productImage'), productController.product_create_product)

router.get('/:productId', productController.product_get_product)

router.patch('/:productId', checkAuth, productController.product_update_product)

router.delete('/:productId', checkAuth, productController.product_delete_product)

module.exports = router