import { Prisma } from "@prisma/client";

/**
 * Gera algo como 25.07-OC001, 25.07-OC002...
 * – yy = ano % 100
 * – mm = mês 01-12
 * – contador com 3 dígitos, reinicia a cada yyyy-mm
 */
export async function generateCodigo(
  tx: Prisma.TransactionClient,
  date: Date
): Promise<string> {
  const yy = date.getFullYear().toString().slice(-2);            // “25”
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");  // “07”
  const prefix = `${yy}.${mm}-OC`;                               // “25.07-OC”

  // pega o maior sequencial já usado nesse mês
  const last = await tx.ocorrencia.findFirst({
    where: { codigo: { startsWith: prefix } },
    orderBy: { codigo: "desc" },
    select: { codigo: true },
  });

  const next = last ? Number(last.codigo.slice(-3)) + 1 : 1;

  return `${prefix}${next.toString().padStart(3, "0")}`;         // “25.07-OC001”
}
