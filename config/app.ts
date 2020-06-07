import dotenv from 'dotenv';

dotenv.config();

export default {
    domain: process.env.APP_DOMAIN || 'localhost',
    scheme: process.env.APP_SCHEME || 'http',
}
