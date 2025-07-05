"use client";

// importações de dependências:
import React, { useState } from "react";
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
import { Loader } from "../ui/loader";
import { Search } from "lucide-react";
import { StudentFoundCard, StudentNotFoundCard } from "../studentSearchResultCard";
import { OccurrenceForm } from "./occurrenceForm";

// validação do formulário:
const valMessage = "O número de matrícula tem 6 dígitos";
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
type Aluno = {
  aluno: string;
  matricula: string;
  turma: string;
  turno: string;
};

export function StudentSeachForm() {
const [aluno, setAluno] = useState<Aluno | null>(null);
const [isPending, setIsPending] = useState(false);
const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof studentSearchSchema>>({
    resolver: zodResolver(studentSearchSchema),
    defaultValues: {
      matricula: "",
    },
  });
const onSubmit = async (data: z.infer<typeof studentSearchSchema>) => {
    setIsPending(true);
    setMessage("");

    try {
      const res = await fetch("/api/buscar-aluno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (!res.ok) {
        setMessage(json.message || "Erro ao buscar aluno.");
        setAluno(null);
      } else {
        setAluno(json.aluno);
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erro inesperado.");
      setAluno(null);
    } finally {
      setIsPending(false);
    }
  };

  const ocorrenceForm = useForm<z.infer<typeof ocorrenceSchema>>({
    resolver: zodResolver(ocorrenceSchema),
    defaultValues: {
      descricao: "",
      data: undefined,
      advertencia: undefined,
    },
  });

  return (
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-3"
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
                      className="rounded-l-none border-l-0 cursor-pointer"
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
    {message && <p className="text-sm text-red-500">{message}</p>}

{aluno && (
  <div className="border rounded p-4 mt-4">
    <p><strong>Nome:</strong> {aluno.aluno}</p>
    <p><strong>Matrícula:</strong> {aluno.matricula}</p>
    <p><strong>Turma:</strong> {aluno.turma}</p>
    <p><strong>Turno:</strong> {aluno.turno}</p>
  </div>
)}

      {/* --- E AQUI MOSTRAMOS O RESULTADO (OU O SEGUNDO FORM) --- */}
      {/* se a action retornou sucesso e temos os dados */}
      {aluno && (
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
                    variant="outline"
                    className={cn(
                      "w-full text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                      : "Selecione a data"}
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
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Advertência verbal">Advertência verbal</SelectItem>
                <SelectItem value="Advertência escrita">Advertência escrita</SelectItem>
                <SelectItem value="Suspensão">Suspensão</SelectItem>
                <SelectItem value="Outras">Outras</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <Button type="submit">
      {isPending ? <Loader /> : "Cadastrar"}
    </Button>
  </form>
</Form>
)}
      
    </CardContent>
  );
}
