import express from "express";
import { RegisterUser, LoginUser } from "../controller/auth.controller";

// export default (router: express.Router) => {
//   router.post("register", RegisterUser);
// };
const router = express.Router();
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

export default router;
