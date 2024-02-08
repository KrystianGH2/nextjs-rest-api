import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Note from "@/lib/modals/notes";
import { Types } from "mongoose";
import User from "@/lib/modals/user";
import { error } from "console";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid or missing userId"), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify("User does not exist"), {
        status: 404,
      });
    }

    const notes = await Note.find({ user: new Types.ObjectId(userId) });

    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (err) {
    return new NextResponse("Error fetching Notes" + error, { status: 400 });
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const body = await request.json();
    const { title, description } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid or missing userId"), {
        status: 400,
      });
    }
    await connect();

    //Checking if user exist
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify("User does not exist"), {
        status: 404,
      });
    }

    const newNote = new Note({
      title,
      description,
      user: new Types.ObjectId(userId),
    });

    await newNote.save();
    return new NextResponse(
      JSON.stringify({
        message: "Note created successfully",
        note: {
          _id: newNote._id,
          title: newNote.title,
          description: newNote.description,
          user: newNote.user,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error creating note", error }),
      { status: 400 }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { noteId, title, description } = body;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!noteId || !Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify("Invalid or missing noteId"), {
        status: 400,
      });
    }

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid or missing userId"), {
        status: 400,
      });
    }

    await connect();

    // Checks if the user exist
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify("User does not exist"), {
        status: 404,
      });
    }

    // Find the note and user it belongs to
    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return new NextResponse(
        JSON.stringify({
          message: "Note not found or does not belong to this user",
        }),
        { status: 400 }
      );
    }

    const updateNote = await Note.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Note successfully updated",
        note: updateNote,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in updating note",
        error,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get("noteId");
    const userId = searchParams.get("userId");

    if (!noteId || !Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify("Invalid or missing noteId"), {
        status: 400,
      });
    }

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify("Invalid or missing userId"), {
        status: 400,
      });
    }

    await connect();

    // Checks if the user exist
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify("User does not exist"), {
        status: 404,
      });
    }

    // Find the note and user it belongs to
    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return new NextResponse(
        JSON.stringify({
          message: "Note not found or does not belong to this user",
        }),
        { status: 404 }
      );
    }

    await Note.findByIdAndDelete(noteId);
    return new NextResponse(JSON.stringify({ message: "Note deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in deleting note",
        error,
      }),
      { status: 500 }
    );
  }
};
