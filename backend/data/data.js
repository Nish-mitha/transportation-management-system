const users = [
    {
        id: "1",
        username: "admin",
        password: "password123",
        role: "ADMIN",
        email: "admin@tms.com"
    },
    {
        id: "2",
        username: "employee",
        password: "password123",
        role: "EMPLOYEE",
        email: "emp@tms.com"
    }
];

const shipments = [
    {
        id: "SHP001",
        shipperName: "Acme Corp",
        carrierName: "FastTrans",
        pickupLocation: "New York, NY",
        deliveryLocation: "Los Angeles, CA",
        trackingNumber: "TRK123456789",
        status: "IN_TRANSIT",
        rate: 1500.00,
        estimatedDelivery: "2023-11-20",
        createdAt: "2023-11-15T10:00:00Z"
    },
    {
        id: "SHP002",
        shipperName: "Globex",
        carrierName: "ShipIt",
        pickupLocation: "Chicago, IL",
        deliveryLocation: "Miami, FL",
        trackingNumber: "TRK987654321",
        status: "DELIVERED",
        rate: 1200.50,
        estimatedDelivery: "2023-11-18",
        createdAt: "2023-11-14T14:30:00Z"
    },
    {
        id: "SHP003",
        shipperName: "Soylent Corp",
        carrierName: "FastTrans",
        pickupLocation: "Seattle, WA",
        deliveryLocation: "Austin, TX",
        trackingNumber: "TRK456123789",
        status: "PENDING",
        rate: 900.00,
        estimatedDelivery: "2023-11-25",
        createdAt: "2023-11-16T09:15:00Z"
    }
];

module.exports = { users, shipments };
