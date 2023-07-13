import Messages from "@/components/dashboard/Message"
import { getUniqueMessagesOfUser } from "@/lib/server/messages"
import styles from '@/styles/components/dashboard-messages.module.scss'
import { DateTime } from "luxon"
import Image from "next/image"
import React from "react"

export default async function MessagesPage() {
  const res = await getUniqueMessagesOfUser('2')

  const TimeAgo = (conversationTime: Date) => {
    const now = DateTime.now()
    const conversationCreated = DateTime.fromJSDate(conversationTime)

    const diff = now.diff(conversationCreated, ['days', 'hours', 'minutes']).toObject()

    return (
      <p className={`mb-0 ${styles.time}`}>
        <small>
          {
            !! diff.days ? `${Math.floor(diff.days)}d` :
              !! diff.hours ? `${Math.floor(diff.hours)}h` :  `${Math.floor(diff.minutes ?? 0)}m`
          }
        </small>
      </p>
    )
  }
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-5 fw-bold">Conversations</h4>
              {
                res.map(conversation => (
                  <div 
                    key={conversation.conversationUserId}
                    className={`${styles.conversation} d-flex mb-5 w-100 cursor-pointer`}>
                      <div className={`${styles.avatar} rounded-circle position-relative overflow-hidden me-3`}>
                        { 
                          conversation.avatar && 
                            <Image 
                              fill={true}
                              objectFit="cover"
                              src={conversation.avatar}
                              alt={conversation.oppositeUserName}
                              />
                        }
                      </div>
                      <div className="conversation__content flex-grow-1">
                        <p className="fw-semibold mb-0">{ conversation.oppositeUserName }</p>
                        <p className={`${styles.preview}`}>{ conversation.latestMessage }</p>
                      </div>
                      <div className="details ms-5 text-end">
                        { TimeAgo(conversation.latestMessageCreatedAt) }
                        {
                          !conversation.isRead &&
                            <div className={styles.indicator}></div>
                        }
                      </div>
                  </div>
                ))
              } 
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {
            res.length &&
              <React.Suspense fallback={<p>Loading</p>}>
                <Messages conversation={res[0]} />

              </React.Suspense>
          }
        </div>
      </div>
    </div>
  )  
}