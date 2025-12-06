import AsyncStorage from "@react-native-async-storage/async-storage";
import { BudgetType } from "@/domain/budget.schema";
import { ORDER_OPTIONS, OrdersType, StatusType } from "@/types";

const BUDGET_STORAGE_KEY = "@budgets";

const ORDER_KEYS = Object.keys(ORDER_OPTIONS) as Array<
  keyof typeof ORDER_OPTIONS
>;

type BudgetStorageType = {
  budgets: BudgetType[];
  filters: {
    search: string;
    order: OrdersType | undefined;
    status: StatusType[] | undefined;
  };
};

async function getStorage(): Promise<BudgetStorageType | undefined> {
  try {
    const storage = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);

    const parsedStorage = storage ? JSON.parse(storage) : undefined;

    return parsedStorage as BudgetStorageType;
  } catch (error) {
    console.error(error);
  }
}

export async function getBudgets(): Promise<BudgetType[]> {
  try {
    const storage = await getStorage();

    if (!storage?.budgets) return [];

    return storage.budgets;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBudget(id: string): Promise<BudgetType | undefined> {
  try {
    const budgets = await getBudgets();

    const budget = budgets?.find((budget: any) => budget.id === id);

    if (!budget) return undefined;

    return budget;
  } catch (error) {
    console.error(error);
  }
}

export async function createBudget(budget: BudgetType): Promise<void> {
  try {
    const storage = await getStorage();

    const updatedBudgets = [...(storage?.budgets ?? []), budget];

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        budgets: updatedBudgets,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export async function removeBudget(id: string): Promise<void> {
  try {
    const storage = await getStorage();
    const updatedBudgets = storage?.budgets.filter(
      (budget) => budget.id !== id
    );
    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        budgets: updatedBudgets,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updateBudget(budget: BudgetType) {
  try {
    const storage = await getStorage();
    if (!storage?.budgets) return null;
    const filteredBudgets = storage.budgets.filter(
      (currentBudget) => currentBudget.id !== budget.id
    );
    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        budgets: [...filteredBudgets, budget],
      })
    );
  } catch (error) {
    console.error(error);
  }
}
