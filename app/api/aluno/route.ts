import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { matricula, aluno, ano, turma, turno } = data;

    const existing = await db.aluno.findUnique({
      where: { matricula }
    });

    if (existing) {
      return NextResponse.json({ success: false, message: "Aluno já cadastrado." }, { status: 400 });
    }

    await db.aluno.create({
      data: {
        matricula,
        aluno,
        turma: `${ano}-${turma.toUpperCase()}`,
        turno,
      }
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Erro no servidor." }, { status: 500 });
  }
}
