"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const noteController_1 = require("../controllers/noteController");
const router = express_1.default.Router();
router.get("/view/:id", noteController_1.getPublishedNote);
router.use(auth_1.authenticateToken);
router.post("/", noteController_1.createNote);
router.get("/", noteController_1.getNotes);
router.get("/search", noteController_1.searchNotes);
router.get("/:id", noteController_1.getNote);
router.put("/:id", noteController_1.updateNote);
router.delete("/:id", noteController_1.deleteNote);
exports.default = router;
