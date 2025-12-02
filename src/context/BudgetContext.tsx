import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { BudgetType } from "@/app";
import {
  getBudgets,
  getBudget,
  createBudget,
  removeBudget,
  type BudgetItem,
} from "@/storage/budgetsStorage";

interface BudgetContextData {
  budgets: BudgetItem[];
  loading: boolean;
  addBudget: (budget: BudgetType) => Promise<void>;
  loadBudgets: () => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  getBudgetById: (id: string) => Promise<BudgetItem | undefined>;
}

export const BudgetContext = createContext<BudgetContextData>(
  {} as BudgetContextData
);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBudgets() {
    setLoading(true);
    const data = await getBudgets();
    setBudgets(data);
    setLoading(false);
  }

  const getBudgetById = useCallback(
    async (id: string): Promise<BudgetItem | undefined> => {
      setLoading(true);

      const budget = await getBudget(id);

      setLoading(false);

      if (!budget) return undefined;

      return budget;
    },
    []
  );

  const addBudget = useCallback(async (budget: BudgetType) => {
    setLoading(true);

    await createBudget(budget);

    setBudgets((prev) => [...prev, budget]);

    setLoading(false);
  }, []);

  const deleteBudget = useCallback(async (id: string) => {
    await removeBudget(id);

    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  }, []);

  useEffect(() => {
    loadBudgets();
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        loading,
        addBudget,
        loadBudgets,
        deleteBudget,
        getBudgetById,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  return useContext(BudgetContext);
}
