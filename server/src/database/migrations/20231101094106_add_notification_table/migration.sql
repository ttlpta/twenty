-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Sent', 'UnSent', 'SentFailed');

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "sentToId" TEXT NOT NULL,
    "sentToWorkspaceId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sentToId_fkey" FOREIGN KEY ("sentToId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sentToWorkspaceId_fkey" FOREIGN KEY ("sentToWorkspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
