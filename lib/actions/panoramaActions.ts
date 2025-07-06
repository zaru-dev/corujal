"use server";

// funções:
import { db } from "@/lib/db";

interface PanoramaActionResult {
  success: boolean;
  message?: string;
  ocorrencias?: {
    codigo: string;
    situacao: string
    aluno: string;
    data: Date;
    medida: string;
    descricao: string;
  }[];
}

export async function bringOccurrences(): Promise<PanoramaActionResult> {
  try {
    const occurrences = await db.ocorrencia.findMany({
      include: {
        aluno: {
          select: { aluno: true }
        }
      }
    });

    return {
      success: true,
      ocorrencias: occurrences.map((o) => ({
          codigo: o.codigo,
          situacao: o.situacao,
          aluno: o.aluno?.aluno,
          data: o.data,
          medida: o.medida,
          descricao: o.descricao
        })),
    };

  } catch(error){
    console.error(error);
    return {
      success: false,
      message: "Ocorreu um erro inesperado. Tente novamente."
    }
  }
}