import BookingCalendar from "@/components/BookingCalendar";
import actions from "@/actions";
import db from "@/utils/db";

export default async function Home() {
  db.connect();
  const appointments = await actions.getAppointmentData();
  console.log(appointments);
  return (
    <main className="py-5 px-32">
      <h1 className="mb-5 text-3xl font-bold">Réserver un Rendez-vous</h1>
      <BookingCalendar appointments={appointments} />
    </main>
  );
}
