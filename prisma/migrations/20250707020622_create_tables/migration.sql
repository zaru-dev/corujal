-- CreateTable
CREATE TABLE "Aluno" (
    "matricula" TEXT NOT NULL,
    "aluno" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "codigo" TEXT NOT NULL,
    "situacao" TEXT NOT NULL DEFAULT 'Registrada',
    "data" TIMESTAMPTZ(3) NOT NULL,
    "medida" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE INDEX "Ocorrencia_alunoId_idx" ON "Ocorrencia"("alunoId");

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("matricula") ON DELETE CASCADE ON UPDATE CASCADE;
