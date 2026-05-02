const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id })
            .populate('products');

        if (!wishlist) {
            // Create empty wishlist if doesn't exist
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: []
            });
        }

        res.json(wishlist);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add/:productId
// @access  Private
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            // Create new wishlist
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [productId]
            });
        } else {
            // Check if product already in wishlist
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ message: 'Product already in wishlist' });
            }

            // Add product to wishlist
            wishlist.products.push(productId);
            await wishlist.save();
        }

        // Populate and return updated wishlist
        wishlist = await Wishlist.findById(wishlist._id).populate('products');
        res.json(wishlist);
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Remove product from wishlist
        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        // Populate and return updated wishlist
        const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
        res.json(updatedWishlist);
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};
