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

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80),
    "email" VARCHAR(80),
    "senha" VARCHAR(50),

    CONSTRAINT "usear_pkey" PRIMARY KEY ("id")
);
