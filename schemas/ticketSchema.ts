import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 5,
      maxlength: 80,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 20,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      default: "3",
    },
    assignee: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// This check prevents redefining the model during hot reloads in development
const Ticket = models.Ticket || model("Ticket", TicketSchema);

export default Ticket;