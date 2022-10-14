import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookInput!){
        savebook(input: $input!) {           
            savedbooks{
                authors
                description
                bookId
                image
                link
                title             
                
        }
    }
}
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!!){
        removeBook(bookId: $bookId!) {           
            savedbooks{
                bookId
        }
    }
    }
`;
