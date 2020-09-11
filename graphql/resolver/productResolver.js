const Product = require('../../models/product');

module.exports = {
    getProducts: async function({}, req) {
        const products = await Product.find();
        return {
            result: products.map(u => {
                return {
                    ...u._doc,
                    id: u._id.toString()
                };
            })
        };
    },

    getProductById: async function(input, req) {
        const id = input.id;

        const product = await Product.findById(id).exec();
        if (!product) {
            const error = new Error('Product is not found!');
            throw error;
        }

        return { 
            ...product._doc,
            id: product._id.toString()
        };
    },

    getProductByPcode: async function(input, req) {
        const product = await Product.findOne({ productCode: input.productCode }); // get single data by productCode
        if (!product) {
            const error = new Error('Product is not found!');
            throw error;
        }

        return { 
            ...product._doc,
            id: product._id.toString()
        };
    },

    createProduct: async function({ input }, req) {
        const existingPCode = await Product.findOne({ productCode: input.productCode });
        if (existingPCode) {
            const error = new Error('Product code is exists already!');
            throw error;
        }

        const product = new Product(input);        
        const createdProduct = await product.save();
        return { ...createdProduct._doc, id: createdProduct._id.toString() };
    },

    updateProduct: async function({ input }, req) {
        const id = input.id;

        let selectedProduct = await Product.findById(id);
        if (!selectedProduct) {
            const error = new Error('Product is not found!');
            throw error;
        }

        if (input.productCode) {
            selectedProduct.productCode = input.productCode;
        }
        if (input.productName) {
            selectedProduct.productName = input.productName;
        }
        if (input.productImageUrl) {
            selectedProduct.productImageUrl = input.productImageUrl;
        }
        if (input.productDescription) {
            selectedProduct.productDescription = input.productDescription;
        }
        if (input.shortProductDescription) {
            selectedProduct.shortProductDescription = input.shortProductDescription;
        }
        if (input.price) {
            selectedProduct.price = input.price;
        }
        if (input.promoDescription) {
            selectedProduct.promoDescription = input.promoDescription;
        }

        const updatedProduct = await selectedProduct.save();
        const product = await Product.findById(id).exec();
        return { 
            ...updatedProduct._doc,
            id: product._id.toString()
        };
    },

    deleteProductById: async function(input, req) {
        const id = input.id;
        
        const product = await Product.findById(id).exec();
        if (!product) {
            const error = new Error('Product is not found!');
            throw error;
        }
        
        await Product.findByIdAndRemove(id);
        return true;
    },
};