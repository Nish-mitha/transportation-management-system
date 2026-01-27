const http = require('http');

const query = (q, token = null) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ query: q });
        const options = {
            hostname: 'localhost',
            port: 4000,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
};

async function runTest() {
    console.log('--- Starting Verification ---');

    // 1. Login
    console.log('\n1. Logging in as Admin...');
    const loginRes = await query(`
    mutation {
      login(username: "admin", password: "password123") {
        token
        user {
          id
          username
          role
        }
      }
    }
  `);

    if (loginRes.errors) {
        console.error('Login failed:', loginRes.errors);
        process.exit(1);
    }

    const token = loginRes.data.login.token;
    console.log('Login successful. Token received.');

    // 2. List Shipments
    console.log('\n2. Listing Shipments...');
    const listRes = await query(`
    query {
      shipments(limit: 2) {
        id
        shipperName
        status
        rate
      }
    }
  `, token);

    if (listRes.errors) {
        console.error('List shipments failed:', listRes.errors);
    } else {
        console.log(`Retrieved ${listRes.data.shipments.length} shipments.`);
        console.log('Sample:', listRes.data.shipments[0]);
    }

    // 3. Add Shipment
    console.log('\n3. Adding a new Shipment...');
    const addRes = await query(`
    mutation {
      addShipment(
        shipperName: "New Shipper"
        carrierName: "New Carrier"
        pickupLocation: "San Francisco, CA"
        deliveryLocation: "Boston, MA"
        status: PENDING
        rate: 500.0
      ) {
        id
        shipperName
        status
      }
    }
  `, token);

    if (addRes.errors) {
        console.error('Add shipment failed:', addRes.errors);
    } else {
        console.log('Shipment added:', addRes.data.addShipment);
    }

    console.log('\n--- Verification Complete ---');
}

runTest();
