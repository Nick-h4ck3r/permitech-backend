"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.deleteNote = exports.updateNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, tags } = req.body;
        const note = new Note_1.default({
            title,
            body,
            tags,
            user: req.userId,
        });
        yield note.save();
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating note", error });
    }
});
exports.createNote = createNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Note_1.default.find({ user: req.userId });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
    }
});
exports.getNotes = getNotes;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield Note_1.default.findOne({ _id: req.params.id, user: req.userId });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching note", error });
    }
});
exports.getNote = getNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, tags } = req.body;
        const note = yield Note_1.default.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { title, body, tags }, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating note", error });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield Note_1.default.findOneAndDelete({
            _id: req.params.id,
            user: req.userId,
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting note", error });
    }
});
exports.deleteNote = deleteNote;
const searchNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            return res.status(400).json({ message: "Invalid search query" });
        }
        const notes = yield Note_1.default.find({
            user: req.userId,
            $or: [
                { title: { $regex: q, $options: "i" } },
                { body: { $regex: q, $options: "i" } },
                { tags: { $in: [new RegExp(q, "i")] } },
            ],
        });
        res.json(notes);
    }
    catch (error) {
        console.error("Error searching notes:", error);
        res.status(500).json({ message: "Error searching notes", error });
    }
});
exports.searchNotes = searchNotes;
