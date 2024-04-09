import express, { Router } from "express";

import bearTokenAuth from "../Authentication/auth";
import { lgaGetter, stateGetter, RegionGetter } from "./localeControllers";
import limiter from "../helpers/rateLimite";
import { allLGA, allRegions, allStates } from "./localeControllers";

const router: Router = express.Router();

router.get("/lga", bearTokenAuth, limiter, lgaGetter);
router.get("/state", bearTokenAuth, limiter, stateGetter);
router.get("/region", bearTokenAuth, limiter, RegionGetter);

router.get("/get/lga", bearTokenAuth, limiter, allLGA);
router.get("/get/states", bearTokenAuth, limiter, allStates);
router.get("/get/regions", bearTokenAuth, limiter, allRegions);

export default router;
