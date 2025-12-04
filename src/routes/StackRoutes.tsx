import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Home, Budget, BudgetDetails } from "@/app";
import { Header, MainHeader } from "@/components";

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
        header: ({ route }) =>
          route.name === "home" ? <MainHeader /> : <Header />,
        statusBarStyle: "dark",
        statusBarAnimation: "fade"
      }}
    >
      <Stack.Screen name="home" component={Home} />

      <Stack.Screen name="budget" component={Budget} />

      <Stack.Screen name="budgetDetails" component={BudgetDetails} />
    </Stack.Navigator>
  );
}
