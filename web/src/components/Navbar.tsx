import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-100 place-content-evenly bg-slate-600 text-white p-1 sticky top-0 left-0 right-0">
      <Link href="/">Home</Link>
      <Link href="/request">Requests</Link>
      <Link href="/fulfill">Fulfill</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
