import prisma from "@/lib/prisma";
import { ConversationUser } from "@/lib/server/messages";
import styles from "@/styles/components/dashboard-messages.module.scss"
import MessageForm from "./MessageForm";
import { getServerSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default async function Messages({ conversationUserId }: { conversationUserId: number }) {
  const { user } = await getServerSession()

  if(!user)
    redirect("/401")

  const messagePromise = prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [
            { fromUserId: Number(conversationUserId) },
            { toUserId: parseInt(user.id) }
          ],
        }, 
        {
          AND: [
            { fromUserId: parseInt(user.id) },
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
      toUserId: parseInt(user.id),
    },
    data: {
      isRead: true
    }
  }).then()

  return (
    <div className={`card shadow-sm`}>
      <div className="card-header bg-white border-end px-4 py-3">
        <h4 className="card-title">{ conversation.name }</h4>
      </div>
      <div className="card-body">
        <div className={`${styles.messages__list}`}>
          {
            messages && messages.map(message => (
              <div 
                key={message.id}
                className={`${styles.messages__message} ${message.fromUserId !== parseInt(user.id) ? styles.messages__message_from : styles.messages__message_to} d-flex flex-column `}>
                  <p className="fw-semibold mb-3">{ message.fromUser.name }</p>
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
          fromUserId={1}
          toUserId={Number(conversationUserId)} />
      </div>
    </div>
  )
}