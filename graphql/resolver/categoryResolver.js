const Category = require('../../models/category');

module.exports = {
    getCategories: async function({}, req) {
        const categories = await Category.find();
        return {
            result: categories.map(u => {
                return {
                    ...u._doc,
                    id: u._id.toString()
                };
            })
        };
    },

    getCategoryById: async function(input, req) {
        const id = input.id;

        const category = await Category.findById(id).exec();
        if (!category) {
            const error = new Error('Category is not found!');
            throw error;
        }

        return { 
            ...category._doc,
            id: category._id.toString()
        };
    },

    createCategory: async function({ input }, req) {
        const existingCode = await Category.findOne({ code: input.code });
        if (existingCode) {
            const error = new Error('Category code is exists already!');
            throw error;
        }

        const category = new Category(input);        
        const createdCategory = await category.save();
        return { ...createdCategory._doc, id: createdCategory._id.toString() };
    },

    updateCategory: async function({ input }, req) {
        const id = input.id;

        let selectedCategory = await Category.findById(id);
        if (!selectedCategory) {
            const error = new Error('Category is not found!');
            throw error;
        }

        if (input.code) {
            selectedCategory.code = input.code;
        }
        if (input.name) {
            selectedCategory.name = input.name;
        }
        if (input.imageUrl) {
            selectedCategory.imageUrl = input.imageUrl;
        }
        if (input.description) {
            selectedCategory.description = input.description;
        }
        if (input.shortDescription) {
            selectedCategory.shortDescription = input.shortDescription;
        }

        const updatedCategory = await selectedCategory.save();
        const category = await Category.findById(id).exec();
        return { 
            ...updatedCategory._doc,
            id: category._id.toString()
        };
    },

    deleteCategoryById: async function(input, req) {
        const id = input.id;
        
        const category = await Category.findById(id).exec();
        if (!category) {
            const error = new Error('Category is not found!');
            throw error;
        }
        
        await Category.findByIdAndRemove(id);
        return true;
    },
};