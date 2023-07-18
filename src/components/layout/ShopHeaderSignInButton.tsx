import { getServerSession } from "@/lib/server/auth";
import { MdPersonOutline } from "react-icons/md";
import UserAvatar from "../UserAvatar";
import Link from "next/link";

export default async function ShopHeaderSignInButton() {
  const session = await getServerSession()

  const SignInButton = () => (
    <a href="/api/auth/login" className="btn btn-outline-primary d-flex align-items-center">
      <MdPersonOutline 
        fontSize={18}
        className="me-2"/>
        Sign In
    </a>
  )

  const UserAvatarButton = () => (
    <Link 
      href="/dashboard" 
      className="avatar"
      prefetch={false}>
      <UserAvatar 
        size="38"
        user={session.user}/>
    </Link>
  )

  return !session.user ? <SignInButton /> : <UserAvatarButton />
}