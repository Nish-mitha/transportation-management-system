const { gql } = require('apollo-server');

const typeDefs = gql`
  # User Type
  type User {
    id: ID!
    username: String!
    email: String!
    role: Role!
  }

  enum Role {
    ADMIN
    EMPLOYEE
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  # Shipment Type
  type Shipment {
    id: ID!
    shipperName: String!
    carrierName: String!
    pickupLocation: String!
    deliveryLocation: String!
    trackingNumber: String
    status: ShipmentStatus!
    rate: Float
    estimatedDelivery: String
    createdAt: String
  }

  enum ShipmentStatus {
    PENDING
    IN_TRANSIT
    DELIVERED
    CANCELLED
    DELAYED
  }

  # Inputs for Filtering and Sorting
  input ShipmentFilterInput {
    status: ShipmentStatus
    carrierName: String
  }

  input ShipmentSortInput {
    field: String
    order: SortOrder
  }

  enum SortOrder {
    ASC
    DESC
  }

  # Queries
  type Query {
    shipments(
      limit: Int
      offset: Int
      filter: ShipmentFilterInput
      sort: ShipmentSortInput
    ): [Shipment]!
    
    shipment(id: ID!): Shipment
    
    me: User
  }

  # Mutations
  type Mutation {
    login(username: String!, password: String!): AuthPayload
    
    addShipment(
      shipperName: String!
      carrierName: String!
      pickupLocation: String!
      deliveryLocation: String!
      trackingNumber: String
      status: ShipmentStatus
      rate: Float
      estimatedDelivery: String
    ): Shipment!
    
    updateShipment(
      id: ID!
      shipperName: String
      carrierName: String
      pickupLocation: String
      deliveryLocation: String
      trackingNumber: String
      status: ShipmentStatus
      rate: Float
      estimatedDelivery: String
    ): Shipment!
  }
`;

module.exports = typeDefs;
