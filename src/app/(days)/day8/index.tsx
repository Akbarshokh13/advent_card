import React from "react";
import { Button, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";

const description = `
# Weather App
 Fetch weather data and display it 

`;
const DayDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 8: Weather app" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day8/weather" asChild>
        <Button title="Go to Weather" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
