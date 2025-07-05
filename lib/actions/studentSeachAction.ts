"use server";

// funções:
import { db } from "@/lib/db";

interface SearchStudentActionResult {
  success: boolean;
  message?: string;
  dados?: {
    matricula: string,
    aluno: string,
    turma: string,
    turno: string,
  }
  errors?: {
    [key: string]: string[] | undefined;
  };
}

export async function seachStudent(
  _prevState: SearchStudentActionResult | null,
  data: {
    matricula: string
  }
): Promise<SearchStudentActionResult> {
  try {
    // verifica se o aluno está cadastrado no banco de dados:
    const student = await db.aluno.findUnique({
      where: { matricula: data.matricula },
    });

    if (!student) {
      return {
        success: false,
        message: "Este(a) aluno(a) não está cadastado(a)"
      }
    };

    return {
      success: true,
      dados: {
        matricula: student.matricula,
        aluno: student.aluno,
        turma: student.turma,
        turno: student.turno
      }
    };
  } catch(error) {
    return {
      success: false,
      message: "Ocorreu um erro inesperado. Tente novamente."
    }
  }
}