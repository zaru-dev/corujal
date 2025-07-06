"use client";

// dependências:
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

// actions:


const situationSchema = z.object({
  situacao: z.enum(["Registrada", "Revisada", "Em andamento", "Finalizada"]),
});

export function SituationSelect() {

  const situationForm = useForm<z.infer<typeof situationSchema>>({
    resolver: zodResolver(situationSchema),
    defaultValues: {
      situacao: undefined,
    },
  });

  return (
    <Form {...situationForm}>
      <form
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
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Alterar situação" />
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
      </form>
    </Form>
  );
}
