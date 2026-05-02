const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        console.log('Search Keyword Received:', req.query.keyword);
        const search = req.query.keyword ? String(req.query.keyword).trim() : '';

        let keyword = {};

        if (search) {
            keyword = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { brand: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const products = await Product.find(keyword);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // Generate reviews and enhanced description for the product
            const { generateReviews } = require('../utils/reviewGenerator');
            const { generateDescription } = require('../utils/descriptionGenerator');

            const productObj = product.toObject();

            // Generate enhanced description if current description is short
            let enhancedDescription = productObj.description;
            if (!productObj.description || productObj.description.length < 100) {
                enhancedDescription = generateDescription(productObj);
            }

            const productWithEnhancements = {
                ...productObj,
                description: enhancedDescription,
                ...generateReviews(productObj)
            };

            res.json(productWithEnhancements);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
};
