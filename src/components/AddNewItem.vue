<template>
  <section class="card-body">
    <form class="form-inline">
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        :placeholder="'Enter No'"
        v-model="equip.no"
        disabled
      />
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        :placeholder="'Enter Equip'"
        v-model="equip.equip"
      />
      <select
        name="part"
        v-model="equip.part"
        class="form-control mb-2 mr-sm-2"
      >
        <option value="" disabled selected>Choose part </option>
        <option v-for="part in parts" :key="part.value">{{
          part.label
        }}</option>
      </select>
      <br />
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        :placeholder="'Enter Price'"
        v-model="equip.price"
      />

      <button
        v-if="!isShow"
        type="submit"
        class="btn btn-primary mb-2"
        @click.prevent="editItem()"
      >
        Sumbit Edit
      </button>
      <button
        v-if="isShow"
        type="submit"
        class="btn btn-primary mb-2"
        @click.prevent="addNewItem()"
      >
        Sumbit New Item
      </button>
    </form>
  </section>
</template>
<script>
//import { addNewData } from "../api/add.js";

export default {
  data() {
    return {
      equip: {
        no: null,
        equip: null,
        part: "",
        price: null,
      },
      parts: [
        { value: "head", label: "Head" },
        { value: "body", label: "Body" },
        { value: "leg", label: "Leg" },
      ],
      isShow: true,
    };
  },
  props: ["no"],
  mounted: function() {
    if (this.no) {
      this.isShow = !this.isShow;
      this.equip.no = this.no;
      this.$store.dispatch("getEquipByNo", this.equip);
    }
  },
  methods: {
    addNewItem() {
      this.$store.dispatch("addNewDatas", this.equip);
      this.$router.push({ name: "List" });
      // addNewData(equip, part, price).then((r) => {
      //   this.$store.commit("SET_EQUIPS", r.data);
      // });
      // this.equip.equip = null;
      // this.equip.part = "";
      // this.equip.price = null;
    },
    editItem() {
      this.$store.dispatch("editEquip", this.equip);
      this.$router.push({ name: "List" });
    },
  },
};
</script>
