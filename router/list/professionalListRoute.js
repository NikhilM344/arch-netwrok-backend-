import { Router } from "express";
import { professionalList } from "../../controller/lists/professionallist.js";
const router = Router();

router.get("/list", professionalList);

export default router;
