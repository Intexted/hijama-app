import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-14 px-32">
      <Link href="/booking-calendar">Book Now</Link>
    </main>
  );
}
