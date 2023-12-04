import React from 'react'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const DayDetailsScreen = () => {
  return (
    <View> 
      <Stack.Screen options={{title: 'Day 1'}} />
    <div>DayDetailsScreen</div> 
    </View>
  )
}

export default DayDetailsScreen