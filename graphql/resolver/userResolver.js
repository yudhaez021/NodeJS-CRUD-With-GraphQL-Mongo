const User = require('../../models/user');

module.exports = {
    getUsers: async function({}, req) {
        const users = await User.find();
        return {
            result: users.map(u => {
                return {
                    ...u._doc,
                    id: u._id.toString()
                };
            })
        };
    },

    getSingleUser: async function(input, req) {
        const id = input.id;

        // const user = await User.findOne({ name: input.name }); // get single data by name
        const user = await User.findById(id).exec();
        if (!user) {
            const error = new Error('User is not found!');
            throw error;
        }

        return { 
            ...user._doc,
            id: user._id.toString()
        };
    },

    createUser: async function({ input }, req) {
        const existingUser = await User.findOne({ name: input.name });
        if (existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }

        const user = new User(input);        
        const createdUser = await user.save();
        return { ...createdUser._doc, id: createdUser._id.toString() };
    },

    updateUser: async function({ input }, req) {
        const id = input.id;

        let selectedUser = await User.findById(id);
        if (!selectedUser) {
            const error = new Error('User is not found!');
            throw error;
        }

        if (input.name) {
            selectedUser.name = input.name;
        }
        if (input.fullname) {
            selectedUser.fullname = input.fullname;
        }
        if (input.age) {
            selectedUser.age = input.age;
        }
        if (input.address) {
            selectedUser.address = input.address;
        }

        const updatedUser = await selectedUser.save();
        const user = await User.findById(id).exec();
        return { 
            ...updatedUser._doc,
            id: user._id.toString()
        };
    },

    deleteUserById: async function(input, req) {
        const id = input.id;
        
        const user = await User.findById(id).exec();
        if (!user) {
            const error = new Error('User is not found!');
            throw error;
        }
        
        await User.findByIdAndRemove(id);
        return true;
    },
};