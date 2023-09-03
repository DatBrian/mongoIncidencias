import App from "./app";
import TrainersRoutes from "./routes/TrainerRoutes";

const app = new App([new TrainersRoutes]);

app.listen();