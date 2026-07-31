"use strict";

const STORAGE_KEY = "kitchen-os-v4.1:101:cold:weekly";

// The item code stays in data for stable identification, but is intentionally
// never rendered in the interface.
const ITEMS = [
  [1, "CKMM000002", "舒肥章魚 KG", "Kg / 公斤"],
  [2, "CKH000011", "蒔蘿油 200G/BAG", "Bag / 袋"],
  [3, "CKH000010", "雞肝慕斯 350G/BAG", "Bag / 袋"],
  [4, "CKH000007", "焦化洋蔥泥-200G/BAG", "Bag / 袋"],
  [5, "CKB000053", "酸種麵包切片 10片/包", "Bag / 袋"],
  [6, "CKD000012", "草莓醬 200G/BAG", "Bag / 袋"],
  [7, "CKC000004", "番茄沙拉醃汁-415G/BAG", "Bag / 袋"],
  [8, "CKC000004", "巴西里油-300G/BAG", "Bag / 袋"],
  [9, "CKH000042", "醃杏桃醋汁(羊排) 100G/1BAG", "Bag / 袋"],
  [10, "CKC049", "柏迪耶海鹽奶油 8顆/包", "Bag / 袋"],
  [11, "CKC050", "費塔乾酪 220G/包", "Pc / 片"],
  [12, "169023CK", "TYSON黃玉米餅2.12K/BAG .", "Bag / 袋"],
  [13, "131002SS", "鮭魚菲力(帶皮去鱗)-(90/110) 30片/箱", "Ea / 個"],
  [14, "251001SS", "紅蘿蔔蛋糕/不切/8吋/個", "Ea / 個"],
  [15, "CKC000006", "墨西哥沙拉醬-800G/BAG", "Bag / 袋"],
  [16, "CKC000003", "泰式沙拉醬-800G/包", "Bag / 袋"],
  [17, "CKH000003", "札塔沙拉醬-800G/BAG", "Bag / 袋"],
  [18, "CKC000009", "蒔蘿優格醬-800G/BAG", "Bag / 袋"],
  [19, "CKC000007", "醃紫高麗-800G/BAG", "Bag / 袋"],
  [20, "CKC000010", "黑橄欖醬-200G/BAG", "Bag / 袋"],
  [21, "CKH000008", "紅酒醋凍-450G/BAG", "Bag / 袋"],
  [22, "CKC000011", "章魚美乃滋-600G/BAG", "Bag / 袋"],
  [23, "CKC000023-1", "鹽漬檸檬 4EA/BAG", "Bag / 袋"],
  [24, "CKC000002", "醃番茄沙拉-1770G/BAG", "Bag / 袋"],
  [25, "CKD000004", "起司蛋糕 8份/1模", "Ea / 個"],
  [26, "CKD000010", "巧克力蛋糕", "Ea / 個"],
  [27, "113002SS", "綠胡椒臘腸/ KG", "Kg / 公斤"],
  [28, "173003CK", "艾樂薇 35%動物鮮奶油 (1L/12btl/cs). .", "Btl / 瓶"],
  [29, "171005SS", "切達塊(紅)1Kg/塊", "Pack / 包"],
  [30, "", "菲達起司-ZORBA/1k/罐", "Can / 罐"],
  [31, "171013SS", "布拉塔100G/ 8入裝/盒", "Ea / 個"],
  [32, "142044SS", "截切美生菜3*3公分/公斤", "Kg / 公斤"],
  [33, "142001SS", "紅辣椒/公斤", "Kg / 公斤"],
  [34, "142012SS", "小黃瓜/公斤", "Kg / 公斤"],
  [35, "181005SS", "紅椒/公斤", "Kg / 公斤"],
  [36, "142006SS", "紫洋蔥/公斤", "Kg / 公斤"],
  [37, "142009SS", "西芹/公斤", "Kg / 公斤"],
  [38, "181002SS", "九層塔/公斤", "Kg / 公斤"],
  [39, "145008SS", "檸檬葉/公斤", "Kg / 公斤"],
  [40, "145009SS", "香菜/公斤", "Kg / 公斤"],
  [41, "142010SS", "美生菜/公斤", "Kg / 公斤"],
  [42, "144011SS", "聖女蕃茄（中）/公斤", "Kg / 公斤"],
  [43, "142020SS", "羽衣甘藍/ KG", "Kg / 公斤"],
  [44, "142022SS", "綜合彩色番茄(綜合櫻)/ KG", "Kg / 公斤"],
  [45, "144013SS", "無籽檸檬/公斤", "Kg / 公斤"],
  [46, "145014SS", "羅勒苗/25G/盒", "Box / 盒"],
  [47, "CKD000008", "巧克力粉 100G/BAG", "Bag / 袋"],
  [48, "CKD000011", "巧克力脆片 50G/BAG", ""],
  [49, "CKH000004", "札塔麵包碎-200G/BAG", "Bag / 袋"],
  [50, "CKD000009", "葡萄糖漿 300G/BAG", "Bag / 袋"],
  [51, "CKD000003", "胡桃派 8份/1模", "Ea / 個"],
  [52, "169049CK", "Familia瑞士全家葡萄綜合果物 500g 6入/CS", "Bag / 袋"],
  [53, "161008SS", "泰式酸子醬(羅旺子醬)454G/BOT", "Btl / 瓶"],
  [54, "168003SS", "紅藜麥500G//BAG", "Bag / 袋"],
  [55, "168005SS", "花生碎1K/BAG", "Bag / 袋"],
  [56, "168004SS", "熟白芝麻1K/BAG", "Bag / 袋"],
  [57, "145016SS", "紅寶石芥菜苗25克/盒", "Box / 盒"],
  [58, "142037SS", "白花椰/公斤", "Kg / 公斤"],
  [59, "168011SS", "洋薏仁1KG/BAG", "Bag / 袋"],
  [60, "164005SS", "酸豆920G/BOT", "Btl / 瓶"],
  [61, "168015SS", "夏季5%黑松露醬500G/CAN", "Can / 罐"],
  [62, "162028SS", "英國馬爾頓天然海鹽1.4K/CAN", "Can / 罐"],
  [63, "162037SS", "辣椒粉-韓國600g(粗) 600g/包", "Bag / 袋"],
  [64, "168007SS", "杏桃乾/1KG/BAG", "Bag / 袋"],
  [65, "163003SS", "葡萄籽油/奧莉塔1L/BOT", "Btl / 瓶"],
  [66, "162039SS", "小茴香粉美廚 300g/罐", "Can / 罐"],
  [67, "164009SS", "鷹嘴豆/400克/罐", "Can / 罐"],
  [68, "162038SS", "美廚-薑黃粉400克/瓶", "Btl / 瓶"],
  [69, "185010SS", "純糖粉1K/BAG", "包"],
].map(([order, code, name, unit]) => ({ order, code, name, unit }));

