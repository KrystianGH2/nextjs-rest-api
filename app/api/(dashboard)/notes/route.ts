import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Note from "@/lib/modals/notes";

// Get all notes from database
export const GET = async () => {
  try {
    // make connection to the database
    await connect();
    const notes = await Note.find();
    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (e) {
    return new NextResponse("Error in fetching notes", { status: 500 });
  }
};
