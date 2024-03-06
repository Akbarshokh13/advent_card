import React from "react";
import { Button, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";

const description = `
# Todo app with React Context
Ultimate Todo app with React Context

`;
const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 7: Todo" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day7/todo" asChild>
        <Button title="Go to TODO" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
