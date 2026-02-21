import { z } from "zod";

const STATUS=["open","in_progress","resolved"]
const PRIORITY=["1","2","3","4","5"]

export const ticketSchema = z.object({
  title: z.string().trim().min(5,"Title must be between 5 and 80 characters").max(80, "Title must be between 5 and 80 characters"),
  description: z.string().trim().min(20, "Description must be at least 20 characters"),
  status: z.enum(STATUS,"Invalid status"),
  priority: z.enum(PRIORITY,"Invalid priority"),
  assignee: z.string("Assignee must be a string value").optional()
});

// Extract the type from the schema
export type ticketSchema = z.infer<typeof ticketSchema>;