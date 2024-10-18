const mongoose = require('mongoose');

// Define Product schema
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    published: { type: Boolean, default: false },
    category: { type: String, required: true },
   
});

// Export the Product model
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
