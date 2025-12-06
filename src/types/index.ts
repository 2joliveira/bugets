export const STATUS_OPTIONS = ["draft", "sent", "success", "recused"] as const;

export const ORDER_OPTIONS = {
  most_recent: "Mais recente",
  oldest: "Mais antigo",
  higher_value: "Maior valor",
  lowest_value: "Menor valor",
};

export const ORDER_KEYS = Object.keys(ORDER_OPTIONS) as Array<
  keyof typeof ORDER_OPTIONS
>;

export type OrdersType = (typeof ORDER_KEYS)[number]

export type StatusType = (typeof STATUS_OPTIONS)[number];
