"use server";

// funções:
import { db } from "@/lib/db";

interface SearchOccurrenceActionResult {
  success: boolean;
  message?: string;
  dados?: {
    matricula: string;
    aluno: string;
    turma: string;
    turno: string;
    ocorrencias?: {
      codigo: string;
      descricao: string;
      data: Date;
      medida: string;
    }[];
  };
  errors?: {
    [key: string]: string[] | undefined;
  };
}

export async function seachOccurrence(
  _prevState: any,
  data: {
    matricula: string;
  }
): Promise<SearchOccurrenceActionResult> {
  try {
    // verifica se o aluno está cadastrado no banco de dados:
    const student = await db.aluno.findUnique({
      where: { matricula: data.matricula },
    });

    if (!student) {
      return {
        success: false,
        message: "Este(a) aluno(a) não está cadastado(a)",
      };
    }

    const studentHasOccurrences = await db.ocorrencia.findMany({
      where: { alunoId: student?.matricula },
    });

    if (studentHasOccurrences.length === 0) {
      return {
        success: false,
        message: "Este(a) aluno(a) não possui ocorrências registradas.",
      };
    }

    return {
      success: true,
      dados: {
        matricula: student.matricula,
        aluno: student.aluno,
        turma: student.turma,
        turno: student.turno,
        ocorrencias: studentHasOccurrences.map((ocorrencia) => ({
          codigo: ocorrencia.codigo,
          data: ocorrencia.data,
          descricao: ocorrencia.descricao,
          medida: ocorrencia.medida,
        })),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Ocorreu um erro inesperado. Tente novamente.",
    };
  }
}
