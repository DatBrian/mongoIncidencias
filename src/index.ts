import App from "./app";
import { EquipoRoutes, IncidenciaRoutes } from "./routes";
import TrainersRoutes from "./routes/TrainerRoutes";

const app = new App([new TrainersRoutes, new EquipoRoutes, new IncidenciaRoutes]);

app.listen();