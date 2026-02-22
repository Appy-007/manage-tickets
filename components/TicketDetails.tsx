"use client";

import { PiWarningCircle } from "react-icons/pi";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import AddEditTicketModal from "./AddEditTicket";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmation";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formattedDate } from "@/lib/dateFormat";

// const ticket = {
//   _id: "TIC-001",
//   title: "Fix login page overflow",
//   description:
//     "The login button is overlapping with the footer on mobile screens.",
//   status: "in_progress" as TicketStatus,
//   priority: "1" as "1" | "2" | "3" | "4" | "5",
//   createdAt: "2026-02-15T09:00:00Z",
//   updatedAt: "2026-02-15T09:00:00Z",
//   assignee: "user_01",
// };

export default function TicketDetails({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchTicketById = async (id: string) => {
    try {
      const response = await axios.get(`/api/tickets/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTicket = async () => {
    try {
      const response = await axios.delete(`/api/tickets/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`ticketDetails`, id],
    queryFn: () => fetchTicketById(id),
  });

  const mutation = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket deleted successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error deleting ticket!");
    },
  });

  if (isLoading) {
    return (
      <>
        <div className="p-6 flex items-center justify-center">
          <div>
            <p className="font-bold text-xl">Loading Ticket Details...</p>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="p-6 flex items-center justify-center">
          <div>
            <p className="font-bold text-xl">Failed to load ticket details..</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pt-4 pl-16 pr-6">
        <div className="flex gap-6">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft />
          </Button>
          <h1 className="text-2xl font-semibold">Ticket Details</h1>
        </div>
        <div className="p-6 pr-4 pl-4 rounded-md border border-gray-400 mt-6">
          <div className="flex justify-between">
            <div className="flex-1 flex gap-2">
              <h1 className="font-bold">{ticket.title}</h1>
              <div>
                {" "}
                <Badge
                  className={`${
                    ticket?.status === "open"
                      ? "bg-blue-700"
                      : ticket?.status === "in_progress"
                        ? "bg-yellow-600"
                        : "bg-green-700"
                  } text-white`}
                >
                  {ticket.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowEditModal(true)}
                variant={"outline"}
              >
                <FaRegEdit />
              </Button>
              <Button
                onClick={() => setShowDeleteModal(true)}
                variant={"outline"}
                className="text-red-500"
              >
                <MdDelete />
              </Button>
            </div>
          </div>

          <div className="text-xs flex gap-4 mt-4">
            <div className="flex gap-1 items-center">
              {" "}
              <PiWarningCircle
                className={`${
                  ticket?.priority === "3"
                    ? "text-yellow-600"
                    : ticket?.priority === "4"
                      ? "text-orange-600"
                      : ticket?.priority === "5"
                        ? "text-red-700"
                        : ""
                } `}
              />{" "}
              <span>Priority {ticket.priority}</span>
            </div>
            {ticket.assignee && (
              <div className="flex gap-1 items-center">
                {" "}
                <FiUser /> <span>User {ticket.assignee}</span>
              </div>
            )}
            <div className="flex gap-1 items-center">
              {" "}
              <SlCalender /> <span>{formattedDate(ticket?.createdAt)}</span>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold">Description</h2>
            <p className="text-gray-600 text-sm">{ticket.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-md">
            <div>
              <h4 className="text-sm text-gray-500">Status</h4>
              <p>{ticket.status}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Priority</h4>
              <p>{ticket.priority}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Created At</h4>
              <p>{formattedDate(ticket?.createdAt)}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Assignee</h4>
              <p>{ticket.assignee ? ticket.assignee : "__"}</p>
            </div>
          </div>

          {showEditModal && (
            <AddEditTicketModal
              modalTitle="Edit Ticket"
              modalDescription={"Update the ticket details below"}
              open={showEditModal}
              onClose={() => setShowEditModal((prev) => !prev)}
              selectedTicket={ticket}
              mode="edit"
            />
          )}
          {showDeleteModal && (
            <DeleteConfirmationModal
              open={showDeleteModal}
              onClose={() => setShowDeleteModal((prev) => !prev)}
              onDelete={mutation.mutate}
              loading={mutation?.isLoading}
              error={mutation.error}
            />
          )}
        </div>
      </div>
    </>
  );
}
