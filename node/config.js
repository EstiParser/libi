import 'dotenv/config';

const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_PASSWORD ,DB_NAME,} = process.env;
export default { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_PASSWORD,DB_NAME };