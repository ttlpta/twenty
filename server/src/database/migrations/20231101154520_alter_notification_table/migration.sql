-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_sentToId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_sentToWorkspaceId_fkey";

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "sentToId" DROP NOT NULL,
ALTER COLUMN "sentToWorkspaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sentToId_fkey" FOREIGN KEY ("sentToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sentToWorkspaceId_fkey" FOREIGN KEY ("sentToWorkspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
