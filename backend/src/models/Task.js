import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: "todo" },
    priority: { type: String, default: "medium" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    dueDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
