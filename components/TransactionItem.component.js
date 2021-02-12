import React from "react";
import { Icon, ListItem, Text } from "@ui-kitten/components";

export const TransactionItem = ({ item }) => {
  return (
    <ListItem
      title={`${item.reason.name}`}
      description={`${item.createdAt}`}
      accessoryLeft={(props) => <Icon {...props} name={item.reason.icon} />}
      accessoryRight={() => <Text>{item.amount} KP</Text>}
    />
  );
};
