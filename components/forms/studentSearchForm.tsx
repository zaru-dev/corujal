"use client";

// importações de dependências:
import React, { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// importações de componentes:
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// actions: 
import { seachStudent } from "@/lib/actions/studentSeachAction";
import { Loader } from "../ui/loader";
import { Search } from "lucide-react";

// validação do formulário:
const studentSearchSchema = z.object({
  matricula: z.string().min(1, "O termo de pesquisa é obrigatório"),
});

export function StudentSeachForm() {
  const [ state, formAction, isPending ] = useActionState(seachStudent, null);

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CardContent>
        <FormField
          control={form.control}
          name="matricula"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matricula</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input 
                    {...field} 
                    className="rounded-r-none"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-l-none border-l-0"
                  >
                    { isPending ? <Loader /> : <Search /> }
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </CardContent>
        <CardFooter>
          {state && state.success && state.dados && (
        <div className="p-6 pt-0">
          <h3 className="text-lg font-semibold mb-2">Aluno Encontrado:</h3>
          <div className="p-4 border rounded-md bg-secondary/50">
            <p><strong>Matrícula:</strong> {state.dados.matricula}</p>
            <p><strong>Aluno:</strong> {state.dados.aluno}</p>
            <p><strong>Turma:</strong> {state.dados.turma}</p>
            <p><strong>Turno:</strong> {state.dados.turno}</p>
          </div>
          {/* AQUI é onde você renderizaria seu segundo formulário, 
            passando `state.dados` como props pra ele! 
          */}
        </div>
      )}
        </CardFooter>
      </form>
    </Form>
  );
}