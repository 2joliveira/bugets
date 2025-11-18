import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Home, Budget, BudgetDetails } from "@/app";
import { colors, fontFamily } from "@/theme";

export type StackRoutesList = {
  home: undefined;
  budget: undefined;
  budgetDetails: { id: string };
};

export type StackRoutesProps<T extends keyof StackRoutesList> =
  NativeStackScreenProps<StackRoutesList, T>;

const Stack = createNativeStackNavigator<StackRoutesList>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerBackVisible: true,
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerShadowVisible: false,
        headerTintColor: colors.gray[700],
        headerTitleStyle: {
          ...fontFamily.titleSm,
        },
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="budget"
        component={Budget}
        options={{
          title: "Orçamento",
        }}
      />

      <Stack.Screen
        name="budgetDetails"
        component={BudgetDetails}
        options={({ route }) => ({
          title: `Orçamento #${route.params.id}`,
        })}
      />
    </Stack.Navigator>
  );
}
