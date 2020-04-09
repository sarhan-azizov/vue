<template>
  <div class="home">
    <Todo />
  </div>
</template>

<script>

import Components from '@/components/index';

const { Todo } = Components;

export default {
  name: 'Home',
  components: {
    Todo,
  },
};
</script>
