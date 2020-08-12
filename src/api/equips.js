import http from "./http.js";

const equipApi = {
  getEquips: () => http.get("equips"),
  getEquipByNo: (no) => http.get(`equips/${no}`),
  addNewData: (equip, part, price) =>
    http.post(`equips`, { equip, part, price }),
  editEquip: (no, equip, part, price) =>
    http.put(`equips/${no}`, { no, equip, part, price }),
  deleteEquip: (no) => http.delete(`equips/${no}`),
  search: (param) => http.get(`equips?no=${param.no}&equip=${param.equip}`),
};

export default equipApi;
