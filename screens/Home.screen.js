import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
  Icon,
  useTheme,
  Avatar,
} from "@ui-kitten/components";
import { TransactionItem } from "../components/TransactionItem.component";
import useSWR from "swr";
import { apiBaseURL } from "../api/constants";

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { data: balanceData } = useSWR(apiBaseURL + "/api/balance");
  const { data: transactionData } = useSWR(apiBaseURL + "/api/transactions");

  const navigateDetails = ({ operation }) => {
    navigation.navigate("EditBalance", { operation });
  };

  const navigateTransactions = () => {
    navigation.navigate("Transactions");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Home" alignment="center" />
      <Divider />
      <Layout
        style={{
          flex: 1,
          backgroundColor: theme["background-basic-color-2"],
          padding: 16,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Avatar source={require("../assets/avatar.png")} />
        </View>
        <Layout layer="1" style={{ padding: 16, borderRadius: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Text category="h1">{balanceData?.balance?.value}</Text>
            <Text category="h4">KP</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <Button
              appearance="outline"
              accessoryLeft={(props) => <Icon {...props} name="minus" />}
              onPress={() => navigateDetails({ operation: "SUB" })}
              style={{ flex: 1, marginRight: 8 }}
            >
              Withdraw KP
            </Button>
            <Button
              appearance="outline"
              accessoryLeft={(props) => <Icon {...props} name="plus" />}
              onPress={() => navigateDetails({ operation: "ADD" })}
              style={{ flex: 1, marginLeft: 8 }}
            >
              Add KP
            </Button>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text appearance="hint">Transactions</Text>
            <Button
              appearance="ghost"
              size="small"
              onPress={navigateTransactions}
            >
              See all
            </Button>
          </View>
          {transactionData && (
            <View>
              <TransactionItem item={transactionData[0].transactions[0]} />
            </View>
          )}
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};
