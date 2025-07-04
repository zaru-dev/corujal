"use server";

import { db } from "@/lib/db"; 

interface RegisterOcorrenceActionResult {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
}

export async function registerOcorrence(
  _prevState: any,
  data: {
    matricula: string;
    detalhes: string;
    data: Date;
    advertencia:  "Advertência verbal" | "Avertência escrita" | "Suspensão" | "Outras";
  }
): Promise<RegisterOcorrenceActionResult> {
  try {
    await db.ocorrencia.create({
      data:{
        alunoId: data.matricula,
        descricao: data.detalhes,
        data: data.data,
        punicao: data.advertencia
      }
    })

    return {
      success: true,
      message: "A ocorrência foi cadastrada."
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao cadastrar a ocorrência. Tente novamente."
    }
  }
}