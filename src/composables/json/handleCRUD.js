import axios from "axios";

// Using JSONPlaceholder for demo, replace with your JSON file URL
// const API_BASE = 'https://jsonplaceholder.typicode.com';
const API_BASE = "http://localhost:3000";
// For local JSON file, you'd use: const API_BASE = 'http://localhost:3000';

// to know in netlify app or local
const inProduction = window.location.href.indexOf("netlify");

// CREATE - Add new todo
async function addTodo(
  todoItem,
  getNewTodos,
  handelReset,
  handleCloseAddModel,
  maxId
) {
  try {
    // to generate unique ID for new todo depending on todos count
    // const todosCount = await getTodosCount();

    const todoItemObj = {
      ...todoItem,
      // id: Date.now(), // Generate unique ID
      // id: todosCount + 1,
      id: `${maxId + 1}`,
      tags: todoItem.tags.split(" "),
    };

    if (
      todoItemObj.title.length === 0 ||
      todoItemObj.description.length === 0 ||
      todoItemObj.tags.length === 0
    ) {
      alert("Please fill all fields");
    } else {
      await axios.post(`${API_BASE}/todos`, todoItemObj);
      alert("Todo added successfully!");

      // to get all todos again with call api
      // getNewTodos();

      // to get all todos again with add new todo to previous todos array
      getNewTodos(todoItemObj);
      handelReset();
      handleCloseAddModel();
    }
  } catch (error) {
    // console.error("Error adding todo:", error);
    alert("Error adding todo", error);
  }
}

// READ - Fetch all todos
async function getTodos() {
  try {
    const response = await axios.get(`${API_BASE}/todos`);
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify(response.data));
    }
    if (inProduction > 0) {
      return JSON.parse(localStorage.getItem("todos"));
    }
    return response.data;
  } catch (error) {
    // console.error("Error get todos:", error);
    alert("Error get todos", error);
  }
}

// UPDATE - Edit todo
async function updateTodo(
  todoItem,
  updateTodos,
  handelReset,
  handleCloseEditModel
) {
  try {
    const todoItemObj = {
      ...todoItem,
      tags: todoItem.tags.split(" "),
    };
    await axios.put(`${API_BASE}/todos/${todoItemObj.id}`, todoItemObj);

    alert("Todo updated successfully!");
    updateTodos(todoItemObj);
    handelReset();
    handleCloseEditModel();
  } catch (error) {
    // console.error("Error updating todo:", error);
    alert("Error updating todo", error);
  }
}

// DELETE - Remove todo
async function deleteTodo(id, handleDeleteTodos) {
  // handle confirm before delete (yes | no), like alerts ui
  // if (!confirm("Are you sure you want to delete this todo?")) {
  //   return;
  // }

  try {
    await axios.delete(`${API_BASE}/todos/${id}`);
    alert("Todo deleted successfully!");
    handleDeleteTodos();
  } catch (error) {
    // console.error("Error deleting todo:", error);
    alert("Error deleting todo", error);
  }
}

// READ - Fetch all todos length
async function getTodosCount() {
  try {
    const response = await axios.get(`${API_BASE}/todos`);
    return response.data.length;
  } catch (error) {
    // console.error("Error get todos length:", error);
    alert("Error get todos length", error);
  }
}

export { addTodo, getTodos, updateTodo, deleteTodo, getTodosCount };
