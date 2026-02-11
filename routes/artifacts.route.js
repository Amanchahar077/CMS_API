import express from "express";
import { createArtifact ,getArtifacts} from "../controllers/artifact.controller.js";
import { authMiddleware} from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/uploads.middleware.js";

const router = express.Router();

/**
 * Protected Artifact APIs
 */
router.post("/", authMiddleware,upload.single("file"), createArtifact);
router.get("/", authMiddleware,authorizeRoles("ADMIN","EDITOR"), getArtifacts);
export default router;