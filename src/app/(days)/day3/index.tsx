import React from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";

const description = `
# Markdown 
Integrate Markdown content in **React native**
`
const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Screen options={{ title: "Day 3: Markdown Maker" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day3/editor" asChild >
      <Button title="Go to Editor" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
