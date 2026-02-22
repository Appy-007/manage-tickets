/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { useEffect, useRef, useState } from "react";
import AddEditTicketModal from "./AddEditTicket";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TicketType } from "@/lib/types";
import { useScroll } from "motion/react";
import { useMotionValueEvent } from "framer-motion";

const Tickets = [
  {
    _id: "TIC-001",
    title: "Fix login page overflow",
    description:
      "The login button is overlapping with the footer on mobile screens.",
    status: "open",
    priority: 1,
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-02-15T09:00:00Z",
    assignee: "user_01",
  },
  {
    _id: "TIC-002",
    title: "Implement SSO",
    description: "Integrate Okta for single sign-on across all environments.",
    status: "in_progress",
    priority: 2,
    createdAt: "2026-02-16T10:30:00Z",
    updatedAt: "2026-02-20T14:20:00Z",
    assignee: "user_02",
  },
  {
    _id: "TIC-003",
    title: "Database migration error",
    description:
      "Migration script failed on production due to unique constraint violation.",
    status: "open",
    priority: 5,
    createdAt: "2026-02-21T08:15:00Z",
    updatedAt: "2026-02-21T08:45:00Z",
  },
  {
    _id: "TIC-004",
    title: "Update privacy policy",
    description: "Legal team requested updates to the GDPR section.",
    status: "in_progress",
    priority: 3,
    createdAt: "2026-02-10T11:00:00Z",
    updatedAt: "2026-02-12T16:00:00Z",
    assignee: "user_03",
  },
  {
    _id: "TIC-005",
    title: "Add dark mode toggle",
    description: "Users are requesting a system-wide dark mode setting.",
    status: "resolved",
    priority: 4,
    createdAt: "2026-02-18T13:00:00Z",
    updatedAt: "2026-02-18T13:00:00Z",
  },
  {
    _id: "TIC-006",
    title: "API Timeout issues",
    description: "The /reports endpoint is timing out for large data sets.",
    status: "resolved",
    priority: 5,
    createdAt: "2026-02-19T09:20:00Z",
    updatedAt: "2026-02-21T10:00:00Z",
    assignee: "user_01",
  },
  {
    _id: "TIC-007",
    title: "Refactor Header component",
    description: "Clean up messy prop drilling in the main navigation.",
    status: "open",
    priority: 3,
    createdAt: "2026-02-20T15:45:00Z",
    updatedAt: "2026-02-20T15:45:00Z",
  },
];

export default function TicketsComponent() {
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filterStatus, setFilerStatus] = useState("");
  const [orderBy, setOrderBy] = useState("-1");

  const ticketDivRef = useRef<HTMLDivElement>(null);

  const fetchTickets = async ({
    page = 1,
    title,
    status,
    orderBy,
  }: {
    page?: number;
    title?: string;
    status?: string;
    orderBy?: string;
  }) => {
    const params = new URLSearchParams({
      title: title || "",
      status: status || "",
      orderBy: orderBy || "",
      page: page.toString(),
      limit: "10",
    });
    try {
      const response = await axios.get(`/api/tickets?${params}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["tickets", debouncedSearch, filterStatus, orderBy],
      queryFn: ({ pageParam = 1 }) =>
        fetchTickets({
          page: pageParam,
          title: debouncedSearch,
          status: filterStatus,
          orderBy,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      initialPageParam: 1,
    });

  const { scrollYProgress } = useScroll({
    container: ticketDivRef,
    // 'offset' defines when the tracking starts and ends
    // ["start end", "end end"] means:
    // Start tracking when the TOP of the div enters the BOTTOM of the viewport
    // End tracking when the BOTTOM of the div reaches the BOTTOM of the viewport
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If the bottom of this specific div is 90% visible
    if (latest > 0.9 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });


  useEffect(() => {
    const debouncedSearchTimer = setTimeout(() => {
      setDebouncedSearch(searchItem);
    }, 1500);
    return () => {
      clearTimeout(debouncedSearchTimer);
    };
  }, [searchItem]);

  // if (status === "pending") {
  //   return <span>Loading...</span>;
  // }

  // if (status === "error") {
  //   return <span>Error:</span>;
  // }

  // console.log("data", Tickets);
  console.log("Debounced Search", debouncedSearch, orderBy, filterStatus);
  console.log("data", data);


  return (
    <>
      <div className="pt-4 pl-16 pr-6 h-screen flex flex-col">
        <div id="header" className="shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-2xl">Support Tickets</h1>
              <p className="font-sm">120 tickets</p>
            </div>
            <div>
              <Button onClick={() => setShowAddTicketModal(true)}>
                <FaPlus />
                New Ticket
              </Button>
            </div>
          </div>

          <div className="flex gap-4 items-center mt-6">
            <div className="flex-1">
              <Input
                value={searchItem}
                onChange={(event) => setSearchItem(event.target.value)}
                placeholder="Search tickets ..."
              />
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilerStatus}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={orderBy} onValueChange={setOrderBy}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="-1">Newest First</SelectItem>
                    <SelectItem value="1">Oldest First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div
          ref={ticketDivRef}
          className="flex flex-col gap-6 mt-6 pb-6 flex-1 overflow-y-auto"
        >
          {data?.pages.map((page: any) =>
            page.data.map((ticket: TicketType) => (
              <Ticket key={ticket._id} ticket={ticket} />
            ))
          )}
        </div>
        {showAddTicketModal && (
          <AddEditTicketModal
            modalTitle="Add Ticket"
            open={showAddTicketModal}
            onClose={() => setShowAddTicketModal(false)}
            mode="add"
          />
        )}
      </div>

      {isFetchingNextPage && <div className="p-4 text-center">Loading more...</div>}
    </>
  );
}
