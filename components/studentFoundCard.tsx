"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Plus, X } from "lucide-react";

interface StudentFoundCardProps {
  aluno: string,
  turma: string,
  turno: string,
}

export function StudentFoundCard({ aluno, turma, turno }: StudentFoundCardProps ) {
  return (
    <Card className="gap-3 py-5 mt-4">
      <CardContent>
        <ul className="grid grid-cols-3 grid-rows-2">
          <li className="col-span-2 w-full font-semibold">Aluno</li>
          <li className="pl-4 font-semibold">Turma</li>
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="line-clamp-1 col-span-2 w-full hyphens-auto">
                { aluno }
              </li>
            </TooltipTrigger>
            <TooltipContent>{ aluno }</TooltipContent>
          </Tooltip>
          <li className="pl-4">
            { turma } da{" "}
            { turno === "Vespertino" ? "Manhã" : "Manhã" }
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button size="icon" variant="destructive">
          <X />
        </Button>
        <Button size="icon">
          <Plus />
        </Button>
      </CardFooter>
    </Card>
  );
}
