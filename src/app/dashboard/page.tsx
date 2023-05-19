import Link from "next/link";

export default function Page() {
  return (
    <>
      <p>Welcome to your dashboard!</p>
      <Link href={`/dashboard/1`}>User #1</Link>
    </>
  )
}