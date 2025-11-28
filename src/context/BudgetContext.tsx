import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import uuid from "react-native-uuid";
import { BudgetType } from "@/app";
import { getBudgets, createBudget, BudgetItem } from "@/storage/budgetsStorage";

interface BudgetContextData {
  budgets: BudgetItem[];
  loading: boolean;
  addBudget: (budget: BudgetType) => Promise<void>;
  loadBudgets: () => Promise<void>;
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

  const addBudget = useCallback(async (budget: BudgetType) => {
    setLoading(true);

    const newBudget: BudgetItem = {
      id: String(uuid.v4()),
      ...budget,
    };

    await createBudget(newBudget);

    setBudgets((prev) => [...prev, newBudget]);

    setLoading(false);
  }, []);

  useEffect(() => {
    loadBudgets();
  }, []);

  return (
    <BudgetContext.Provider
      value={{ budgets, loading, addBudget, loadBudgets }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  return useContext(BudgetContext);
}
