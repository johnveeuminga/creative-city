'use client'

import Avatar from "react-avatar"
import styles from '@/styles/user-avatar.module.css'

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
      size={size}
      className={[className, styles.avatar].join(" ")} 
      name={user.name ?? "Creative City"}>
    </Avatar>
  )
}