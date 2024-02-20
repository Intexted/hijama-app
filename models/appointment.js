import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: mongoose.ObjectId,
    day: { type: Date },
    timeSlot: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose?.models?.Appointment ||
  mongoose?.model("Appointment", appointmentSchema);
export default Appointment;
