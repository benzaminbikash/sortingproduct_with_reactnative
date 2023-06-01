import {View, Text, Image, Pressable} from 'react-native'
import React from 'react'

const Cart = ({item}) => {
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: '#fff',
        elevation: 10,
        flexDirection: 'row',
      }}>
      <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
      <View style={{marginLeft: 10, marginTop: 4}}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>
          {item.title.length > 35
            ? item.title.substring(0, 35) + '...'
            : item.title}
        </Text>
        <Text style={{width: 280}}>
          {item.description.length > 100
            ? item.description.substring(0, 60)
            : item.description}
        </Text>
        <Text style={{fontWeight: '900', fontSize: 16}}>Rs{item.price}</Text>
      </View>
    </View>
  )
}

export default Cart
