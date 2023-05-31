// TODO: Typesafe this route with a user object.
export async function getServerSession() {
  console.log(process.env.APP_URL);
  const req = await fetch(`${process.env.APP_URL}/api/auth/me`);

  const user = req.json();

  return user;
}