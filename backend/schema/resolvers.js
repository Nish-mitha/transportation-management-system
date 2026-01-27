const _ = require('lodash');
const { shipments, users } = require('../data/data');
const { generateToken } = require('../utils/auth');
const { AuthenticationError, ForbiddenError, UserInputError } = require('apollo-server');

const resolvers = {
    Query: {
        shipments: (root, { limit = 10, offset = 0, filter, sort }, context) => {
            // Authorization Check
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            let result = shipments;

            // Filtering
            if (filter) {
                if (filter.status) {
                    result = result.filter(s => s.status === filter.status);
                }
                if (filter.carrierName) {
                    result = result.filter(s => s.carrierName.toLowerCase().includes(filter.carrierName.toLowerCase()));
                }
            }

            // Sorting
            if (sort && sort.field) {
                const order = sort.order === 'DESC' ? 'desc' : 'asc';
                result = _.orderBy(result, [sort.field], [order]);
            } else {
                // Default sort by createdAt desc if not specified
                result = _.orderBy(result, ['createdAt'], ['desc']);
            }

            // Pagination
            return result.slice(offset, offset + limit);
        },

        shipment: (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }
            return shipments.find(s => s.id === id);
        },

        user: (_, __, context) => {
            if (!context.user) return null;
            return users.find(u => u.id === context.user.id);
        }
    },

    Mutation: {
        login: (_, { username, password }) => {
            const user = users.find(u => u.username === username && u.password === password);
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }
            return {
                token: generateToken(user),
                user
            };
        },

        addShipment: (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }
            // Both Admin and Employee can add shipments

            const newShipment = {
                id: `SHP${String(shipments.length + 1).padStart(3, '0')}`,
                createdAt: new Date().toISOString(),
                ...args
            };

            shipments.push(newShipment);
            return newShipment;
        },

        updateShipment: (_, { id, ...updates }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            // Role-based Access Control: Only ADMIN can update existing shipments
            // (Or specific logic: Employees can update status, Admin can update everything. The prompt said "Few features are accessible for employee and few for admin")
            // Let's implement strict restriction for update: Only ADMIN.
            if (context.user.role !== 'ADMIN') {
                throw new ForbiddenError('Only admins can update shipments');
            }

            const index = shipments.findIndex(s => s.id === id);
            if (index === -1) {
                throw new UserInputError('Shipment not found');
            }

            const updatedShipment = {
                ...shipments[index],
                ...updates
            };

            shipments[index] = updatedShipment;
            return updatedShipment;
        }
    }
};

module.exports = resolvers;
