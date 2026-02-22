import mongoose from "mongoose";
import dotenv from "dotenv";
import Ticket from "@/schemas/ticketSchema";
// adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI as string;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");

    // Optional: clear collection
    await Ticket.deleteMany({});
    console.log("Old data removed");

    await Ticket.insertMany([
      {
        title: "Login page not working",
        description: "Users are unable to login using Google OAuth.",
        status: "open",
        priority: "3",
        assignee: "Rahul",
      },
      {
        title: "Dashboard loading slowly",
        description: "Initial dashboard load takes more than 5 seconds.",
        status: "in_progress",
        priority: "4",
        assignee: "Anita",
      },
      {
        title: "Fix broken image links",
        description: "Several images on homepage are not rendering.",
        status: "resolved",
        priority: "2",
      },
      {
        title: "Payment gateway timeout",
        description: "Stripe API timing out during checkout.",
        status: "open",
        priority: "5",
        assignee: "Arjun",
      },
      {
        title: "Profile update failing",
        description: "Users cannot update profile information.",
        status: "open",
        priority: "3",
      },
      {
        title: "Search results inaccurate",
        description: "Search returns irrelevant ticket results.",
        status: "in_progress",
        priority: "2",
        assignee: "Meera",
      },
      {
        title: "Notification emails not sent",
        description: "Email service failing silently.",
        status: "open",
        priority: "4",
      },
      {
        title: "API rate limiting issue",
        description: "Users getting rate limited too quickly.",
        status: "resolved",
        priority: "3",
      },
      {
        title: "Mobile responsiveness issue",
        description: "Layout breaks on small screen devices.",
        status: "in_progress",
        priority: "2",
      },
      {
        title: "Dark mode toggle broken",
        description: "Dark mode switch not persisting preference.",
        status: "open",
        priority: "1",
      },
      {
        title: "Unable to reset password",
        description:
          "Password reset link expires immediately after being generated.",
        status: "open",
        priority: "4",
        assignee: "Soham",
      },
      {
        title: "Error 500 on ticket submission",
        description:
          "Server throws internal error when submitting a new ticket.",
        status: "in_progress",
        priority: "5",
        assignee: "Priya",
      },
      {
        title: "Sidebar navigation overlap",
        description: "Sidebar overlaps main content on smaller laptops.",
        status: "resolved",
        priority: "2",
      },
      {
        title: "Database connection intermittent",
        description: "Mongoose connection drops randomly under load.",
        status: "open",
        priority: "5",
        assignee: "Amit",
      },
      {
        title: "Incorrect ticket status badge color",
        description: "Status badge color does not match defined design system.",
        status: "in_progress",
        priority: "1",
      },
      {
        title: "File upload size limit unclear",
        description: "Users not informed about maximum upload size.",
        status: "open",
        priority: "2",
      },
      {
        title: "Sorting by priority not working",
        description:
          "Tickets are not sorting correctly when filtering by priority.",
        status: "resolved",
        priority: "3",
        assignee: "Neha",
      },
      {
        title: "Duplicate ticket creation",
        description: "Clicking submit twice creates duplicate records.",
        status: "open",
        priority: "4",
      },
      {
        title: "Pagination resets on filter change",
        description: "Current page resets unexpectedly after applying filters.",
        status: "in_progress",
        priority: "3",
        assignee: "Karan",
      },
      {
        title: "Search input not debounced",
        description: "Too many API calls triggered while typing in search bar.",
        status: "open",
        priority: "2",
      },
    ]);

    console.log("Database seeded 🌱");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
