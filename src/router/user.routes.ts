import express from "express";
import {
  getAllUsers,
  DeleteUser,
  UpdateUser,
} from "../controller/user.controller";
import { isAuthenticated, isOwner } from "../middleware";

const router = express.Router();
router.get("/", isAuthenticated, getAllUsers);
router.delete("/:user_id", isAuthenticated, isOwner, DeleteUser);
router.patch("/:user_id", isAuthenticated,isOwner, UpdateUser);

export default router;
