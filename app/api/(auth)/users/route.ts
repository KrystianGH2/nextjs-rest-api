import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
const ObjectId = require("mongoose").Types.ObjectId;
import bcrypt from "bcrypt";

export const GET = async () => {
  try {
    // make connection to the database
    await connect();
    const users = await User.find({}, { password: 0 }); // excludes the password
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (e) {
    return new NextResponse("Error in fetching users", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log(body.password);

    const foundUser = await User.findOne({ email: body.email }).lean().exec();
    if (foundUser) {
      console.log("User exists", body.email);
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    await connect();

    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 201 }
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Error, user not created" }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUserName } = body;
    await connect();
    if (!userId || !newUserName) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new username are required" }),
        {
          status: 400,
        }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUserName },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "Username not found or didn't update successfully",
        }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Username updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Error updating username" }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        {
          status: 400,
        }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 400,
      });
    }

    await connect();

    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    );

    if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Error deleting user" }),
      {
        status: 500,
      }
    );
  }
};
