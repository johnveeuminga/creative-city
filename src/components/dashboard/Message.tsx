import prisma from "@/lib/prisma";
import { ConversationUser } from "@/lib/server/messages";
import styles from "@/styles/components/dashboard-messages.module.scss"
import MessageForm from "./MessageForm";

export default async function Messages({ conversationUserId }: { conversationUserId: number }) {
  const messagePromise = prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [
            { fromUserId: Number(conversationUserId) },
            { toUserId: 2 }
          ],
        }, 
        {
          AND: [
            { fromUserId: 2 },
            { toUserId: Number(conversationUserId) }
          ]
        }
      ]
    },
    include: {
      fromUser: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const userPromise = prisma.user.findFirstOrThrow({
    where: {
      id: Number(conversationUserId),
    }
  })

  const [messages, conversation] = await Promise.all([messagePromise, userPromise])

  prisma.message.updateMany({
    where: {
      fromUserId: Number(conversationUserId),
      toUserId: 2,
    },
    data: {
      isRead: true
    }
  }).then()

  return (
    <div className={`card shadow-sm`}>
      <div className="card-header bg-white border-end px-4 py-3">
        <h4 className="card-title">{ conversation.first_name } { conversation.last_name }</h4>
      </div>
      <div className="card-body">
        <div className={`${styles.messages__list}`}>
          {
            messages && messages.map(message => (
              <div 
                key={message.id}
                className={`${styles.messages__message} ${message.fromUserId !== 2 ? styles.messages__message_from : styles.messages__message_to} d-flex flex-column `}>
                  <p className="fw-semibold mb-3">{ message.fromUser.first_name }</p>
                  <div className={`${styles.messages__content} px-5 py-3 bg-secondary`}>
                    { message.message }
                  </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="card-footer bg-white">
        <MessageForm 
          fromUserId={2}
          toUserId={Number(conversationUserId)} />
      </div>
    </div>
  )
}