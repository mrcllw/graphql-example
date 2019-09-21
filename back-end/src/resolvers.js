const Todo = require("./Todo");

module.exports = {
  Query: {
    todos: () => Todo.find(),
    todo: (_, { id }) => Todo.findById(id)
  },
  Mutation: {
    addTodo: (_, { text }) => Todo.create({ text })
  }
};
