<template>
  <div class="container">
    <h2 style="margin-bottom:15px">
      {{ isEdit ? "Edit" : "Add" }}
    </h2>
    <AddNewItem :no="this.$route.params.no" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddNewItem from "../components/AddNewItem.vue";
export default {
  components: {
    AddNewItem,
  },
  computed: {
    ...mapState(["equip"]),
    isEdit: function() {
      return this.$route.params.no != null;
    },
  },
};
</script>
