
import {
    cleanEnv, str, port,
} from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        SECRET: str(),
        DB_HOST: str(),
        DB_PORT: port(),
        DB_NAME: str(),
        DB_PASSWORD: str(),
    });
}

export default validateEnv;