import {Router} from "express";
import webHook from "../controllers/webHookController.js";
import subscribe from "../controllers/subscribeController.js";


const router = Router()

router.post("/subscribe", subscribe)

router.post("/webhook", webHook)

export default router;