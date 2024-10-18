const express = require('express');
const productController = require('../controllers/productController'); // Importing the controller

const router = express.Router();

// Route to create a new product
router.post('/', productController.createProduct);

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to get a single product by ID
router.get('/:id', productController.getProductById);

// Find products by name
router.get('/', productController.findProductsByName);

// Update a product by ID
router.put('/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to delete all products
router.delete('/', productController.deleteAllProducts); // Ensure this line exists

module.exports = router; // Exporting the router
