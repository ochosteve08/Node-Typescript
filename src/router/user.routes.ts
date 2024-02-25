import express from "express";
import { getAllUsers } from "../controller/user.controller";
import { isAuthenticated } from "../middleware";

const router = express.Router();
router.get("/",isAuthenticated, getAllUsers);


export default router;
