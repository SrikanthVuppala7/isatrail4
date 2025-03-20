/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($filter: ModelSubscriptionItemFilterInput) {
    onCreateItem(filter: $filter) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($filter: ModelSubscriptionItemFilterInput) {
    onUpdateItem(filter: $filter) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($filter: ModelSubscriptionItemFilterInput) {
    onDeleteItem(filter: $filter) {
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
export const onCreateChef = /* GraphQL */ `
  subscription OnCreateChef($filter: ModelSubscriptionChefFilterInput) {
    onCreateChef(filter: $filter) {
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
export const onUpdateChef = /* GraphQL */ `
  subscription OnUpdateChef($filter: ModelSubscriptionChefFilterInput) {
    onUpdateChef(filter: $filter) {
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
export const onDeleteChef = /* GraphQL */ `
  subscription OnDeleteChef($filter: ModelSubscriptionChefFilterInput) {
    onDeleteChef(filter: $filter) {
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
export const onCreateCartItem = /* GraphQL */ `
  subscription OnCreateCartItem($filter: ModelSubscriptionCartItemFilterInput) {
    onCreateCartItem(filter: $filter) {
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
export const onUpdateCartItem = /* GraphQL */ `
  subscription OnUpdateCartItem($filter: ModelSubscriptionCartItemFilterInput) {
    onUpdateCartItem(filter: $filter) {
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
export const onDeleteCartItem = /* GraphQL */ `
  subscription OnDeleteCartItem($filter: ModelSubscriptionCartItemFilterInput) {
    onDeleteCartItem(filter: $filter) {
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
