import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";

const template = `# Markdown Editor

**Welcome!**
`;

const EditorScreen = () => {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState("edit");

  return (
    <View style={styles.page}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setTab("edit")}
          style={[
            styles.tab,
            { borderColor: tab === "edit" ? "#D2691E" : "gray" },
          ]}
        >
          <Text style={styles.tabText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("preview")}
          style={[
            styles.tab,
            { borderColor: tab === "preview" ? "#D2691E" : "gray" },
          ]}
        >
          <Text style={styles.tabText}>Preview</Text>
        </TouchableOpacity>
      </View>

      {tab === "edit" ? (
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />
      ) : (
        <MarkdownDisplay>{content}</MarkdownDisplay>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "whitesmoke",
    flex: 1,
    padding: 10,
    borderRadius: 10
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
    paddingTop: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },

  tabText: {
    fontFamily: "InterBold",
  },
});
export default EditorScreen;
