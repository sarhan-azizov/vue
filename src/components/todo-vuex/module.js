export default {
  state: {
    todos: [],
  },
  mutations: {
    addTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    toggleComplete(store, id) {
      store.todos = store.todos.map((todo) => {
        if (todo.id === id) {
          return ({
            ...todo, completed: !todo.completed,
          });
        }

        return todo;
      });
    },
    delete(store, id) {
      store.todos = store.todos.filter((todo) => todo.id !== id);
    },
  },
  actions: {
    async toggleComplete(ctx, id) {
      const todo = ctx.state.todos.find((item) => item.id);

      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

      ctx.commit('toggleComplete', id);
    },
    async deleteTodo(ctx, id) {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      ctx.commit('delete', id);
    },
    async addTodo(ctx, title) {
      const createdTodo = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          id: Date.now(),
          title,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json());

      ctx.commit('addTodo', createdTodo);
    },
    async fetchTodos(ctx) {
      const todos = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((response) => response.json());

      ctx.commit('addTodos', todos);
    },
  },
  getters: {
    completedTodos({ todos }) {
      return todos.filter((todo) => todo.completed);
    },
    todos: ({ todos }) => todos,
  },
};
