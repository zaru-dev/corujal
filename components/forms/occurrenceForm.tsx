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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "../ui/loader";
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

// ícones:
import { CalendarIcon } from "lucide-react";

// actions:
import { registerOcorrence } from "@/lib/actions/ocorrenceRegistrationAction";

interface OccurrenceFormProps {
  matricula: string;
}

const occurrenceSchema = z.object({
  detalhes: z.string().trim().min(2, "Você precisa descrever a ocorrência"),
  data: z.date(),
  advertencia: z.enum([
    "Advertência verbal",
    "Avertência escrita",
    "Suspensão",
    "Outras",
  ]),
});

export function OccurrenceForm({ matricula }: OccurrenceFormProps) {
  const [state, formAction, isPending] = useActionState(registerOcorrence, null);
  const occurrenceForm = useForm<z.infer<typeof occurrenceSchema>>({
    resolver: zodResolver(occurrenceSchema),
    defaultValues: {
      detalhes: "",
      data: undefined,
      advertencia: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof occurrenceSchema>) {
    const data = {
      matricula: matricula,
      detalhes: values.detalhes,
      data: values.data,
      advertencia: values.advertencia
    }

    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <Form {...occurrenceForm}>
      <form 
        className="flex flex-col gap-4 mt-4"
        onSubmit={occurrenceForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={occurrenceForm.control}
          name="detalhes"
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
            control={occurrenceForm.control}
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
            control={occurrenceForm.control}
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
                    <SelectItem value="Suspensão">Suspensão</SelectItem>
                    <SelectItem value="Outras">Outras</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">{isPending ? <Loader /> : "Cadastrar"}</Button>
      </form>
    </Form>
  );
}
