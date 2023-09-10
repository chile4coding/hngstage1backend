import { Router } from "express";
import { getUserProfile } from "../controller/controller";

const route = Router();

route.get("/get_user_profile", getUserProfile);

export default route;
