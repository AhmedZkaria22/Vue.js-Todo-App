<template>
  <div class="app_model">
    <div class="delete_box">
      <p>Are you sure want to delete todo</p>
      <button class="delete_btn" @click="deleteTodos">Delete</button>
      <button class="cancel_btn" @click="handleCloseDeleteModel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModel",
  props: {
    deleteTodos: {
      type: Function,
      required: true,
    },
    handleCloseDeleteModel: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
