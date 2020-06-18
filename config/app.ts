import dotenv from 'dotenv';

dotenv.config();

export default {
    domain: process.env.APP_DOMAIN || 'localhost:8000',
    scheme: process.env.APP_SCHEME || 'http',
}
