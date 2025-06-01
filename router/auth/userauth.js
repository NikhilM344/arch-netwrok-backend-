import { Router } from "express";
import {userRegistration} from "../../controller/auth/userauth.js";
import { userLogin } from "../../controller/auth/userauth.js";

const router = Router();

router.post("/user/register", userRegistration)
router.post("/user/login",userLogin);

export default router;