const inventoryBody = document.querySelector("#inventoryBody");
const searchInput = document.querySelector("#searchInput");
const itemCount = document.querySelector("#itemCount");
const emptyState = document.querySelector("#emptyState");
const saveState = document.querySelector("#saveState");

let inventory = loadInventory();
let saveTimer;

function loadInventory() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function toNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : 0;
}

function formatNumber(value) {
  return Number.isInteger(value)
    ? String(value)
    : String(Number(value.toFixed(3)));
}

function saveInventory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
  saveState.textContent = "已自動儲存";
  saveState.style.background = "rgb(255 255 255 / 15%)";
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    saveState.textContent = "資料已保存";
    saveState.style.background = "";
  }, 1200);
}

function createNumberInput(item, field) {
  const input = document.createElement("input");
  input.className = "number-input";
  input.type = "number";
  input.inputMode = "decimal";
  input.min = "0";
  input.step = "any";
  input.placeholder = "0";
  input.value = inventory[item.order]?.[field] ?? "";
  input.dataset.order = String(item.order);
  input.dataset.field = field;
  input.setAttribute("aria-label", `${item.name} ${field === "storage" ? "儲位" : "站上"}`);
  return input;
}

function createRow(item) {
  const row = document.createElement("tr");
  row.dataset.search = `${item.name} ${item.unit}`.toLocaleLowerCase("zh-Hant");
  row.dataset.order = String(item.order);

  const nameCell = document.createElement("td");
  nameCell.className = "item-name";
  nameCell.textContent = item.name;

  const unitCell = document.createElement("td");
  unitCell.className = "unit";
  unitCell.textContent = item.unit || "—";

  const storageCell = document.createElement("td");
  storageCell.append(createNumberInput(item, "storage"));

  const stationCell = document.createElement("td");
  stationCell.append(createNumberInput(item, "station"));

  const totalCell = document.createElement("td");
  totalCell.className = "total-cell";
  totalCell.dataset.totalFor = String(item.order);
  totalCell.setAttribute("aria-label", `${item.name} TOTAL`);

  row.append(nameCell, unitCell, storageCell, stationCell, totalCell);
  updateTotal(item.order, totalCell);
  return row;
}

function updateTotal(order, target) {
  const values = inventory[order] || {};
  const total = toNumber(values.storage) + toNumber(values.station);
  const cell =
    target || document.querySelector(`[data-total-for="${order}"]`);
  if (cell) cell.textContent = formatNumber(total);
}

function renderItems() {
  const fragment = document.createDocumentFragment();
  ITEMS.forEach((item) => fragment.append(createRow(item)));
  inventoryBody.replaceChildren(fragment);
  filterItems();
}

function filterItems() {
  const query = searchInput.value.trim().toLocaleLowerCase("zh-Hant");
  let visible = 0;

  inventoryBody.querySelectorAll("tr").forEach((row) => {
    const matches = !query || row.dataset.search.includes(query);
    row.hidden = !matches;
    if (matches) visible += 1;
  });

  itemCount.textContent = query
    ? `顯示 ${visible} / ${ITEMS.length} 項`
    : `共 ${ITEMS.length} 項`;
  emptyState.hidden = visible !== 0;
}

inventoryBody.addEventListener("input", (event) => {
  const input = event.target.closest(".number-input");
  if (!input) return;

  const order = input.dataset.order;
  const field = input.dataset.field;
  inventory[order] ||= {};
  inventory[order][field] = input.value;
  updateTotal(order);
  saveInventory();
});

searchInput.addEventListener("input", filterItems);

renderItems();
