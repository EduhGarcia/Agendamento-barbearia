/*
  Warnings:

  - You are about to drop the `agendamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "agendamento";

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" SERIAL NOT NULL,
    "data_agendada" DATE,
    "email" VARCHAR(80),
    "servico" VARCHAR(30),
    "tipo_servico" VARCHAR(50),
    "horario" VARCHAR(5),

    CONSTRAINT "data_agendamento_pkey" PRIMARY KEY ("id")
);
