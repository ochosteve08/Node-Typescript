import express from "express";
import { RegisterUser } from "../controller/auth.controller";

export default (router: express.Router) => {
  router.post("/register", RegisterUser);
};
