import "reflect-metadata";
import * as express from 'express';
require('dotenv').config();
import { ApolloServer } from "apollo-server-express";
import connection from "./ormconfig";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
const consola = require('consola');
import { PORT } from "./config";
import * as AppModels from './entity'
import GraphQLAuthMiddleware from "./middleware/graphql-auth-middleware";
import { schemaDirectives } from "./directives";
import typedefs from "./typedefs";
import resolvers from "./resolvers";

class App {
  public basePath = "/api";
  public app: express.Application;

  constructor(controllers: any) {
    this.app = express();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(GraphQLAuthMiddleware);
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller: any) => {
      this.app.use(`${this.basePath}`, controller.router);
    });
  }

  private async connectToTheDatabase() {
    await connection;
  }

  public listen() {
    const server = new ApolloServer({
      typeDefs: typedefs,
      resolvers: resolvers,
      schemaDirectives,
      playground: true,
      context: ({ req }) => {

        let { user, isAuth, } = req;

        return { req, user, isAuth, ...AppModels };
      }
    });

    const corsConfig = {
      credentials: true,
      allowedHeaders: ['Authorization'],
      exposedHeaders: ['Authorization']
    };

    server.applyMiddleware({ app: this.app, path: this.basePath, cors: corsConfig })

    this.app.listen(PORT, () => consola.success({
      barge: true,
      message: `🚀 Server Running on Port:${PORT}`
    }))
  }
}

export default App;