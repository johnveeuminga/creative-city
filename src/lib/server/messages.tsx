import prisma from "../prisma";

export interface ConversationUser {
  conversationUserId: number;
  oppositeUserName: string;
  latestMessage: string;
  latestMessageCreatedAt: Date;
  isRead: boolean;
  avatar: string | null; 
}

export async function getUniqueMessagesOfUser(id: string) {
  const result: ConversationUser[] = await prisma.$queryRaw`
    SELECT
      c.conversationUserId,
      CONCAT(u.first_name, ' ', u.last_name ) as oppositeUserName,
      t.message as latestMessage,
      t.createdAt as latestMessageCreatedAt,
      a.avatar_path as avatar,
      t.isRead AS lastMessageRead
    FROM 
      (
        SELECT DISTINCT
          CASE 
            WHEN fromUserId = ${id} THEN toUserId
            ELSE fromUserId
          END AS conversationUserId,
          MAX(createdAt) as latestMessageCreatedAt
        FROM Message
        WHERE 
          fromUserId = ${id} OR toUserID = ${id}
        GROUP BY
          conversationUserId
      ) c 
    INNER JOIN
      Message t ON (
        (t.fromUserId = ${id} AND t.toUserId = c.conversationUserId)
        OR
        (t.fromUserId = c.conversationUserId and t.toUserId = ${id})
      )
    INNER JOIN 
      User u ON u.id = c.conversationUserId
    INNER JOIN
      Artist a on a.userId = c.conversationUserId
    WHERE
      t.createdAt = c.latestMessageCreatedAt
  `

  return result
}