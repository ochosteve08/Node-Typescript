import express from "express";
import { getAllUsers, DeleteUser } from "../controller/user.controller";
import { isAuthenticated, isOwner } from "../middleware";

const router = express.Router();
router.get("/", isAuthenticated, getAllUsers);
router.delete("/:user_id",isAuthenticated,isOwner, DeleteUser);

export default router;
