import 'reflect-metadata';
require('dotenv').config();
import { createConnection, Connection, ConnectionOptions, getConnectionOptions } from 'typeorm';
import { join } from 'path';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config';

// const connectionOpts: ConnectionOptions = {
//     type: 'postgres',
//     host:  DB_HOST,
//     port: Number(DB_PORT) || 5432,
//     username: DB_USERNAME || '',
//     password: DB_PASSWORD || '',
//     database: DB_NAME || '',
//     entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
//     synchronize: true,
//     logging: false,
//     // extra: {
//     //     ssl: true
//     // }
// };

// const connection: Promise<Connection> = createConnection(connectionOpts);

const getOptions = async () => {
    let connectionOptions: ConnectionOptions;
    connectionOptions = {
        type: 'postgres',
        synchronize: true,
        logging: false,
        extra: {
            ssl: true,
        },
        entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
    };
    if (process.env.DATABASE_URL) {
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
        // gets your default configuration
        // you could get a specific config by name getConnectionOptions('production')
        // or getConnectionOptions(process.env.NODE_ENV)
        connectionOptions = await getConnectionOptions();
    }

    return connectionOptions;
}

const connect2Database = async (): Promise<void> => {
    const typeormconfig = await getOptions();
    await createConnection(typeormconfig);
};

connect2Database().then(async () => {
    console.log('Connected to database');
});

export default connect2Database;

// export default connection;