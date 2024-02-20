import { NextResponse } from "next/server";
import Appointment from "@/models/appointment";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const _req = await req.json();
    const { name, phone, day, timeSlot } = _req;

    const user = await new User({
      name,
      phone,
    }).save();

    await new Appointment({
      userId: user._id,
      day,
      timeSlot,
    }).save();

    revalidatePath("/");

    return NextResponse.json(
      {
        success: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
