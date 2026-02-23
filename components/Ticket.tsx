"use client";

import { FiUser } from "react-icons/fi";
import { PiWarningCircle } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { Badge } from "./ui/badge";
import { TicketType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { formattedDate } from "@/lib/dateFormat";

export default function Ticket({ ticket }: { ticket: TicketType }) {
  const router = useRouter();

  const  statusVariant= ticket.status === "open" ? "bg-blue-700" : ticket.status === "in_progress" ? "bg-yellow-600" : "bg-green-700";

  const priorityVariant = ticket.priority === "3" ? "text-yellow-600" : ticket.priority === "4" ? "text-orange-600" : ticket.priority === "5" ? "text-red-700" : ""


  return (
    <>
      <div
        onClick={() => router.push(`/tickets/${ticket._id}`)}
        className="p-2 pr-4 pl-4 rounded-md border border-gray-400 cursor-pointer"
      >
        <div className="flex max-md:gap-1 justify-between">
          <div className="flex-1">
            <h2 className="font-semibold max-md:text-sm text-md">{ticket?.title}</h2>
            <p className="max-md:text-xs text-sm">{ticket?.description}</p>
          </div>
          <div>
            <Badge className={`${statusVariant} text-white`}>{ticket?.status}</Badge>
          </div>
        </div>

        <div className="text-xs flex flex-wrap gap-4 mt-4">
          <div className="flex gap-1 items-center">
            {" "}
            <PiWarningCircle  className={`${priorityVariant} `} /> <span>Priority {ticket?.priority}</span>
          </div>
          {ticket.assignee && (
            <div className="flex gap-1 items-center">
              {" "}
              <FiUser /> <span>{ticket?.assignee}</span>
            </div>
          )}
          <div className="flex gap-1 items-center">
            {" "}
            <SlCalender /> <span>{formattedDate(ticket?.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
