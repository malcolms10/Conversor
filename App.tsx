import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { SplashScreen } from 'expo-router';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import logo from './assets/dolar.jpeg'

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import React, { useEffect, useState } from 'react';

export default function App() {

  const day = moment().format('DD');
  const month = moment().format('MMMM')
  const year = moment().year()
  const currentTime = moment().format('HH:mm');

  const [index,setIndex] = useState(true)
  const [dolar,setDolar] = useState(0)
  const [kwanza,setKwanza] = useState(0)

  const [hasLoadedFonts] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  })

  if (!hasLoadedFonts) {
    return <SplashScreen/>
  }

  function handleClick() {
    setIndex(false)
    setKwanza(dolar*836.40)
    setDolar(0)
  }

  function handleBack() {
    setIndex(true)
  }

  const handleInputChange = (text) => {
    setDolar(text);
  };

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='flex-row mt-16 ml-4 mr-1 items-center'>
        <Image source={logo} className='h-28 w-28' />
        <View className='space-y-3 space-x-1'>
          <Text className='ml-2 text-black'>{day} <Text>de</Text> {month} <Text>de</Text> {year} | {currentTime} Luanda</Text>
          <Text className='text-gray-500'>Taxa de cambio disponível pelo BaiDirecto</Text>
        </View>
      </View>
      { index ? 
          (<View className='mt-8 ml-8 space-y-6'>
            <Text>Dólar:</Text>
            <TextInput className='border border-slate-500 rounded-sm w-28 h-10 pl-2' placeholder='$0.00' value={dolar} onChangeText={handleInputChange} keyboardType="numeric"/>
            <TouchableOpacity onPress={()=>handleClick()} className='bg-gray-500 rounded-md p-4 w-36 items-center space-x-2 flex-row'>
              <Fontisto name="arrow-swap" size={24} color="white" />
              <Text className='text-white'>Converter</Text>
            </TouchableOpacity>
          </View>) : 
        (<View className='mt-8 ml-8 space-y-6'>
          <TouchableOpacity onPress={()=>handleBack()} className='bg-gray-500 rounded-md p-4 w-36 items-center space-x-2 flex-row'>
            <Ionicons name="ios-arrow-back" size={24} color="white" />            
            <Text className='text-white'>Voltar</Text>
          </TouchableOpacity>
          <Text>O Resultado do cálculo é</Text>
          <Text className='text-6xl text-green-400'>KZ {kwanza}</Text>
          <Text>Cotação do dólar: $1,00 = kz836.40</Text>
        </View>)
      }
      <StatusBar style="auto" />
    </View>
  );
}

