import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styled from "styled-components/native";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const PostMain = styled.View`
  padding: 20px;
`;

const FullPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://652e6b7d0b8d8ddac0b1596c.mockapi.io/Stations/2")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Ошибка при получении статью");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    <>
      <PostMain>
        <PostImage
          source={{
            uri: data.imageUrl,
          }}
        />
        <PostText>{data.text}</PostText>
      </PostMain>
    </>
  );
};

export default FullPost;
