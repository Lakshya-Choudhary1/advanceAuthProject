import { Router } from "express";
import authRoute from "./auth.routes.js";

const routes = Router();

routes.use('/auth',authRoute);

export default routes;