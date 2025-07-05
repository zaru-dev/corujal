"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ArrowRight } from "lucide-react";

interface StudentFoundCardProps {
  aluno: string;
  turma: string;
  turno: string;
  onContinue: () => void;
  invisible: boolean;
}

// to occurrenceForm.tsx
function StudentFoundCard({
  aluno,
  turma,
  turno,
  onContinue,
  invisible,
}: StudentFoundCardProps) {
  return (
    <div className="flex flex-col gap-3 text-sm border rounded-md p-4 mt-4 dark:bg-input/30">
      <div>
        <ul className="grid grid-cols-3 grid-rows-2">
          <li className="col-span-2 w-full font-semibold">Aluno encontrado</li>
          <li className="pl-4 font-semibold">Turma</li>
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="line-clamp-1 col-span-2 w-full hyphens-auto">
                {aluno}
              </li>
            </TooltipTrigger>
            <TooltipContent>{aluno}</TooltipContent>
          </Tooltip>
          <li className="pl-4">
            {turma} da {turno === "Vespertino" ? "Manhã" : "Manhã"}
          </li>
        </ul>
      </div>
      { !invisible && (
        <div className="flex gap-3">
          <Button className="cursor-pointer" onClick={onContinue}>
            Continuar <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}

function StudentNotFoundCard() {
  return (
    <div className="text-sm mt-4 border p-4 rounded-md">
      <p>Não há aluno registrado com essa matricula.</p>
      <p>Por favor, verifique se o número digitado está correto ou</p>
      <Button asChild className="mt-2 cursor-pointer:">
        <Link href="/cadastrar/aluno">
          Cadastre um aluno <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}

// to occurrenceSearchForm.tsx
interface OccurrenceStudentFoundCardProps {
  aluno: string;
  turma: string;
  turno: string;
}

function OccurrenceStudentFoundCard({
  aluno,
  turma,
  turno,
}: OccurrenceStudentFoundCardProps ) {
  return (
    <div className="flex flex-col gap-3 text-sm border rounded-md p-4 mt-4 dark:bg-input/30">
      <div>
        <ul className="grid grid-cols-3 grid-rows-2">
          <li className="col-span-2 w-full font-semibold">Aluno encontrado</li>
          <li className="pl-4 font-semibold">Turma</li>
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="line-clamp-1 col-span-2 w-full hyphens-auto">
                {aluno}
              </li>
            </TooltipTrigger>
            <TooltipContent>{aluno}</TooltipContent>
          </Tooltip>
          <li className="pl-4">
            {turma} da {turno === "Vespertino" ? "Manhã" : "Manhã"}
          </li>
        </ul>
      </div>
      
    </div>
  );
}

export { StudentFoundCard, StudentNotFoundCard, OccurrenceStudentFoundCard };
