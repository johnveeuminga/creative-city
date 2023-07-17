import prisma from "../prisma";

export interface ConversationUser {
  conversationUserId: number;
  oppositeUserName: string;
  latestMessage: string;
  latestMessageUserId: number;
  latestMessageCreatedAt: Date;
  isRead: boolean;
  avatar: string | null; 
}

export async function getUniqueMessagesOfUser(id: string) {
  const result: ConversationUser[] = await prisma.$queryRaw`
    SELECT
      c.conversationUserId,
      u.name as oppositeUserName,
      t.message as latestMessage,
      t.fromUserId as latestMessageUserId,
      t.createdAt as latestMessageCreatedAt,
      a.avatar_path as avatar,
      t.isRead AS isRead
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
    ORDER BY
      latestMessageCreatedAt DESC
  `

  return result
}