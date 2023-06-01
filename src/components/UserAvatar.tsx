'use client'

import Avatar from "react-avatar"
import styles from '@/styles/user-avatar.module.css'

export default function UserAvatar({ 
  user,
  className
}: { user: any, className?: string}) {
  return (
    <Avatar size="40" className={[className, styles.avatar].join(" ")} name={user.name ?? "Creative City"}></Avatar>
  )
}