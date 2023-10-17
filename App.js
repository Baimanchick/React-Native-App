import { StatusBar } from "react-native";
import { Home } from "./screens/Home";
import styled from "styled-components/native";

const PostMain = styled.View`
  margin-top: 15px;
`;

export default function App() {
  return (
    <PostMain>
      <Home />
      <StatusBar theme="auto" />
    </PostMain>
  );
}
