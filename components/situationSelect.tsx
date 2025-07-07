"use client";

// dependências:
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// componentes:
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

// actions:
import { updateOccurrenceSituation } from "@/lib/actions/panoramaActions";
import { Loader } from "./ui/loader";

const situationSchema = z.object({
  situacao: z.enum(["Registrada", "Revisada", "Em andamento", "Finalizada"]),
});

interface SituationSelectProps {
  codigo: string
  sitAtual: string
}

export function SituationSelect({ codigo, sitAtual }: SituationSelectProps) {
  const [ state, formAction, isPeding ] = useActionState(updateOccurrenceSituation, null)

  const situationForm = useForm<z.infer<typeof situationSchema>>({
    resolver: zodResolver(situationSchema),
    defaultValues: {
      situacao: undefined,
    },
  });

  async function onSubmit(value: z.infer<typeof situationSchema>){
    const data = {
      codigo: codigo,
      newSituation: value.situacao
    }
    startTransition(() => {
      formAction(data)
    })
  }

  return (
    <Form {...situationForm}>
      <form
        onSubmit={situationForm.handleSubmit(onSubmit)}
        className="flex"
      >
        <FormField
          control={situationForm.control}
          name="situacao"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                name={field.name}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px] rounded-r-none">
                    <SelectValue placeholder={sitAtual} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="Registrada">Registrada</SelectItem>
                  <SelectItem value="Revisada">Revisada</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          size="icon"
          className="border-l-0 rounded-l-none cursor-pointer"
          type="submit"
        >
          { isPeding ? (
            <Loader />
          ) :  <RefreshCcw />}
        </Button>
      </form>
    </Form>
  );
}