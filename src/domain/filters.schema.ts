import { ORDER_KEYS, STATUS_OPTIONS } from "@/types";
import z from "zod";

export const filtersSchema = z.object({
  search: z.string(),
  status: z.array(z.enum(STATUS_OPTIONS)).optional(),
  order: z.enum(ORDER_KEYS).optional(),
});

export type FiltersType = z.infer<typeof filtersSchema>;