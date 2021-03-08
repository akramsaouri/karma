import React from "react";
import {
  Divider,
  Icon,
  List,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Text,
  useTheme,
  Spinner,
} from "@ui-kitten/components";
import { SafeAreaView, View } from "react-native";
import { TransactionItem } from "../components/TransactionItem.component";
import useSWR from "swr";
import { apiBaseURL } from "../api/constants";
import format from "date-fns/format";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const TransactionsScreen = ({ navigation }) => {
  const theme = useTheme();
  const { data, error } = useSWR(apiBaseURL + "/api/transactions");

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const TransactionsList = () => {
    if (error) {
      console.log(error);
      return (
        <Text status="danger">
          Some error occured when trying to fetch list of transactions.
        </Text>
      );
    }
    if (!data) return <Spinner />;
    return data.map((row) => {
      return <Section key={row._id} row={row} />;
    });
  };

  const Section = ({ row }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            marginTop: 24,
          }}
        >
          <Text style={{ color: theme["text-basic-color"] }}>
            {format(new Date(row.meta.date), "d MMMM")}
          </Text>
          <Text style={{ color: theme["text-hint-color"] }} category="p2">
            {row.meta.sum} KP
          </Text>
        </View>
        <List data={row.transactions} renderItem={TransactionItem} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Transactions"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{
          padding: 16,
          flex: 1,
          backgroundColor: theme["background-basic-color-4"],
        }}
      >
        <TransactionsList />
      </Layout>
    </SafeAreaView>
  );
};
