import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { debounce } from './utils';

const SearchBar = ({ onSearch }) => {
 const [searchQuery, setSearchQuery] = useState('');

 const debouncedSearch = debounce(onSearch, 4000);

 const handleSearch = () => {
  if (searchQuery) {
     debouncedSearch(searchQuery);
  }
 };

 return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />

        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch();
          }}
        />
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
 },
 searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
 },
 input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
 },
});

export default SearchBar;
