<template>
  <div class="todos_list">
    <!-- <h1>Todos List Component</h1> -->

    <section>
      <div v-for="todo in todos" :key="todo.id" class="todos_list_item">
        <h3 class="todo_title">{{ todo.title }}</h3>
        <p class="todo_description">{{ todo.description }}</p>
        <div class="todo_date_tags">
          <p>{{ date }}</p>
          <div class="todo_tags_container">
            <div
              v-for="(tag, index) in todo.tags"
              :key="index"
              class="todo_tag"
            >
              <span>{{ tag }}</span>
            </div>
          </div>
        </div>
        <div class="todo_actions">
          <button
            class="todo_update"
            @click="() => handleUpdate(todo.id)"
          ></button>
          <button
            class="todo_delete"
            @click="() => handleOpenDeleteModel(todo.id)"
          ></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "TodosList",
  data() {
    return {
      date: new Date()
        .toLocaleString()
        .substring(0, new Date().toLocaleString().indexOf(",")),
    };
  },

  props: {
    todos: {
      type: Array,
      required: true,
    },
    handleUpdate: {
      type: Function,
      required: true,
    },
    handleOpenDeleteModel: {
      type: Function,
      required: true,
    },
  },
};
</script>
