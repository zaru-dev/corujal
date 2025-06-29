"use client";

// importações de dependências:
import React, { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

// importações de componentes:
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

// actions:
import { seachStudent } from "@/lib/actions/studentSeachAction";
import { Loader } from "../ui/loader";
import { CalendarIcon, Search } from "lucide-react";

// validação do formulário:
const studentSearchSchema = z.object({
  matricula: z.string().min(1, "O termo de pesquisa é obrigatório"),
});

const ocorrenceSchema = z.object({
  descricao: z.string().trim().min(2, "Você precisa descrever a ocorrência"),
  data: z.date(),
  advertencia: z.enum([
    "Advertência verbal",
    "Avertência escrita",
    "Suspensão",
    "Outras",
  ]),
});

export function StudentSeachForm() {
  const [state, formAction, isPending] = useActionState(seachStudent, null);

  const form = useForm<z.infer<typeof studentSearchSchema>>({
    resolver: zodResolver(studentSearchSchema),
    defaultValues: {
      matricula: "",
    },
  });

  const ocorrenceForm = useForm<z.infer<typeof ocorrenceSchema>>({
    resolver: zodResolver(ocorrenceSchema),
    defaultValues: {
      descricao: "",
      data: undefined,
      advertencia: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof studentSearchSchema>) {
    startTransition(() => {
      formAction(data);
    });
  }

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
      {state?.success === true ? (
        <Form {...ocorrenceForm}>
          <form className="flex flex-col gap-4 mt-4">
            <FormField
              control={ocorrenceForm.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={ocorrenceForm.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da ocorrência</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "col-span-1 w-full max-w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={ocorrenceForm.control}
                name="advertencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advertência</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full col-span-1 max-w-full ">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="Avertência verbal">
                          Avertência verbal
                        </SelectItem>
                        <SelectItem value="Avertência escrita">
                          Avertência escrita
                        </SelectItem>
                        <SelectItem value="Suspenção">Suspenção</SelectItem>
                        <SelectItem value="Outras">Outras</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
            >
              {isPending ? <Loader /> : "Cadastrar" }
            </Button>
          </form>
        </Form>
      ) : null}
    </CardContent>
  );
}
