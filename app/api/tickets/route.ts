/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/mongo";
import { ticketSchema } from "@/lib/zodSchemas/ticketSchema";
import Ticket from "@/schemas/ticketSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const searchTitle = searchParams.get("title");
    const status = searchParams.get("status");
    const orderBy = searchParams.get("orderBy");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (searchTitle) query.title = { $regex: searchTitle, $options: "i" }; // Case-insensitive search

    // 3. Determine Sort Order
    // Example logic: if orderBy is 'oldest', use 1, else -1
    const sortOrder = orderBy === "1" ? 1 : -1;

    // Fetch and sort by newest first
    const tickets = await Ticket.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortOrder });

    const totalTickets = await Ticket.countDocuments(query);
    const hasMore = skip + tickets.length < totalTickets;
    return NextResponse.json(
      {
        data: tickets,
        nextPage: hasMore ? page + 1 : undefined,
        total: totalTickets,
        message: "success",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching tickets:", error);
    if (
      error instanceof mongoose.Error.MongooseServerSelectionError ||
      error.name === "MongooseServerSelectionError"
    ) {
      return Response.json(
        { error: "Database connection failed. Is MongoDB running?" },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // 1. Validate with Zod first (for custom error messages)
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // 2. Save to DB using Mongoose
    const newTicket = await Ticket.create(validation.data);

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error: any) {
    if (
      error instanceof mongoose.Error.MongooseServerSelectionError ||
      error.name === "MongooseServerSelectionError"
    ) {
      return Response.json(
        { error: "Database connection failed. Is MongoDB running?" },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
