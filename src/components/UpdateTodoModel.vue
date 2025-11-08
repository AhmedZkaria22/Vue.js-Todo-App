<template>
  <div class="app_model">
    <div class="update_todo_model">
      <h2>Update Todo Component</h2>
      <button class="close_btn" @click="handleCloseEditModel">x</button>
      <form id="form" action="" v-on:submit="(e) => handelInsert(e)">
        <div>
          <label>Title</label>
          <input
            type="text"
            id="title"
            v-model="todoItem.title"
            placeholder="type todo title"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            id="description"
            v-model="todoItem.description"
            placeholder="type todo description"
            rows="3"
          >
          </textarea>
        </div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            id="tags"
            v-model="todoItem.tags"
            placeholder="type todo tags -> 'tag1 tag2 tag3'"
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import { updateTodo } from "@/composables/json/handleCRUD";
export default {
  name: "UpdateTodo",
  data() {
    return {
      todoItem: {
        title: "",
        description: "",
        tags: [],
      },
    };
  },
  props: {
    currentTodo: {
      type: Object,
      required: true,
    },
    updateTodos: {
      type: Function,
      required: true,
    },
    handleCloseEditModel: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handelInsert(e) {
      e.preventDefault();
      updateTodo(
        this.todoItem,
        this.updateTodos,
        this.handelReset,
        this.handleCloseEditModel
      );
    },

    handelReset() {
      this.todoItem = {
        title: "",
        description: "",
        tags: [],
      };
    },
  },
  watch: {
    currentTodo: {
      immediate: true,
      handler(newTodo) {
        this.todoItem = { ...newTodo };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
