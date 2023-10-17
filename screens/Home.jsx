import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StatusBar,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Post } from "../components/Post";

const PostMain = styled.View`
  margin-top: 15px;
`;

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  function getStations() {
    setIsLoading(true);
    axios
      .get("https://652e6b7d0b8d8ddac0b1596c.mockapi.io/Stations")
      .then((response) => {
        setItems(response.data); // Assuming the data is in a 'data' property
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Ошибка при получении статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getStations();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text
          style={{
            marginTop: 15,
          }}
        >
          Загрузка...
        </Text>
      </View>
    );
  }

  return (
    <PostMain>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getStations} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Alert.alert("Баймурат", "Touched")}>
            <Post
              title={item.title}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />

      {/* {[...items, ...items].map((item) => (
        <Post
          title={item.title}
          createdAt={item.createdAt}
          imageUrl={item.imageUrl}
        />
      ))} */}
    </PostMain>
  );
};
