import { Router } from "express";
import { getUserProfile } from "../controller/controller";

const route = Router();

route.get("/api", getUserProfile);

export default route;
