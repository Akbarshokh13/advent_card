import React from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";

const description = `
# AirBNB Map

`
const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Screen options={{ title: "Day 5: Map" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day5/airbnb" asChild >
      <Button title="Go to AirBNB Map" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
