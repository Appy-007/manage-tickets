"use client"

import { FiUser } from "react-icons/fi";
import { PiWarningCircle } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { Badge } from "./ui/badge";
import { TicketType } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function Ticket({ticket}: {ticket: TicketType}){
    const router= useRouter()

    return (
        <>
        <div onClick={()=>router.push(`/tickets/${ticket.id}`)} className="p-2 pr-4 pl-4 rounded-md border border-gray-400 cursor-pointer">
            <div className="flex justify-between">
                <div className="flex-1">
                    <h2 className="font-semibold text-md">{ticket.title}</h2>
                    <p className="text-sm">{ticket.descriptiion}</p>
                </div>
                <div>
                    <Badge>{ticket.status}</Badge>
                </div>
            </div>

            <div className="text-xs flex gap-2 mt-4">
                <div className="flex gap-1 items-center"> <PiWarningCircle /> <span>Priority {ticket.priority}</span></div>
                {ticket.assignee && <div className="flex gap-1 items-center"> <FiUser /> <span>User {ticket.assignee}</span></div>} 
                <div className="flex gap-1 items-center">  <SlCalender /> <span>{ticket.createdAt}</span></div>
            </div>
        </div>
        </>
    )
}