import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import equipApi from "../api/equips.js";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    equip: {},
    equips: [],
    tmpData: [],
    onePageSize: 10,
    pageCurrent: 0,
    showItems: [10, 25, 50, 100],
    isShow: false,
  },
  getters: {
    startIndex(state) {
      return state.pageCurrent * state.onePageSize;
    },
    // 資料訖點
    endIndex(state, getters) {
      return getters.startIndex + state.onePageSize - 1;
    },
    // 總共幾頁
    totalPages(state) {
      let result = parseInt(state.equips.length / state.onePageSize);
      if (state.equips.length % state.onePageSize > 0) {
        result++;
      }
      return result;
    },
  },
  mutations: {
    SET_EQUIP(state, equip) {
      state.equip = equip;
    },
    SET_EQUIPS(state, equips) {
      state.equips = equips;
    },
    changePages(state, index) {
      state.pageCurrent = index;
    },
    nextPage(state) {
      state.pageCurrent++;
    },
    previousPage(state) {
      state.pageCurrent--;
    },
    // 是否第一頁
    isStartPage(state) {
      state.pageCurrent == 0;
    },
    // 是否最後一頁
    isEndPage(state) {
      state.pageCurrent == state.totalPages;
    },
    updateOnePageSize(state, value) {
      state.onePageSize = value;
    },
  },
  actions: {
    addNewDatas({ commit }, payload) {
      let { equip, part, price } = payload;
      console.log(payload);
      equipApi.addNewData(equip, part, price).then((r) => {
        commit("SET_EQUIPS", r.data);
        //成功拿到資料後在清空
        payload.equip = null;
        payload.part = "";
        payload.price = null;
      });
    },
    getEquipByNo({ commit }, payload) {
      equipApi.getEquipByNo(payload.no).then((r) => {
        commit("SET_EQUIP", r.data);
        payload.equip = r.data.equip;
        payload.part = r.data.part;
        payload.price = r.data.price;
      });
    },
    getEquips({ commit }) {
      equipApi
        .getEquips()
        .then((r) => r.data)
        .then((equips) => {
          commit("SET_EQUIPS", equips);
        });
    },
    editEquip({ commit }, payload) {
      equipApi
        .editEquip(payload.no, payload.equip, payload.part, payload.price)
        .then((r) => {
          commit("SET_EQUIPS", r.data);
          payload.equip = null;
          payload.part = "";
          payload.price = null;
        });
    },
    deleteEquip({ commit }, payload) {
      equipApi.deleteEquip(payload).then((r) => {
        commit("SET_EQUIPS", r.data);
      });
    },
    searchEquips({ commit }, payload) {
      equipApi.search(payload).then((r) => {
        commit("SET_EQUIPS", r.data);
      });
    },
  },
  modules: {},
});
