import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  searchNotes,
} from "../controllers/noteController";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createNote);
router.get("/", getNotes);
router.get("/search", searchNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
