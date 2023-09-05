import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import tw from 'twrnc'
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import * as Speech from 'expo-speech';

export default function App() {

  const [Word, setWord] = useState(null)
  const [Search, setSearch] = useState('')
  const handleInputChange = (text) => {
    // Update the search term state when the input changes
    setSearch(text);
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    // Fetch data from the Urban Dictionary API using the search term
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${Search}`)
    .then((res) => res.json())
    .then((data) => {
      setWord(data)
    });
  };

  const speak = () => {
    Speech.speak(Search);
  };

  return (
    <View style={tw`bg-[#D56F3E] flex-1`}>
      <View style={tw`mt-20 mx-8`}>
        <Text style={tw`text-4xl text-white`}>Dictionary</Text>
        <View style={tw`flex-row justify-between mt-3`}>
          <TextInput placeholder='....hello....' style={tw`bg-white w-64 h-10 p-2 rounded-lg`} onChangeText={handleInputChange}/>
          <TouchableOpacity onPress={handleSearch}><View style={tw`rounded-lg h-10 p-2 bg-[#070707] justify-center w-22`}><Text style={tw`text-white text-sm`}>Search</Text></View></TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={Word?.[0].meanings}
        keyExtractor= {(item) => item.partOfSpeech}
        renderItem = {({item})=> (
          <View style={tw`w-92 bg-[#070707] h-56 rounded-3xl self-center mt-12`}>
          <View style={tw`mx-5 mt-3 flex flex-row justify-between`}>
            <TouchableOpacity onPress={speak}><Text><Feather name="volume-2" size={28} color="white" /></Text></TouchableOpacity>
            <Text style={tw`text-white text-xl`}>{item.partOfSpeech}</Text>
          </View>
          <Text style={tw`mx-5 text-[#B1C1C0] italic text-xl`}>{Word?.[0].phonetic}</Text>
          <View style={tw`mx-8 w-72 h-24 mt-2 justify-center items-center`}>
            <Text style={tw`text-white text-sm`}>{item.definitions[0].definition}</Text>
          </View>
          <Text style={tw`mx-5 mt-2 text-white text-sm italic`}>{Word?.[0].meanings[0].synonyms[1]} {Word?.[0].meanings[0].synonyms[2]} {Word?.[0].meanings[0].synonyms[3]} {Word?.[0].meanings[0].synonyms[4]}</Text>
        </View>
        )} />
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
