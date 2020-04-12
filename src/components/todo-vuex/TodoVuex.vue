<template src="./todo-vuex.html"/>
<style lang="scss" src="./todo-vuex.scss"/>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TodoVuex',
  data() {
    return {
      filter: 'all',
    };
  },
  created() {
    const initialFilter = window.localStorage.getItem('@VueTodoMVCVuex');

    if (initialFilter) {
      try {
        const { filter } = JSON.parse(initialFilter);
        this.filter = filter;
      } catch (e) {
        console.error(e);
      }
    }
  },
  watch: {
    filter(val) {
      window.localStorage.setItem('@VueTodoMVCVuex', JSON.stringify({ filter: val }));
    },
  },
  mounted() {
    this.$store.dispatch('fetchTodos');
  },
  computed: {
    ...mapGetters(['completedTodos', 'todos']),
    todoAmount() {
      return this.filteredTodos.length;
    },
    filteredTodos() {
      switch (this.filter) {
        case 'completed': return this.todos.filter((todo) => todo.completed);
        case 'active': return this.todos.filter((todo) => !todo.completed);
        default: return this.todos;
      }
    },
  },
  methods: {
    ...mapActions(['toggleComplete', 'deleteTodo']),
    handleAddTodo(e) {
      const todoName = e.target.value;

      if (todoName) {
        this.$store.dispatch('addTodo', todoName);
      }

      e.target.value = '';
      e.target.focus();
    },
    handleFilterTodos(type) {
      this.filter = type;
    },
  },
};
</script>
