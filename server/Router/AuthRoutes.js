import { Router } from "express";
import { LogInUser, LogOutUser, SignInUser } from "../Controller/AuthController.js"

const route = Router();

route.post("/sign",SignInUser);
route.post("/login", LogInUser);
route.post("/logout", LogOutUser);

export default route;