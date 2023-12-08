import { Link, Stack } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const onboardingSteps = [
  {
    icon: "people-arrows",
    title: "Track every transaction",
    description:
      " Monitor your spending and contribution, ensuring every penny aligns with your familys aspirations",
  },
  {
    icon: "people-arrows",
    title: "Track every transaction",
    description:
      " Monitor your spending and contribution, ensuring every penny aligns with your familys aspirations",
  },
  {
    icon: "people-arrows",
    title: "Track every transaction",
    description:
      " Monitor your spending and contribution, ensuring every penny aligns with your familys aspirations",
  },
];

const onboarding = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.pageContent}>
        <FontAwesome5
          style={styles.image}
          name="people-arrows"
          size={100}
          color="#CEF202"
        />

        <View style={styles.footer}>
          <Text style={styles.title}> Track every transaction</Text>
          <Text style={styles.description}>
            Monitor your spending and contribution, ensuring every penny aligns
            with your family's aspirations
          </Text>
          <View style={styles.buttonsRow}>
            <Text style={styles.buttonText}>Skip</Text>
            <Link href="/day2/onboarding2" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141A",
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },

  title: {
    color: "#FDFDFD",
    fontSize: 50,
    fontFamily: "InterBlack",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Inter",
    lineHeight: 28,
  },
  image: {
    alignSelf: "center",
    margin: 20,
  },
  footer: {
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#302E38",
    borderRadius: 50,
    flex: 1,
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  buttonText: {
    alignSelf: "center",
    color: "#FDFDFD",
    fontFamily: "InterSemi",
    fontSize: 16,
    padding: 16,
    paddingHorizontal: 25,
  },
});
