import gql from 'graphql-tag';

export const GET_USER = gql`
    {
        me {
            _id
            username
            email
            drinkCount
            savedDrinks {
                drinkId
                ingredients
                glass
                instructions
                name
                image
            }
        }
    }
`;

export const GET_DRINKS = gql`
    {
        drinks {
            name
            ingredients
            measure
            instructions
        }
    }
`;

export const GET_DRINK_BY_INGREDIENT = gql`
    query drinksByIngredient($ingredient: String) {
        drinkByIngredient(ingredient: $ingredient) {
            name
            ingredients
            instructions
        }
    }`;

export const GRAPHQL_API = 'http://localhost:3000/graphql'
