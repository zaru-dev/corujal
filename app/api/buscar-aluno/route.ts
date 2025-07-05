import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { matricula } = await req.json();

    const aluno = await db.aluno.findUnique({
      where: { matricula }
    });

    if (!aluno) {
      return NextResponse.json({ success: false, message: "Aluno não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true, aluno });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Erro ao buscar aluno." }, { status: 500 });
  }
}
