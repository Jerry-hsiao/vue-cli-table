<template>
  <div class="container">
    <div class="card-body">
      <div class="dataTables_wrapper dt-bootstrap4">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="dataTables_length" style="text-align:left;">
              <label>
                Show
                <select
                  name="dataTable_length"
                  aria-controls="dataTable"
                  class="custom-select custom-select-sm form-control form-control-sm"
                  v-model="onePageSize"
                >
                  <option v-for="showItem in showItems" :value="showItem">{{
                    showItem
                  }}</option>
                </select>
                entries
              </label>
            </div>
          </div>
          <!-- Search -->
          <div class="col-sm-12 col-md-6">
            <div class="dataTables_filter">
              <div class="searchInput">
                <label>
                  Search:
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="Enter No"
                    aria-controls="dataTable"
                    v-model="searchNo"
                    style="width:130px"
                    @input="seatchInput"
                  />
                </label>
                <label>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="Enter Equip"
                    aria-controls="dataTable"
                    v-model="searchEquip"
                    style="width:130px"
                    @input="seatchInput"
                  />
                </label>
              </div>

              <button class="btn btn-primary" @click="searchEquips">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="row">
        <div class="col-sm-12">
          <table
            class="table table-bordered dataTable"
            width="100%"
            cellspacing="0"
            role="grid"
            aria-describedby="dataTable_info"
            style="width: 100%;"
          >
            <thead>
              <tr>
                <th scope="col" class="table-primary">No</th>
                <th scope="col" class="table-primary">Equip</th>
                <th scope="col" class="table-primary">Part</th>
                <th scope="col" class="table-primary">Price</th>
                <th scope="col" class="table-primary" style="width:200px">
                  Control
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(equip, index) in equips.slice(startIndex, endIndex + 1)"
                :key="index"
              >
                <td>{{ equip.no }}</td>
                <td>{{ equip.equip }}</td>
                <td>{{ equip.part }}</td>
                <td>{{ equip.price }}</td>
                <td>
                  <!-- EditButton -->
                  <button
                    class="btn btn-primary"
                    style="margin-right:10px"
                    @click.prevent="editEquip(equip.no)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <!-- DeleteButton -->
                  <button
                    class="btn btn-primary"
                    @click.prevent="deleteEquip(equip.no)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Pagination -->
      <nav aria-label="Page navigation example">
        <div class="row">
          <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" role="status" aria-live="polite">
              Showing {{ startIndex + 1 }} to {{ endIndex + 1 }} of
              {{ equips.length }} entries
            </div>
          </div>
          <div class="col-sm-12 col-md-7">
            <div
              class="dataTables_paginate paging_simple_numbers"
              style="justify-content:flex-end; display:flex;"
            >
              <ul class="pagination">
                <li class="paginate_button page-item previous">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click="previousPage"
                  >
                    <span aria-hidden="true">Previous</span>
                  </a>
                </li>
                <li
                  class="paginate_button page-item"
                  :class="[pageIndex == pageCurrent + 1 ? 'active' : '']"
                  v-for="(pageIndex, index) in totalPages"
                  :key="index"
                >
                  <a class="page-link" href="#" @click="changePages(index)">{{
                    pageIndex
                  }}</a>
                </li>
                <li class="paginate_button page-item next">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    @click="nextPage"
                  >
                    <span aria-hidden="true">Next</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("getEquips");
    // this.$store.dispatch("loadEquips");
  },
  data() {
    return {
      searchNo: "",
      searchEquip: "",
    };
  },
  computed: {
    onePageSize: {
      get() {
        return this.$store.state.onePageSize;
      },
      set(value) {
        return this.$store.commit("updateOnePageSize", value);
      },
    },
    ...mapState(["equips", "tmpData", "pageCurrent", "showItems", "isShow"]),
    ...mapGetters(["startIndex", "endIndex", "totalPages"]),
  },
  methods: {
    ...mapMutations([
      "changePages",
      "nextPage",
      "previousPage",
      "isStartPage",
      "isEndPage",
    ]),
    ...mapActions(["deleteEquip"]),
    searchEquips(e) {
      this.$store.dispatch("searchEquips", {
        no: this.searchNo,
        equip: this.searchEquip,
      });
    },
    editEquip: function(no) {
      this.$router.push({ name: "Management", params: { no: no } });
    },
    seatchInput() {
      if (this.searchEquip == "" && this.searchNo == "") {
        this.$store.dispatch("getEquips");
      }
    },
  },
};
</script>
<style scoped>
.table {
  margin: 0;
  font-family: Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  line-height: 1.5;
  color: #858796;
  background-color: #fff;
}
.table-primary {
  background-color: #cdd8f6;
}
tbody {
  font-weight: 400;
}
.searchInput {
  display: flex;
  justify-content: flex-end;
}
</style>
