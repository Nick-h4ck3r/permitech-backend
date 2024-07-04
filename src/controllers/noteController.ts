import { Request, Response } from "express";
import Note, { INote } from "../models/Note";
import { AuthRequest } from "../middleware/auth";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, body, tags } = req.body;
    const note = new Note({
      title,
      body,
      tags,
      user: req.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export const getNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, body, tags } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, body, tags },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};

export const searchNotes = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const notes = await Note.find({
      user: req.userId,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ],
    });

    res.json(notes);
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ message: "Error searching notes", error });
  }
};
