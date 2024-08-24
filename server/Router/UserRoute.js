import { Router } from "express";
import Users from "../Controller/UserController.js";
import ProtectRoute from "../Utils/ProtectRoute.js";

const app = Router();

app.get("/", ProtectRoute, Users);

export default app;