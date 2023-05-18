export default function Layout({ children }:  {
  children: React.ReactNode
}) {
  return (
    <>
      <aside></aside>
      <main>
        <p> THis is your dashboard </p>
        { children }
      </main>
    </>
  )
}