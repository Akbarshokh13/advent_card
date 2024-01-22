import React from "react";
import { Button, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";

const description = `
# Todo app
Ultimate Todo app

`;
const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 6: Todo" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day6/todo" asChild>
        <Button title="Go to TODO" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
