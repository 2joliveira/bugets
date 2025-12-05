import z from "zod";

export const serviceSchema = z.object({
  id: z.uuidv4(),
  title: z.string().min(2, "Título do serviço é obrigatório."),
  description: z.string().min(2, "Adicione uma descrição."),
  quantity: z.number().min(1, "informe a quantidade."),
  price: z.number().min(1, "Informe o valor do serviço"),
});

export type ServiceType = z.infer<typeof serviceSchema>;
