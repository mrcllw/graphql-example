import React from "react";
import { StyleSheet, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./src/services/apollo";

import TodoList from "./src/components/TodoList";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <View style={styles.container}>
        <TodoList />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
