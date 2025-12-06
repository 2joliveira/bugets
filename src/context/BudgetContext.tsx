import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import uuid from "react-native-uuid";
import {
  getBudgets,
  getBudget,
  createBudget,
  removeBudget,
  updateBudget,
} from "@/storage/budgetsStorage";
import { ServiceType } from "@/domain/service.schema";
import { BudgetType } from "@/domain/budget.schema";

interface ServiceEditOn extends ServiceType {
  index: number;
}

interface BudgetContextData {
  budgets: BudgetType[];
  loading: boolean;
  onAddBudget: (budget: BudgetType) => Promise<void>;
  loadBudgets: () => Promise<void>;
  onDeleteBudget: (id: string) => Promise<void>;
  getBudgetById: (id: string) => Promise<BudgetType | undefined>;
  selectedBudget: BudgetType | null;
  onSelectBudget: (id?: string) => Promise<void>;
  selectedService: ServiceEditOn | null;
  onSelectService: (service?: ServiceEditOn) => void;
  onUpdateBudget: (budget: BudgetType) => void;
  onDuplicateBudget: (budget: BudgetType) => void;
}

export const BudgetContext = createContext<BudgetContextData>(
  {} as BudgetContextData
);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetType | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceEditOn | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  async function loadBudgets() {
    setLoading(true);
    const data = await getBudgets();
    setBudgets(data);
    setLoading(false);
  }

  const getBudgetById = useCallback(
    async (id: string): Promise<BudgetType | undefined> => {
      setLoading(true);

      const budget = await getBudget(id);

      setLoading(false);

      if (!budget) return undefined;

      return budget;
    },
    []
  );

  const onAddBudget = useCallback(async (budget: BudgetType) => {
    setLoading(true);

    await createBudget(budget);

    loadBudgets();

    setLoading(false);
  }, []);

  const onDeleteBudget = useCallback(async (id: string) => {
    await removeBudget(id);

    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  }, []);

  const onUpdateBudget = useCallback(async (budget: BudgetType) => {
    setLoading(true);

    await updateBudget(budget);

    setSelectedBudget(budget);
    loadBudgets();

    setLoading(false);
  }, []);

  const onSelectBudget = useCallback(async (id?: string) => {
    if (!id) return setSelectedBudget(null);

    const budget = await getBudgetById(id);

    if (budget) setSelectedBudget(budget);
  }, []);

  const onSelectService = useCallback(async (service?: ServiceEditOn) => {
    if (!service) return setSelectedService(null);

    return setSelectedService(service);
  }, []);

  useEffect(() => {
    loadBudgets();
  }, []);

  const onDuplicateBudget = useCallback(async (budget: BudgetType) => {
    setLoading(true);

    await createBudget({ ...budget, id: uuid.v4() });

    loadBudgets();

    setLoading(false);
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        loading,
        onAddBudget,
        loadBudgets,
        onDeleteBudget,
        getBudgetById,
        selectedBudget,
        onSelectBudget,
        onUpdateBudget,
        onDuplicateBudget,
        selectedService,
        onSelectService,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  return useContext(BudgetContext);
}
