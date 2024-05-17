import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import DbConfig from './configuration';
import * as dotenv from 'dotenv';

dotenv.config(); // very very important!!
const typeormConfig = DbConfig() as PostgresConnectionOptions;
export default typeormConfig;
