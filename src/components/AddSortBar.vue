<template>
  <div class="add_sort_bar">
    <div class="add_container">
      <button class="add_btn" @click="handleOpenAddModel">Add Todo</button>
    </div>

    <div class="sort_container">
      <div class="sort_box">
        <span>ASC</span>
        <label class="toggle-switch">
          <input type="checkbox" v-model="sortType" />
          <span class="slider round"></span>
        </label>
      </div>

      <div class="sort_radios">
        <div
          v-for="option in ['id', 'title', 'description', 'tags']"
          :key="option"
          class="sort_radio_item"
        >
          <input
            type="radio"
            :id="option"
            :value="option"
            v-model="selectedRadio"
          />
          <label :for="option"> {{ option }} </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSortBar",
  data() {
    return {
      selectedRadio: "id",
      sortType: true,
    };
  },
  props: {
    handleSort: {
      type: Function,
      required: true,
    },
    handleOpenAddModel: {
      type: Function,
      required: true,
    },
  },
  watch: {
    sortType: function () {
      // this.sortType = newVal;
      // console.log("sort-watch", newVal, this.sortType, this.selectedRadio);
      this.handleSort(this.sortType, this.selectedRadio);
    },
    selectedRadio: function () {
      // console.log("sort-watch", newVal, this.sortType, this.selectedRadio);
      this.handleSort(this.sortType, this.selectedRadio);
    },
  },
};
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 22px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #a0b9cf;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 4px;
  background-color: #fbfdfd;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #00b782;
}

input:focus + .slider {
  box-shadow: 0 0 1px #00b782;
}

input:checked + .slider:before {
  -webkit-transform: translateX(22px);
  -ms-transform: translateX(22px);
  transform: translateX(22px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
