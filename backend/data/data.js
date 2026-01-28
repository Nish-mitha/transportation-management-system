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
    },
    {
        id: "SHP004",
        shipperName: "Initech",
        carrierName: "ShipIt",
        pickupLocation: "Denver, CO",
        deliveryLocation: "San Francisco, CA",
        trackingNumber: "TRK111222333",
        status: "DELAYED",
        rate: 1800.00,
        estimatedDelivery: "2023-11-21",
        createdAt: "2023-11-14T08:00:00Z"
    },
    {
        id: "SHP005",
        shipperName: "Umbrella Corp",
        carrierName: "FastTrans",
        pickupLocation: "Raccoon City",
        deliveryLocation: "Tokyo, Japan",
        trackingNumber: "TR777888999",
        status: "IN_TRANSIT",
        rate: 5500.00,
        estimatedDelivery: "2023-11-30",
        createdAt: "2023-11-17T12:00:00Z"
    },
    {
        id: "SHP006",
        shipperName: "Hooli",
        carrierName: "ShipIt",
        pickupLocation: "Palo Alto, CA",
        deliveryLocation: "Seattle, WA",
        trackingNumber: "TR555444333",
        status: "DELIVERED",
        rate: 850.00,
        estimatedDelivery: "2023-11-15",
        createdAt: "2023-11-10T11:30:00Z"
    },
    {
        id: "SHP007",
        shipperName: "Wayne Enterprises",
        carrierName: "GothamX",
        pickupLocation: "Gotham City",
        deliveryLocation: "Metropolis",
        trackingNumber: "TR999000111",
        status: "PENDING",
        rate: 3200.00,
        estimatedDelivery: "2023-12-05",
        createdAt: "2023-11-18T16:45:00Z"
    },
    {
        id: "SHP008",
        shipperName: "Stark Industries",
        carrierName: "FastTrans",
        pickupLocation: "New York, NY",
        deliveryLocation: "Malibu, CA",
        trackingNumber: "TR121212121",
        status: "IN_TRANSIT",
        rate: 4500.00,
        estimatedDelivery: "2023-11-25",
        createdAt: "2023-11-15T09:00:00Z"
    },
    {
        id: "SHP009",
        shipperName: "Cyberdyne Systems",
        carrierName: "ShipIt",
        pickupLocation: "Sunnyvale, CA",
        deliveryLocation: "Washington, DC",
        trackingNumber: "TR343434343",
        status: "DELAYED",
        rate: 2200.00,
        estimatedDelivery: "2023-11-24",
        createdAt: "2023-11-16T14:20:00Z"
    },
    {
        id: "SHP010",
        shipperName: "Oscorp",
        carrierName: "GothamX",
        pickupLocation: "New York, NY",
        deliveryLocation: "Boston, MA",
        trackingNumber: "TR565656565",
        status: "DELIVERED",
        rate: 950.00,
        estimatedDelivery: "2023-11-17",
        createdAt: "2023-11-12T10:10:00Z"
    },
    {
        id: "SHP011",
        shipperName: "Massive Dynamic",
        carrierName: "FastTrans",
        pickupLocation: "Boston, MA",
        deliveryLocation: "Philadelphia, PA",
        trackingNumber: "TR787878787",
        status: "IN_TRANSIT",
        rate: 1100.00,
        estimatedDelivery: "2023-11-22",
        createdAt: "2023-11-18T08:30:00Z"
    },
    {
        id: "SHP012",
        shipperName: "LexCorp",
        carrierName: "GothamX",
        pickupLocation: "Metropolis",
        deliveryLocation: "Central City",
        trackingNumber: "TR909090909",
        status: "PENDING",
        rate: 2100.00,
        estimatedDelivery: "2023-12-01",
        createdAt: "2023-11-19T13:45:00Z"
    },
    {
        id: "SHP013",
        shipperName: "Tyrell Corp",
        carrierName: "ShipIt",
        pickupLocation: "Los Angeles, CA",
        deliveryLocation: "San Francisco, CA",
        trackingNumber: "TR112233445",
        status: "DELAYED",
        rate: 1350.00,
        estimatedDelivery: "2023-11-26",
        createdAt: "2023-11-17T11:15:00Z"
    },
    {
        id: "SHP014",
        shipperName: "Vought International",
        carrierName: "FastTrans",
        pickupLocation: "New York, NY",
        deliveryLocation: "Chicago, IL",
        trackingNumber: "TR223344556",
        status: "DELIVERED",
        rate: 1600.00,
        estimatedDelivery: "2023-11-14",
        createdAt: "2023-11-09T09:45:00Z"
    },
    {
        id: "SHP015",
        shipperName: "Aperture Science",
        carrierName: "ShipIt",
        pickupLocation: "Upper Peninsula, MI",
        deliveryLocation: "Seattle, WA",
        trackingNumber: "TR334455667",
        status: "IN_TRANSIT",
        rate: 2800.00,
        estimatedDelivery: "2023-11-28",
        createdAt: "2023-11-20T10:00:00Z"
    },
    {
        id: "SHP016",
        shipperName: "Black Mesa",
        carrierName: "GothamX",
        pickupLocation: "New Mexico",
        deliveryLocation: "City 17",
        trackingNumber: "TR445566778",
        status: "PENDING",
        rate: 3400.00,
        estimatedDelivery: "2023-12-10",
        createdAt: "2023-11-21T15:30:00Z"
    }
];

module.exports = { users, shipments };
