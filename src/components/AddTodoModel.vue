<template>
  <div class="app_model">
    <div class="add_todo_model">
      <h2>Add Todo Component</h2>
      <button class="close_btn" @click="handleCloseAddModel">x</button>
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
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import { addTodo } from "@/composables/json/handleCRUD";
export default {
  name: "AddTodoModel",
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
    getNewTodos: {
      type: Function,
      required: true,
    },
    handleCloseAddModel: {
      type: Function,
      required: true,
    },
    maxId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handelInsert(e) {
      e.preventDefault();
      addTodo(
        this.todoItem,
        this.getNewTodos,
        this.handelReset,
        this.handleCloseAddModel,
        this.maxId
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
};
</script>

<style lang="scss" scoped></style>
