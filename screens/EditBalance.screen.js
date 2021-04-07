import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  Card,
  useTheme,
} from "@ui-kitten/components";
import useSWR, { mutate } from "swr";

import { addReasonId, apiBaseURL } from "../api/constants";
import { ReasonCard } from "../components/ReasonCard.component";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const InputAccessory = (props) => (
  <Text
    {...props}
    appearance="hint"
    category="c1"
    style={{ alignSelf: "center" }}
  >
    (KP)
  </Text>
);

export const EditBalanceScreen = ({ navigation, route }) => {
  const [value, setValue] = useState(20);
  const [step, setStep] = useState("form"); // form | reason
  const { operation } = route.params;
  const [selectedReason, setSelectedReason] = useState(
    operation === "ADD" ? addReasonId : null
  );
  const theme = useTheme();
  const { data, error } = useSWR(apiBaseURL + "/api/reasons");
  const [mutateState, setMutateState] = useState("idle");

  const navigateBack = () => {
    if (step === "form") {
      navigation.goBack();
    }
    if (step === "reason") {
      setStep("form");
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const isValueValid = () => !!value && value >= 1;

  const captionProps = () => {
    if (!isValueValid()) {
      return {
        caption: "Minimum amount is 1kp",
        captionIcon: AlertIcon,
        status: "danger",
      };
    }
  };

  const handleChangeText = (value) => {
    setValue(value);
  };

  const submitBalanceForm = () => {
    if (isValueValid()) {
      if (operation === "ADD") {
        submit();
      }
      if (operation === "SUB") {
        setStep("reason");
      }
    }
  };

  const submitReasonForm = () => {
    if (!!selectedReason) {
      submit();
    }
  };

  const submit = async () => {
    const body = {
      amount: value,
      type: operation.toLowerCase(),
      reason: selectedReason,
    };
    try {
      setMutateState("loading");
      const result = await fetch(apiBaseURL + "/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
      if (result.errors) {
        throw new Error(result);
      }
      mutate(apiBaseURL + "/api/balance");
      mutate(apiBaseURL + "/api/transactions");
      navigation.navigate("Home");
    } catch (error) {
      setMutateState("error");
    }
  };

  const ReasonsList = () => {
    if (error) {
      return (
        <Text status="danger">
          Some error occured when trying to fetch list of reasons.
        </Text>
      );
    }
    if (!data) return <Spinner />;
    return data.map((reason) => (
      <ReasonCard
        key={reason._id}
        {...reason}
        iconFill={
          selectedReason === reason._id
            ? theme["color-info-500"]
            : theme["color-info-300"]
        }
        selected={selectedReason === reason._id}
        onSelect={setSelectedReason}
      />
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Edit Balance"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      {mutateState === "error" && (
        <Card status="danger">
          <Text category="c1" status="danger">
            Something went wrong when trying to edit the balance
          </Text>
        </Card>
      )}
      {step === "form" && (
        <Layout
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Input
            keyboardType="numeric"
            autoFocus
            value={value.toString()}
            label="Amount"
            placeholder="Place your amount"
            onChangeText={handleChangeText}
            accessoryRight={InputAccessory}
            {...captionProps()}
          />
          <Button
            style={{ width: "100%", margin: 30 }}
            disabled={!isValueValid() || mutateState === "loading"}
            onPress={submitBalanceForm}
          >
            {operation === "ADD" ? "Save amount" : "Pick reason"}
          </Button>
        </Layout>
      )}
      {step === "reason" && (
        <Layout style={{ flex: 1 }} level="4">
          <Text
            category="h5"
            style={{
              textAlign: "center",
              paddingVertical: 20,
              color: theme["text-hint-color"],
            }}
          >
            Reason for deduction
          </Text>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            level="4"
          >
            <ReasonsList />
          </Layout>
          <Layout
            style={{ flex: 1, justifyContent: "flex-end", padding: 30 }}
            level="4"
          >
            <Button
              disabled={!selectedReason || mutateState === "loading"}
              onPress={submitReasonForm}
            >
              Save amount
            </Button>
          </Layout>
        </Layout>
      )}
    </SafeAreaView>
  );
};
