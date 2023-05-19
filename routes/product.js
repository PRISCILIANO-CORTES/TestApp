const { Router } = require('express');
const { check } = require('express-validator');
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { existProductId } = require('../helpers/dbValidations');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

//*** Get all products - public */
router.get('/', getAllProducts)

//*** Get one product for ID - public */
router.get(
    '/:id', 
    [
        check('id', 'This is not ID Mongo valid').isMongoId(),
        check('id').custom( existProductId ),
        validateFields
    ], 
    getOneProduct
)

//*** Create a product with any Rol with valid token - private */
router.post(
    '/', 
    [ 
        check('name', 'Name is required').not().isEmpty(),
        validateFields 
    ], 
    createProduct
)

//*** Update one product with valid token - private */
router.put(
    '/:id', 
    [
        check('id').custom( existProductId ),
        validateFields
    ],
    updateProduct
)

//*** Delete one product with rol is Admin */
router.delete(
    '/:id', 
    [
        check('id', 'This is not ID Mongo valid').isMongoId(),
        check('id').custom( existProductId ),
        validateFields
    ],
    deleteProduct
)

module.exports = router;