import Task from "../models/Task.js";

export async function getTasks(req, res) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    const tasks = await Task.find(filter).populate("assignedTo");
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo");
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export async function createTask(req, res) {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}
