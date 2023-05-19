import { Suspense } from "react";

export default async function Page({ params }: { params: { id: number } }) {
  async function Content({ id } : { id: number }) {
    const res = await fetch(`http://localhost:3000/api/test/${id}`, {
      next: {
        revalidate: 10,
      }
    });

    const data = await res.json();
    return (
      <>
        <p>Hello, { data.id }</p> 
      </>
    )
  };

  return (
    <>
      <p>Creative City</p>
      <Suspense fallback={<p>This is a test...</p>}>
        {/* @ts-expect-error Server Component */}
        <Content id={params.id}/>
      </Suspense>
    </>
  )
}