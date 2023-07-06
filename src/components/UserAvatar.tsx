'use client'

import Avatar from "react-avatar"
import styles from '@/styles/user-avatar.module.scss'

export default function UserAvatar({ 
  user,
  className,
  size="40"

}: { 
  user: any, 
  className?: string,
  size?: string
}) {
  return (
    <Avatar 
      color="" 
      size={size}
      className={[className, styles.avatar].join(" ")} 
      // name={user.name ?? "Creative City"}>
      name={"Creative City"}>
    </Avatar>
  )
}