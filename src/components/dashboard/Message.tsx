import prisma from "@/lib/prisma";
import { ConversationUser } from "@/lib/server/messages";
import styles from "@/styles/components/dashboard-messages.module.scss"
import MessageForm from "./MessageForm";

export default async function Messages({ conversation }: { conversation: ConversationUser }) {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: Number(conversation.conversationUserId) },
        { toUserId: Number(conversation.conversationUserId) }
      ]
    },
    include: {
      fromUser: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className={`card shadow-sm`}>
      <div className="card-header bg-white border-end px-4 py-3">
        <h4 className="card-title">{ conversation.oppositeUserName }</h4>
      </div>
      <div className="card-body">
        <div className={`${styles.messages__list}`}>
          {
            messages && messages.map(message => (
              <div 
                key={message.id}
              className={`${styles.messages__message} ${message.fromUserId == conversation.conversationUserId ? styles.messages__message_from : styles.messages__message_to} d-flex flex-column `}>
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
          toUserId={Number(conversation.conversationUserId)} />
      </div>
    </div>
  )
}