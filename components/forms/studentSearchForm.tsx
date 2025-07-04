"use client";

// importações de dependências:
import React, { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// importações de componentes:
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// actions:
import { seachStudent } from "@/lib/actions/studentSeachAction";
import { Loader } from "../ui/loader";
import { Search } from "lucide-react";
import { StudentFoundCard } from "../studentFoundCard";
import { OccurrenceForm } from "./occurrenceForm";

// validação do formulário:
const studentSearchSchema = z.object({
  matricula: z.string().min(1, "O termo de pesquisa é obrigatório"),
});

export function StudentSeachForm() {
  const [state, formAction, isPending] = useActionState(seachStudent, null);

  const form = useForm<z.infer<typeof studentSearchSchema>>({
    resolver: zodResolver(studentSearchSchema),
    defaultValues: {
      matricula: "",
    },
  });

  async function onSubmit(data: z.infer<typeof studentSearchSchema>) {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="matricula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matricula</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input {...field} className="rounded-r-none" />
                    <Button
                      type="submit"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      {isPending ? <Loader /> : <Search />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* --- E AQUI MOSTRAMOS O RESULTADO (OU O SEGUNDO FORM) --- */}
      {/* se a action retornou sucesso e temos os dados */}
      {state && state.success && state.dados && (
        <StudentFoundCard 
          aluno = {state?.dados.aluno}
          turma = {state?.dados.turma}
          turno = {state?.dados.turno}
        />
      )}
      {state?.success === true ? (
        <OccurrenceForm matricula={ state?.dados?.matricula as string }/>
      ) : null}
    </CardContent>
  );
}
