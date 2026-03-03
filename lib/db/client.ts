import { createClient } from 'libsql';

// Initialize the LibSQL Client
const client = createClient({
    url: process.env.LIBSQL_URL,
    apiKey: process.env.LIBSQL_API_KEY,
});

export default client;
