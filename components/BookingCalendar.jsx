"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import BookingModal from "./BookingModal";
import "react-calendar/dist/Calendar.css";
import classnames from "classnames";
import { useRouter } from "next/navigation";

function BookingCalendar({ appointments }) {
  const router = useRouter();
  const generateTimeSlots = () => {
    const startTime = 9; // 9:00 AM
    const endTime = 17; // 5:00 PM
    const step = 30; // 30 minutes

    const timeSlots = [];
    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        // Skip the lunch break time slots
        if ((hour === 12 && minute === 0) || (hour === 12 && minute === 30)) {
          continue;
        }

        const startHour = hour.toString().padStart(2, "0");
        const startMinute = minute === 0 ? "00" : minute.toString();
        const endHour = (hour + Math.floor((minute + step) / 60))
          .toString()
          .padStart(2, "0");
        const endMinute =
          (minute + step) % 60 === 0 ? "00" : ((minute + step) % 60).toString();

        const formattedTime = `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
        timeSlots.push(formattedTime);
      }
    }

    return timeSlots;
  };
  const timeSlots = generateTimeSlots();

  const [value, onChange] = useState(moment().format("yyyy/MM/DD"));
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedDaySlot, setSelectedDaySlot] = useState([]);

  const handleChange = (value, event) => {
    // Your logic here
    onChange(value);
    router.refresh();
    console.log(value);
  };
  const handleTimeSlotClick = (value) => {
    document.getElementById("my_modal_3").showModal();
    setTimeSlot(value);
  };
  console.log(selectedDaySlot);

  useEffect(() => {
    setSelectedDaySlot(
      appointments
        .filter((item) => moment(item.day).diff(moment(value), "day") === 0)
        .map((item) => item.timeSlot)
    );
  }, [value, appointments]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="flex-1">
        <Calendar
          onChange={handleChange}
          value={value}
          minDate={new Date()}
          locale="en-GB"
        />
      </div>
      <div className="time-slots justify-center flex-1 mt-5">
        {timeSlots.map((timeSlot) => (
          <button
            key={timeSlot}
            disabled={selectedDaySlot.includes(timeSlot)}
            onClick={() => handleTimeSlotClick(timeSlot)}
            className={classnames({
              "time-slot-button rounded-md shadow-sm": true,
              disabled: selectedDaySlot.includes(timeSlot),
            })}
          >
            {timeSlot}
          </button>
        ))}
      </div>
      <BookingModal
        date={moment(value).format("D MMMM YYYY")}
        timeSlot={timeSlot}
        unFormatedDate={value}
      />
    </div>
  );
}

export default BookingCalendar;
