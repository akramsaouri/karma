import React from "react";
import { Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useRef } from "react";

export const ReasonCard = ({
  _id,
  name,
  icon,
  iconFill,
  onSelect,
  ...props
}) => {
  const iconRef = useRef();

  return (
    <Card
      {...props}
      style={styles.container}
      onPress={() => {
        iconRef.current.startAnimation();
        onSelect(_id);
      }}
    >
      <Icon
        style={styles.icon}
        ref={iconRef}
        animation="pulse"
        fill={iconFill}
        name={icon}
      />
      <Text style={styles.text} category="p2">
        {name}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 8,
    width: 70,
    height: 70,
  },
  text: {
    textAlign: "center",
    color: "#8994a3",
  },
});
