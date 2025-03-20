/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      type
      name
      price
      image
      ingredients
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        name
        price
        image
        ingredients
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getChef = /* GraphQL */ `
  query GetChef($id: ID!) {
    getChef(id: $id) {
      id
      name
      price
      image
      rating
      dishes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listChefs = /* GraphQL */ `
  query ListChefs(
    $filter: ModelChefFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        image
        rating
        dishes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCartItem = /* GraphQL */ `
  query GetCartItem($id: ID!) {
    getCartItem(id: $id) {
      id
      name
      price
      image
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCartItems = /* GraphQL */ `
  query ListCartItems(
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCartItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        image
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
