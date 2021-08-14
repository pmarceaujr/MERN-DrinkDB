import gql from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
                user {
                    _id
                    username
                    email
                }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
                user {
                    _id
                    username
                    email
                }
        }
    }
`;

export const SAVE_DRINK = gql`
    mutation saveDrink($input: drinkInput!) {
        saveDrink(input: $input) {
            _id
            username
            email
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

export const REMOVE_DRINK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
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