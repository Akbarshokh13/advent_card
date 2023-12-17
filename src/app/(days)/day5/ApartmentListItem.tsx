import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const ApartmentListItem = ({ apartment }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: apartment.image }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{apartment.title}</Text>
        <Text style={styles.description}>Stay at this apartment</Text>
        <View style={styles.footer}>
          <Text style={styles.price}> ${apartment.price} night</Text>
          <Text style={styles.price}>
            *{apartment.rating} ({apartment.numberOfStars})
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flexDirection: 'row', 
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontFamily: "InterBold",
    marginBottom: 10,
    fontSize: 16,
  },

  description: {
    color: "gray",
  },

  image: {
    height: 150,
    aspectRatio: 1,
    flexDirection: "row",
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  price: {
    fontFamily: "InterBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});

export default ApartmentListItem;
