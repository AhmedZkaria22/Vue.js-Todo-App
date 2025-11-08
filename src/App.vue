<template>
  <div id="app">
    <div class="app_title">
      <p class="h1">
        <img alt="Vue logo" src="./assets/logo.png" />
        .js
      </p>
      <h1>Todo App</h1>
    </div>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <add-sort-bar
      :handleSort="handleSort"
      :handleOpenAddModel="handleOpenAddModel"
    ></add-sort-bar>

    <todos-list
      :todos="todos"
      :handleUpdate="handleUpdate"
      :handleOpenDeleteModel="handleOpenDeleteModel"
    ></todos-list>

    <add-todo-model
      v-if="addModelVisible"
      :getNewTodos="getNewTodos"
      :handleCloseAddModel="handleCloseAddModel"
      :maxId="maxId"
    ></add-todo-model>

    <update-todo-model
      v-if="editModelVisible"
      :currentTodo="currentTodo"
      :updateTodos="updateTodos"
      :handleCloseEditModel="handleCloseEditModel"
    ></update-todo-model>

    <delete-model
      v-if="deleteModelVisible"
      :deleteTodos="deleteTodos"
      :handleCloseDeleteModel="handleCloseDeleteModel"
    ></delete-model>
  </div>
</template>

<script>
import TodosList from "@/components/TodosList.vue";
import AddTodoModel from "@/components/AddTodoModel.vue";
import UpdateTodoModel from "./components/UpdateTodoModel.vue";
import DeleteModel from "./components/DeleteModel.vue";
import AddSortBar from "./components/AddSortBar.vue";
import { deleteTodo, getTodos } from "./composables/json/handleCRUD";

export default {
  name: "App",
  components: {
    TodosList,
    AddTodoModel,
    UpdateTodoModel,
    DeleteModel,
    AddSortBar,
  },

  data() {
    return {
      todos: getTodos(),
      date: new Date()
        .toLocaleString()
        .substring(0, new Date().toLocaleString().indexOf(",")),
      currentTodo: {
        title: "",
        description: "",
        tags: [],
      },
      deleteModelVisible: false,
      deletedTodoId: null,
      addModelVisible: false,
      editModelVisible: false,
      maxId: 0,
    };
  },
  async mounted() {
    this.todos = await getTodos();
  },
  methods: {
    async getTodo(id) {
      return this.todos.find((todo) => todo.id === id);
    },
    async getMaxId() {
      this.maxId = Math.max(
        ...this.todos.map((todo) => {
          return parseInt(todo["id"]);
        })
      );
    },
    async getNewTodos(newTodo) {
      // to get all todos again with call api
      // this.todos = await getTodos();

      // to get all todos again with add new todo to previous todos array
      this.todos = [...this.todos, newTodo];
    },

    async updateTodos(newTodo) {
      this.todos = [
        ...this.todos.filter((todo) => todo.id !== newTodo.id),
        newTodo,
      ].sort((a, b) => a.id - b.id);
    },
    handleUpdate(id) {
      this.currentTodo = this.todos.find((todo) => todo.id === id);
      this.handleOpenEditModel();
    },

    async handleDeleteTodos() {
      this.todos = [
        ...this.todos.filter((todo) => todo.id !== this.deletedTodoId),
      ];

      // const mappedTodos = [...this.todos]
      //   .sort((a, b) => parseInt(a["id"]) - parseInt(b["id"]))
      //   .map((todo, index) => {
      //     return { ...todo, id: `${index + 1}` };
      //   });

      // this.todos = [...mappedTodos];
      // console.log("mappedTodos", mappedTodos);

      this.handleCloseDeleteModel();
    },
    async deleteTodos() {
      deleteTodo(this.deletedTodoId, this.handleDeleteTodos);
    },
    handleOpenDeleteModel(id) {
      this.deleteModelVisible = true;
      this.deletedTodoId = id;
    },
    handleCloseDeleteModel() {
      this.deleteModelVisible = false;
      this.deletedTodoId = null;
    },
    handleOpenAddModel() {
      this.getMaxId();
      this.addModelVisible = true;
    },
    handleCloseAddModel() {
      this.addModelVisible = false;
    },
    handleOpenEditModel() {
      this.editModelVisible = true;
    },
    handleCloseEditModel() {
      this.editModelVisible = false;
    },

    handleSort(sortType, sortAttr) {
      if (sortType === true) {
        // Ascending : 1,2,3   |   a,b,c,z
        switch (sortAttr) {
          case "id":
            this.todos.sort((a, b) => parseInt(a["id"]) - parseInt(b["id"]));
            break;
          case "title":
            this.todos.sort(
              (a, b) =>
                a["title"][0].toLowerCase().codePointAt() -
                b["title"][0].toLowerCase().codePointAt()
            );
            break;
          case "description":
            this.todos.sort(
              (a, b) => a["description"].length - b["description"].length
            );
            break;
          case "tags":
            this.todos.sort((a, b) => a["tags"].length - b["tags"].length);
            break;
          default:
            this.todos.sort((a, b) => parseInt(a["id"]) - parseInt(b["id"]));
        }
      } else {
        // Descending : 3,2,1   |   z,c,b,a
        switch (sortAttr) {
          case "id":
            this.todos.sort((a, b) => parseInt(b["id"]) - parseInt(a["id"]));
            break;
          case "title":
            this.todos.sort(
              (a, b) =>
                b["title"][0].toLowerCase().codePointAt() -
                a["title"][0].toLowerCase().codePointAt()
            );
            break;
          case "description":
            this.todos.sort(
              (a, b) => b["description"].length - a["description"].length
            );
            break;
          case "tags":
            this.todos.sort((a, b) => b["tags"].length - a["tags"].length);
            break;
          default:
            this.todos.sort((a, b) => parseInt(b["id"]) - parseInt(a["id"]));
        }
      }
    },
  },
  watch: {
    todosCount() {
      this.todos = getTodos();
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fbfdfd;
}
.app_title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem 2.5rem;
  padding: 3rem 0rem 4.5rem;
}

.app_title h1,
.app_title p.h1 {
  color: #00b782;
  font-size: 4rem;
  font-weight: bold !important;
  text-shadow: 1px 1px 3.8px rgb(47 72 94 / 50%);
  letter-spacing: 1px;
}

.app_title p.h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app_title p img {
  width: 5rem;
  height: 5rem;
  display: block;
  position: relative;
  right: -25px;
}
</style>
