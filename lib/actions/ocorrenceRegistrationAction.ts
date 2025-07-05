"use server";

import { db } from "@/lib/db";
import { generateCodigo } from "@/lib/occurrenceCodeGenerator";

export async function registerOcorrence(
  _prevState: any,
  data: {
    matricula: string;
    detalhes: string;
    data: Date;
    medida: "Advertência verbal" | "Advertência escrita" | "Suspensão" | "Expulsão";
  }
) {
  try {
    await db.$transaction(async (tx) => {
      const codigo = await generateCodigo(tx, data.data);

      await tx.ocorrencia.create({
        data: {
          codigo: codigo,
          alunoId: data.matricula,
          descricao: data.detalhes,
          data: data.data,
          medida: data.medida,
        },
      });
    });

    return { success: true, message: "Ocorrência cadastrada." };
  } catch (_error) {
    return { success: false, message: "Erro ao cadastrar a ocorrência. Tente novamente." };
  }
}