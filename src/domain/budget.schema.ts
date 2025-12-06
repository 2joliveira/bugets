import z from "zod";
import { serviceSchema } from "./service.schema";
import { STATUS_OPTIONS } from "@/types";

export const budgetSchema = z.object({
  id: z.uuidv4(),
  client: z.string().min(1, "Nome do cliente é obrigatório."),
  title: z.string().min(1, "Título do orçamento é obrigatório."),
  services: z.array(serviceSchema).min(1, "Adicione ao menos um serviço"),
  status: z.enum(STATUS_OPTIONS, { error: "Status é obrigatório." }),
  percentageDiscount: z.number().optional(),
  descountValue: z.number().optional(),
  budgetPrice: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BudgetType = z.infer<typeof budgetSchema>;
