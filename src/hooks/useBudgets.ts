import { useEffect, useState, useCallback } from "react";
import { getBudgets, createBudget } from "@/storage/budgetsStorage";
import { BudgetType } from "@/app";

export function useBudgets() {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBudgets() {
    setLoading(true);
    const data = await getBudgets();
    setBudgets(data);
    setLoading(false);
  }

  const addBudget = useCallback(async (budget: BudgetType) => {
    setLoading(true);

    await createBudget(budget);
    await loadBudgets();

    setLoading(false);
  }, []);

  useEffect(() => {
    loadBudgets();
  }, [addBudget]);

  return {
    budgets,
    loading,
    addBudget,
  };
}
