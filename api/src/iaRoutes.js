import express from "express";
import { chatIA } from "./controllers/controllermensagens.js";
import { analisarRedacao } from "./controllers/controllerredacao.js";

const router = express.Router();

router.post("/chat", chatIA);
router.post("/redacao", analisarRedacao);

export default router;
