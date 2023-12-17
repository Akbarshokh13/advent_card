import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Stack } from "expo-router";
import apartments from "@assets/data/day5/apartments.json";
import CustomMarker from "@/components/day5/CustomMarker";
import ApartmentListItem from "./ApartmentListItem";
import { useState, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";

export default function airbnb() {
  const [selectedApartment, setSelectedApartment] = useState(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {apartments.map((apartment) => (
          <CustomMarker
            key={apartment.id}
            apartment={apartment}
            onPress={() => setSelectedApartment(apartment)}
          />
        ))}
      </MapView>
      {/* Display selected apartment */}
      {selectedApartment && (
        <View style={{ position: "absolute", bottom: 70, right: 10, left: 10 }}>
          <ApartmentListItem apartment={selectedApartment} />
        </View>
      )}
      <BottomSheet
        // ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>

          <FlatList
            data={apartments}
            renderItem={({ item }) => <ApartmentListItem apartment={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
