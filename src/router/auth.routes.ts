import express from "express";
import { RegisterUser, LoginUser, Logout } from "../controller/auth.controller";

const router = express.Router();
router.post("/register", RegisterUser);
router.post("/login", LoginUser); 
router.get("/logout", Logout);

export default router;
