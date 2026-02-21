"use client"

import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Ticket from "./Ticket";
import { useState } from "react";
import AddEditTicketModal from "./AddEditTicket";

const Tickets = [
  {
    id: "TIC-001",
    title: "Fix login page overflow",
    descriptiion: "The login button is overlapping with the footer on mobile screens.",
    status: "open",
    priority: 1,
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-02-15T09:00:00Z",
    assignee: "user_01"
  },
  {
    id: "TIC-002",
    title: "Implement SSO",
    descriptiion: "Integrate Okta for single sign-on across all environments.",
    status: "in_progress",
    priority: 2,
    createdAt: "2026-02-16T10:30:00Z",
    updatedAt: "2026-02-20T14:20:00Z",
    assignee: "user_02"
  },
  {
    id: "TIC-003",
    title: "Database migration error",
    descriptiion: "Migration script failed on production due to unique constraint violation.",
    status: "open",
    priority: 5,
    createdAt: "2026-02-21T08:15:00Z",
    updatedAt: "2026-02-21T08:45:00Z"
  },
  {
    id: "TIC-004",
    title: "Update privacy policy",
    descriptiion: "Legal team requested updates to the GDPR section.",
    status: "in_progress",
    priority: 3,
    createdAt: "2026-02-10T11:00:00Z",
    updatedAt: "2026-02-12T16:00:00Z",
    assignee: "user_03"
  },
  {
    id: "TIC-005",
    title: "Add dark mode toggle",
    descriptiion: "Users are requesting a system-wide dark mode setting.",
    status: "resolved",
    priority: 4,
    createdAt: "2026-02-18T13:00:00Z",
    updatedAt: "2026-02-18T13:00:00Z"
  },
  {
    id: "TIC-006",
    title: "API Timeout issues",
    descriptiion: "The /reports endpoint is timing out for large data sets.",
    status: "resolved",
    priority: 5,
    createdAt: "2026-02-19T09:20:00Z",
    updatedAt: "2026-02-21T10:00:00Z",
    assignee: "user_01"
  },
  {
    id: "TIC-007",
    title: "Refactor Header component",
    descriptiion: "Clean up messy prop drilling in the main navigation.",
    status: "open",
    priority: 3,
    createdAt: "2026-02-20T15:45:00Z",
    updatedAt: "2026-02-20T15:45:00Z"
  },

]

export default function TicketsComponent() {
    const [showAddTicketModal, setShowAddTicketModal]=useState(false)
  return (
    <>
      <div className="pt-4 pl-16 pr-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-2xl">Support Tickets</h1>
            <p className="font-sm">120 tickets</p>
          </div>
          <div>
            <Button onClick={()=>setShowAddTicketModal(true)}>
              <FaPlus />
              New Ticket
            </Button>
          </div>
        </div>

        <div className="flex gap-4 items-center mt-6">
          <div className="flex-1">
            <Input placeholder="Search tickets ..." />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Open</SelectItem>
                  <SelectItem value="dark">In Progress</SelectItem>
                  <SelectItem value="system">Received</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Newest First</SelectItem>
                  <SelectItem value="dark">Oldest First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-6">
            {Tickets.map((ticket) => (
                <Ticket key={ticket.id} ticket={ticket}/>
            ))}
        </div>
        {showAddTicketModal && <AddEditTicketModal modalTitle="Add Ticket"  open={showAddTicketModal} onClose={()=>setShowAddTicketModal(false)}/>}
      </div>
    </>
  );
}
