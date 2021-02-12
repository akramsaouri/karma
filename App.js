import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { EditBalanceScreen } from "./screens/EditBalance.screen";
import { HomeScreen } from "./screens/Home.screen";
import { TransactionsScreen } from "./screens/Transactions.screen";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Navigator headerMode="none">
            <Screen name="Home" component={HomeScreen} />
            <Screen name="EditBalance" component={EditBalanceScreen} />
            <Screen name="Transactions" component={TransactionsScreen} />
          </Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
