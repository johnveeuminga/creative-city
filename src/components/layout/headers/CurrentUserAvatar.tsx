import UserAvatar from "@/components/UserAvatar";
import { getServerSession } from "@/lib/server/auth";

export default async function CurrentUserAvatar() {
  const session = await getServerSession();
  console.log(session)

  return (
    <div className="user-avatar d-flex">
      <UserAvatar 
        className='avatar'
        user={ session.user }/>
      <span>{ session.user.name }</span>
    </div>
  )
}