const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const products = require('./data/products');

dotenv.config();

const linkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}



// Since we don't have seperate data files yet, I'll put data here inline for this quick seed
const seedData = async () => {
    await linkDB();

    try {
        try {
            await Product.collection.drop();
        } catch (e) {
            console.log('Collection not found (new DB)');
        }
        // await Product.deleteMany();
        await User.deleteMany();

        const user = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123', // Will be hashed by pre-save hook
            phone: '9999999999',
            role: 'admin'
        });

        // Add user to each product
        const samples = products.map(p => ({ ...p, user: user._id }));

        await Product.insertMany(samples, { ordered: false });
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err.message);
        if (err.writeErrors) {
            console.error('Write Errors:', err.writeErrors.length);
            err.writeErrors.forEach(e => console.error(`Index ${e.index}: ${e.errmsg}`));
        }
        process.exit(1);
    }
};

seedData();
