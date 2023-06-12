export default function Page({ params }: { params: { id: number } }) {
  return <h1>My Page {params.id}</h1>;
}
