import express, { Application, NextFunction, Request, Response } from "express";
import { RoutesInterface } from "./interfaces/RoutesInterface";
import routemap from "express-routemap";
import chalk from "chalk";
// import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import Connection from "./db/Connection";
// import { authRoutes } from "./routes/AuthRoutes";
// import { authJWTMiddleware } from "./middleware/AuthJWTMiddleware";
import dotenv from "dotenv";
import resError from "./utils/ResError";
import SetupDB from "./db/SetupDB";
import { schemas } from "./models/schemas";

dotenv.config();

class App extends Connection {
  public app: Application;
  public port: number;
  public server: any;

  constructor(routes: RoutesInterface[]) {
    super();
    this.app = express();
    this.port = Number(process.env.PORT) || 5000;
    this.initMiddlewares();
    this.initConnection();
    this.initRoutes(routes);
  }

  public getServer() {
    return this.app;
  }

  public closeServer(done?: any) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  private async initConnection() {
    try {
      const connection = await this.connect();
      console.log(chalk.bgGreen.black("✔️  Conexión establecida 🔌 "));
      const setupDB = new SetupDB(this.getDatabase());
      const collections = schemas;
      await setupDB.setupCollections(collections);
      console.log(
        chalk.blue(
          "---------------------------------------------------------------------------------"
        )
      );
      console.log(
        chalk.green.bold(
          `🌐 ¡Se ha establecido la conexión a: ${process.env.DB_NAME}!`
        )
      );
      console.log(
        chalk.blue(
          "---------------------------------------------------------------------------------"
        )
      );
      return connection;
    } catch (error) {
      console.error(chalk.bgRed.white("❌ Error al establecer la conexión:"));
      console.error(error);
      throw new Error("Error al establecer la conexión");
    }
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        const { statusCode, message } = err;
        resError(res, statusCode, message);
      }
    );
    // this.app.use(
    //   session({
    //     secret: "process.env.JWT_PRIVATE_KEY",
    //     resave: false,
    //     saveUninitialized: false,
    //   })
    // );
  }

  private initRoutes(routes: RoutesInterface[]) {
    // this.app.use(`/api/${process.env.API_VERSION}`, authRoutes.router);
    routes.forEach((route) => {
      this.app.use(
        `/api/${process.env.API_VERSION}`,
        // authJWTMiddleware.validateToken,
        route.router
      );
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log();
      console.log(chalk.bgCyan.white.bold("🗺️  Rutas disponibles: 🚴 "));
      routemap(this.app);
      console.log(chalk.bgGreen.black("✨ Servidor en línea ✨ "));
      console.log(
        chalk.blue(
          "--------------------------------------------------------------------------------"
        )
      );
      console.log(
        chalk.green.bold(
          `🚀 ¡El servidor se ha levantado exitosamente en http://${process.env.HOST}:${process.env.PORT}!`
        )
      );
      console.log(
        chalk.blue(
          "--------------------------------------------------------------------------------"
        )
      );
    });
  }
}
export default App;