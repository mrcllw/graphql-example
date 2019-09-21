import React, { useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  View,
  Button
} from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const TodosQuery = gql`
  query {
    todos {
      id
      text
    }
  }
`;

const TodosMutation = gql`
  mutation($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

export default function TodoList() {
  const [newTodoText, setNewTodoText] = useState("");
  const { loading, data: todos } = useQuery(TodosQuery);
  const [addTodo] = useMutation(TodosMutation, {
    update(
      cache,
      {
        data: { addTodo }
      }
    ) {
      cache.writeQuery({
        query: TodosQuery,
        data: { todos: todos.todos.concat([addTodo]) }
      });
    }
  });

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={todos && todos.todos}
      renderItem={({ item }) => <Text>{item.text}</Text>}
      ListHeaderComponent={
        loading ? (
          <ActivityIndicator size="large" color="#333" />
        ) : (
          <View>
            <TextInput
              value={newTodoText}
              onChangeText={setNewTodoText}
              placeholder="Write todo name..."
            />
            <Button
              onPress={() => {
                addTodo({ variables: { text: newTodoText } });
                setNewTodoText("");
              }}
              title="ADD TODO"
              color="#333"
            />
          </View>
        )
      }
    />
  );
}
