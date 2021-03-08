import React from "react";
import { Icon, ListItem, Text } from "@ui-kitten/components";
import format from "date-fns/format";

export const TransactionItem = ({ item, showFullDate }) => {
  const formatStr = showFullDate ? "d MMMM" : "k:m";
  return (
    <ListItem
      title={`${item.reason.name}`}
      description={`${format(new Date(item.createdAt), formatStr)}`}
      accessoryLeft={(props) => <Icon {...props} name={item.reason.icon} />}
      accessoryRight={() => <Text>{item.amount} KP</Text>}
    />
  );
};
