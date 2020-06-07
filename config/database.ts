import dotenv from 'dotenv';

dotenv.config();

export default {
    db_database: process.env.DB_DATABASE || 'ecoleta.sqlite3',
}