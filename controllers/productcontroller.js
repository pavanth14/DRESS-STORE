const Product = require('../models/product'); 

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, published, category } = req.body;

    const newProduct = new Product({
        name,
        description,
        price,
        published,
        category,
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    const { id } = req.params; // Get ID from URL parameters
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' }); // Ensure this line is reached
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find products by name
exports.findProductsByName = async (req, res) => {
    const name = req.query.name;
    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany(); // Deletes all products
        res.status(200).json({ message: 'All products deleted successfully' }); // Send a success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send error message if there's an issue
    }
};
