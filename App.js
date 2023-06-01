import {View, Text, FlatList, Image, Pressable, Modal} from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Circle from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Cart from './src/component/cart'
import {sorting} from './src/SortData'

const url = 'https://fakestoreapi.com/products'

const App = () => {
  const [product, setProduct] = useState([])
  const [visible, setVisible] = useState(false)
  const [selected, setSelect] = useState('')

  useEffect(() => {
    fetchApi()
  }, [])
  const fetchApi = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setProduct(data)
  }
  const handleSorting = data => {
    setVisible(!visible)
    setSelect(data)
    switch (data) {
      case 'Low to high':
        const sortedLtH = product.sort((a, b) => a.price - b.price)
        setProduct(sortedLtH)
        break
      case 'High to low':
        const sortHtL = product.sort((a, b) => b.price - a.price)
        setProduct(sortHtL)
        break
      case 'Less than 100':
        const filterProduct = product.filter(item => item.price < 100)
        setProduct(filterProduct)
        break
      case 'Between 100-200':
        const betweenOtT = product.filter(
          item => item.price >= 100 && item.price <= 200,
        )
        const lowtohigh = betweenOtT.sort((a, b) => a.price - b.price)

        setProduct(lowtohigh)
    }
  }
  return (
    <View>
      <View>
        <Pressable
          onPress={() => setVisible(!visible)}
          style={{
            flexDirection: 'row',
            gap: 4,
            borderWidth: 1,
            padding: 5,
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            alignSelf: 'center',
            borderRadius: 4,
          }}>
          <Text>Sort</Text>
          <Icon name='sort' size={20} color='black' />
        </Pressable>
      </View>
      <Modal visible={visible} transparent animationType='slide'>
        <View
          style={{
            backgroundColor: '#fff',
            width: '90%',
            height: 300,
            top: 50,
            elevation: 10,
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <View style={{padding: 10}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '800',
                marginVertical: 10,
              }}>
              Sorting Data
            </Text>
            {sorting.map((item, index) => (
              <Pressable
                onPress={() => handleSorting(item.name)}
                style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
                {selected.includes(item.name) ? (
                  <FontAwesome name='circle' size={24} />
                ) : (
                  <Circle name='circle' size={24} />
                )}
                <Text style={{color: 'black', fontSize: 16}}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={product}
        renderItem={({item}) => <Cart item={item} />}
      />
    </View>
  )
}

export default App
