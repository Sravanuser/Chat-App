import { Router } from "express";
import { SendMessage, GetMessage } from "../Controller/MessageController.js"
import ProtectRoute from "../Utils/ProtectRoute.js";

const route = Router();

route.post("/send/:id", ProtectRoute, SendMessage);
route.get("/:id", ProtectRoute, GetMessage);

export default route;