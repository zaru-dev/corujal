"use server"; 

// importar de funções do servidor:
import { db } from "@/lib/db";

interface RegisterStudentActionResult {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
}

export async function registerStudent(
  _prevState: any, 
  data: {
    matricula: string;
    aluno: string;
    ano: "6" | "7" | "8" | "9";
    turma: string;
    turno: "Matutino" | "Vespertino";
  }
): Promise<RegisterStudentActionResult> {
  try {
    // verifica se o aluno já está cadastrado: 
    const student = await db.aluno.findUnique({
      where: { matricula: data.matricula },
    });
    
    if (student) {
      return {
        success: false,
        message: "Este(a) aluno(a) já foi cadastrado(a).",
      };
    };

    // cria o aluno no banco de dados
    await db.aluno.create({
      data: {
        matricula: data.matricula,
        aluno: data.aluno,
        turma: ( data.ano + "-" + data.turma.toUpperCase() ) as string,
        turno: data.turno,
      },
    });

    return {
      success: true,
      message: "O(a) aluno(a) foi cadastrado(a) com sucesso!",
    };

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: "Erro ao cadastrar o(a) aluno(a). Tente novamente.",
    };
  }
};