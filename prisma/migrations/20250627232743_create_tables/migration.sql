-- CreateTable
CREATE TABLE "Aluno" (
    "matricula" TEXT NOT NULL,
    "aluno" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "turno" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "punicao" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Ocorrencia_alunoId_idx" ON "Ocorrencia"("alunoId");

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("matricula") ON DELETE CASCADE ON UPDATE CASCADE;
