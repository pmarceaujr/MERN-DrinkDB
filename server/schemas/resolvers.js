const { User, Drink, Ingredient } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {

                const userData = await User.findOne({ _id: context.user._id })
                    .populate({
                        path: 'drinks',
                        model: Drink
                    })
                return userData;
            }
            console.log("user" + context.user)
            throw new AuthenticationError('Not logged in');
        },
        drinks: async () => {
            return await Drink.find({});
        },

        ingredients: async () => {
            return await Ingredient.find({});
        },

        drinkByIngredient: async (parent, args) => {
            console.log(args)
            console.log(args.ingredient)
            return await Drink.find({ ingredients: args.ingredient })
        },
    },

    Mutation: {

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Username not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveDrink: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedDrinks: input } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        removeDrink: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedDrinks: { drinkId: args.drinkId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;