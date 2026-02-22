/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/mongo";
import { ticketSchema } from "@/lib/zodSchemas/ticketSchema";
import Ticket from "@/schemas/ticketSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await dbConnect();
    if (!id) {
      throw new Error("Ticket not found");
    }
    const response = await Ticket.findById(id);
    if (!response) {
      throw new Error("Ticket not found");
    }
    console.log(response);
    return NextResponse.json(
      { data: response, message: "success" },
      { status: 200 },
    );
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await dbConnect();
    const response = await Ticket.findByIdAndDelete(id);
    if (!response) {
      throw new Error("Ticket not found");
    }
    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 },
    );
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await dbConnect();
    const body = await request.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const response = await Ticket.findByIdAndUpdate(id, body, { new: true });
    if (!response) {
      throw new Error("Ticket not found");
    }
    return NextResponse.json(response, { status: 200 });
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
