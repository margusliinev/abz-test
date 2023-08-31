-- AlterTable
ALTER TABLE "users" ALTER COLUMN "registration_timestamp" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "registration_timestamp" SET DATA TYPE TIMESTAMP(3);
