export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/test/${params.id}`, {
    next: {
      revalidate: 10,
    }
  });

  const data = await res.json();

  return (
    <p>Hello, { data.data.id }!</p>
  )
}