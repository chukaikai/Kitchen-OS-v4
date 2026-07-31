"use strict";

// The item code stays in data for stable identification, but is intentionally
// never rendered in the interface.
const COLD_ITEMS = [
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

function makeItems(rows) {
  return rows.map(([code, name, unit], index) => ({
    order: index + 1,
    code: code || "",
    name,
    unit: unit || "",
  }));
}

const STATIONS = {
  cold: { label: "Cold", items: COLD_ITEMS },
  s1: {
    label: "S1",
    items: makeItems([
      ["111009CK", "修清肋眼-(PRI/切片/公斤)", "Kg / 公斤"],
      ["CKM000002", "舒肥牛小排 KG", "Kg / 公斤"],
      ["CKM000001", "舒肥牛肋條 KG", "Kg / 公斤"],
      ["CKMM000001", "舒肥雞腿 KG", "Kg / 公斤"],
      ["CKH000035", "白洋蔥底醬 125G/BAG", "Bag / 袋"],
      ["CKH000024", "瑪莉娜拉蕃茄醬-1KG/BAG", "Bag / 袋"],
      ["CKMM000003", "鹽水半雞 3隻/BAG", "Bag / 袋"],
      ["CKC000022", "黑蒜醬 300G/BAG", "Bag / 袋"],
      ["CKH000021", "預拌薯泥-450G/BAG", "Bag / 袋"],
      ["CKH000036", "紫高麗菜泥 250G/BAG", "Bag / 袋"],
      ["CKH000012", "褐色雞湯 100G/BAG", "Bag / 袋"],
      ["CKH000023", "香料雞汁-200G/BAG", "Bag / 袋"],
      ["CKH000001", "香料油-300G/BAG", "Bag / 袋"],
      ["CKC000020", "鯷魚奶油 300G/ 條", "Pc / 片"],
      ["159019SS", "A-Pen麵包粉 500g/包", "Bag / 袋"],
      ["CKC000019", "香料麵包粉(牛小排) 200G/BAG", "Bag / 袋"],
      ["114002CK", "成型漢堡 (10cm/200g/顆)", "Ea / 個"],
      ["CKB000051", "漢堡麵包 6EA/BAG", "Bag / 袋"],
      ["CKC000016", "紅椒辣起司醬 500G/BAG", "Bag / 袋"],
      ["CKMM50004", "舒肥羊排 500G/包", "Bag / 袋"],
      ["168018SS", "極細脆薯條3/16(S01)/1.82Kg/包", "Bag / 袋"],
      ["CKB000002", "原味酸種麵包 EA", "Ea / 個"],
      ["CKH000005", "羊排紅椒醬-300G/BAG", "Bag / 袋"],
      ["CKC000012", "醃黃瓜片-300G/BAG", "Bag / 袋"],
      ["CKC000024", "醃黃瓜條 10EA/BAG", "Bag / 袋"],
      ["168021SS", "大漢板豆腐/400克/盒", "Box / 盒"],
      ["", "玉米糖膠液 1KG/包", "Pack / 包"],
      ["171004SS", "美國瑞士起司片2.27K/PACK", "Pack / 包"],
      ["141001SS", "牛蕃茄 Tomato(大牛)/公斤", "Kg / 公斤"],
      ["142015SS", "蘑菇/公斤", "Kg / 公斤"],
      ["142017SS", "鴻禧菇/盒", "Box / 盒"],
      ["142018SS", "圓茄/公斤", "Kg / 公斤"],
      ["142028SS", "青花菜/公斤", "Kg / 公斤"],
      ["142029SS", "秋葵/公斤", "Kg / 公斤"],
      ["145001SS", "蝦夷蔥/公斤", "Kg / 公斤"],
      ["145006SS", "百里香/公斤", "Kg / 公斤"],
      ["181004SS", "迷迭香/公斤", "Kg / 公斤"],
      ["142030SS", "球芽甘藍/公斤", "Kg / 公斤"],
      ["143001SS", "奶油萵苣/公斤", "Kg / 公斤"],
      ["162062CK", "粉紅胡椒140G/BOT .", "Btl / 瓶"],
      ["181003SS", "黃檸檬/公斤", "Kg / 公斤"],
      ["121024SS", "大包裝番茄醬Ketchup 3.23Kg(bag/box)", "Bag / 袋"],
      ["162001SS", "DOC瑪薩拉葡萄酒17% 750ml/BTL", "Btl / 瓶"],
      ["162023SS", "巴沙米可醋5L/BOT", "Btl / 瓶"],
      ["161014SS", "法式芥苿子醬1K/BOT", "Btl / 瓶"],
      ["162026SS", "凱莉茴香籽300G/BOT", "Btl / 瓶"],
      ["184010SS", "玉米粉 戰艦375G/BOX", "Box / 盒"],
      ["163008SS", "耐炸油-大成 18L/桶", "Tank / 桶"],
      ["168026SS", "檸檬汁 -金美達 /1050ml/罐", "Can / 罐"],
      ["153004SS", "Scott 萬用強吸力紙抹布 55張/ 卷", "Roll/ 卷"],
      ["159035SS", "法國麵包粉 250g/包", "Bag / 袋"],
      ["", "蛋黃液/", ""],
      ["", "殺菌蛋白液970G/CAN", "Can / 罐"],
      ["", "香菇/公斤", "Kg / 公斤"],
    ]),
  },
  s2: {
    label: "S2",
    items: makeItems([
      ["CKP000004", "玉米餃8pc  10BAG/PACK", "Pack / 包"],
      ["CKP000007", "寬帶麵120G 10BAG/PACK", "Pack / 包"],
      ["CKP000006", "細扁麵120G 10BAG/PACK", "Pack / 包"],
      ["CKP000005", "細麵120G 10BAG/PACK", "Pack / 包"],
      ["CKP000008", "墨魚細麵120G 10BAG/PACK", "Pack / 包"],
      ["CKP000009", "麵疙瘩120G 10BAG/PACK", "Pack / 包"],
      ["CKP000010", "彎管通心粉110G 10BAG/PACK", "Pack / 包"],
      ["152001CK", "波隆那肉醬2KG*6包 /箱", "Bag / 袋"],
      ["CKH000019", "羅勒油-150G/BAG", "Bag / 袋"],
      ["CKH000015", "油封蒜碎-1000G/BAG", "Bag / 袋"],
      ["CKH000017", "油封蔬菜-500G/BAG", "Bag / 袋"],
      ["CKH000028", "蛤蠣醬-850G/BAG", "Bag / 袋"],
      ["CKH000026", "墨魚肉醬-1.2KG/BAG", "Bag / 袋"],
      ["CKMM000005", "墨魚絲640G/BAG", "Bag / 袋"],
      ["CKH000029", "燉羊肉醬 1800G/BAG", "Bag / 袋"],
      ["CKC000017", "山羊起司醬 100G/BAG", "Bag / 袋"],
      ["CKH000031", "伏特加辣番茄醬 850G/BAG", "Bag / 袋"],
      ["CKH000032", "紅蝦高湯 1.6KG/BAG", "Bag / 袋"],
      ["CKH053", "巴西里青醬250g/包", "Bag / 袋"],
      ["CKH000025", "帕馬森起司高湯 1KG/BAG", "Bag / 袋"],
      ["CKH000009", "牛油 500G/BAG", "Bag / 袋"],
      ["132001SS", "3號白蝦仁3K/BAG", "Kg / 公斤"],
      ["CKH059", "塔雷吉歐起司奶蓋 600G/包", "Bag / 袋"],
      ["CKC052", "番茄調味汁 600G/BAG", "Bag / 袋"],
      ["132002SS", "甜蝦/BOX", "Box/ 盒"],
      ["CKH000033", "白酒甘蔥碎 200G/BAG", "Bag / 袋"],
      ["CKH000030", "醃紅辣椒片 125G/BAG", "Bag / 袋"],
      ["CKH000016", "油封蕃茄-500G/BAG", "Bag / 袋"],
      ["CKC000013", "檸檬瑞可塔起司-400G/BAG", "Bag / 袋"],
      ["171012SS", "07絲綢乳酪(500)/ BOX", "Box / 盒"],
      ["145004SS", "捲葉巴西里/公斤", "Kg / 公斤"],
      ["142014SS", "菠菜/公斤", "Kg / 公斤"],
      ["137002SS", "9分文蛤/公斤", "Kg / 公斤"],
      ["142003SS", "青蔥/公斤", "Kg / 公斤"],
      ["142002SS", "青辣椒/公斤", "Kg / 公斤"],
      ["CKH000018", "香蒜麵包碎-200G/BAG", "Bag / 袋"],
      ["CKC000026", "乾辣椒碎 200G/BAG", "Bag / 袋"],
      ["186030SS", "葡萄乾340G/BOX", "Box / 盒"],
      ["161004SS", "料理白酒5L/BOT", "Btl / 瓶"],
      ["168025SS", "喬爾碎粒番茄(大)/2.5公斤/罐", "Can / 罐"],
      ["168001SS", "白米/3K/BAG (台梗9號)", "Bag / 袋"],
    ]),
  },
  pizza: {
    label: "Pizza",
    items: makeItems([
      ["CKB000046", "冷凍Pizza麵團275G 6EA/BAG", "Bag / 袋"],
      ["CKC048", "綜合起司包10份/包", "Bag / 袋"],
      ["CKC047", "佛特樂起司2.5KG /包", "Bag / 袋"],
      ["113011CK", "乾醃熟燻畢可培根-(2mm/40mm/切片/公斤)", "Kg / 公斤"],
      ["CKH000034", "烤馬鈴薯片 1KG/BAG", "Bag / 袋"],
      ["113012CK", "畢可 客製義式絞肉/公斤", "Kg / 公斤"],
      ["113003SS", "煙燻紅椒臘腸切片(1.5MM)/ KG", "Kg / 公斤"],
      ["171009SS", "蘭花莫左瑞拉起司(原味)/ KG", "Kg / 公斤"],
      ["CKH000044", "原味瑞可塔起司 1000G/BAG", "Bag / 袋"],
      ["CKC000018", "農夫派底醬 1800G/BAG", "Bag / 袋"],
      ["CKC000014", "香菇派底醬-1100G/BAG", "Bag / 袋"],
      ["174002CK", "帶殼溫泉蛋/10粒 /盒", "Box / 盒"],
      ["171003SS", "Boni帕達諾乾酪/ KG", "Kg / 公斤"],
      ["142004SS", "甘蔥(紅蔥頭)/公斤", "Kg / 公斤"],
      ["142041SS", "裂葉芝麻葉/500G/包", "Bag / 袋"],
      ["CKH000020", "辣蜂蜜-250G/BAG", "Bag / 袋"],
      ["168020SS", "ORO去皮整粒蕃茄2.5kg/6入/箱", "Can / 罐"],
      ["167007SS", "00麵粉/Caputo/1kg/包", "Bag / 袋"],
      ["167006SS", "杜蘭麥粉1kg/BAG", "Bag / 袋"],
      ["162027SS", "美廚紅椒片500G/BAG", "Bag / 袋"],
      ["163007SS", "烤盤油600ml/BOT", "Btl / 瓶"],
    ]),
  },
};

const inventoryBody = document.querySelector("#inventoryBody");
const searchInput = document.querySelector("#searchInput");
const itemCount = document.querySelector("#itemCount");
const emptyState = document.querySelector("#emptyState");
const saveState = document.querySelector("#saveState");
const stationTabs = document.querySelector(".station-tabs");
const inventorySection = document.querySelector("#inventorySection");
const inventoryDate = document.querySelector("#inventoryDate");
const loadPrepButton = document.querySelector("#loadPrepButton");
const prepSyncMessage = document.querySelector("#prepSyncMessage");

const firebaseConfig = {
  apiKey: "AIzaSyCFTPiF6H-mpu3-hiUFDZv0okkQxv9PH1g",
  authDomain: "kitchen-os-fad49.firebaseapp.com",
  projectId: "kitchen-os-fad49",
  storageBucket: "kitchen-os-fad49.firebasestorage.app",
  messagingSenderId: "663452568096",
  appId: "1:663452568096:web:8a9c5a8d96d8a205918a45",
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 每一條規則：Weekly 品項順序、備料表列號（由 0 開始）、換算倍率。
// 同一品項可加總多個備料列。S2 墨魚絲依確認規格採 1 盒＝10 份、300g／盒。
const PREP_TO_WEEKLY = {
  cold: [
    { order: 1, sources: [[22, 0.375]], note: "章魚：1盒×5份×75g＝0.375kg" },
    { order: 27, sources: [[25, 0.25]] },
    { order: 29, sources: [[15, 0.25]] },
    { order: 34, sources: [[6, 0.4]] },
    { order: 36, sources: [[8, 0.25]] },
    { order: 37, sources: [[18, 0.25], [24, 0.25]] },
    { order: 38, sources: [[3, 0.03]] },
    { order: 40, sources: [[2, 0.03]] },
    { order: 41, sources: [[1, 0.7]] },
    { order: 43, sources: [[0, 0.3]] },
    { order: 54, sources: [[9, 0.5]] },
    { order: 55, sources: [[20, 0.25]] },
    { order: 56, sources: [[21, 0.25]] },
  ],
  s1: [
    { order: 2, sources: [[16, 0.21]] },
    { order: 3, sources: [[7, 0.11]] },
    { order: 4, sources: [[6, 0.11]] },
    { order: 11, sources: [[20, 0.5]], note: "牛汁：每盒含50g褐色雞湯；褐色雞湯100g／包" },
    { order: 26, sources: [[10, 1]] },
    { order: 29, sources: [[9, 0.03]], note: "漢堡菜：每份含30g牛蕃茄" },
    { order: 30, sources: [[0, 0.384615]], note: "混菇：1kg盒依2.6kg配方拆回洋菇" },
    { order: 31, sources: [[0, 2.307692]], note: "混菇：1kg盒依2.6kg配方拆回鴻禧菇（100g／包）" },
    { order: 32, sources: [[21, 0.28]], note: "茄子：每份0.28kg" },
    { order: 33, sources: [[12, 0.03]], note: "豆腐菜包：每份含0.03kg花椰菜" },
    { order: 34, sources: [[11, 0.3]], note: "切秋葵：每盒0.3kg" },
    { order: 35, sources: [[1, 0.025]] },
    { order: 38, sources: [[12, 0.03]], note: "豆腐菜包：每份含0.03kg抱子甘藍" },
    { order: 39, sources: [[9, 0.01]], note: "漢堡菜：每份含10g奶油萵苣" },
    { order: 45, sources: [[17, 0.17]], note: "蛋刷醬：每盒含170g法式芥末子醬（1kg／罐）" },
    { order: 47, sources: [[17, 0.186667]], note: "蛋刷醬：每盒含70g玉米粉（375g／盒）" },
    { order: 53, sources: [[17, 0.103093]], note: "蛋刷醬：每盒含100g殺菌蛋白液（970g／罐）" },
    { order: 54, sources: [[0, 0.384615]], note: "混菇：1kg盒依2.6kg配方拆回香菇" },
  ],
  s2: [
    { order: 14, sources: [[5, 0.46875]], note: "墨魚絲：300g／盒 ÷ 640g／袋" },
    { order: 31, sources: [[0, 0.05], [1, 0.1], [2, 0.2]] },
    { order: 32, sources: [[3, 0.15]] },
    { order: 34, sources: [[7, 0.03]] },
    { order: 35, sources: [[8, 0.05]] },
  ],
  pizza: [
    { order: 8, sources: [[0, 4]] },
    {
      order: 6,
      sources: [[8, 0.5]],
      note: "義式絞肉：每盒熟重400g，依80%烹調率回推生肉0.5kg",
    },
    { order: 13, sources: [[5, 0.001]] },
    { order: 14, sources: [[3, 0.4]] },
    { order: 15, sources: [[10, 0.001]] },
  ],
};

// Weekly 的儲位與站上可能使用不同盤點單位；TOTAL 一律依品項主單位換算。
// S1：修清肋眼（包＋包→kg）、極細脆薯條（袋＋份→袋）。
// 指定醬料與乾料：儲位盤原包裝、站上盤總重kg，TOTAL換算為原包裝數。
// 三種舒肥肉維持原流程：備料份數先換算成kg，再帶入Weekly站上欄。
const WEEKLY_CONVERSIONS = {
  s1: {
    1: {
      storageFactor: 0.47,
      stationFactor: 0.47,
      storageUnit: "包",
      stationUnit: "包",
      note: "1包＝0.47kg",
    },
    6: {
      storageFactor: 1,
      stationFactor: 1,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝1kg",
    },
    8: {
      storageFactor: 1,
      stationFactor: 1 / 0.3,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.3kg",
    },
    10: {
      storageFactor: 1,
      stationFactor: 1 / 0.25,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.25kg",
    },
    13: {
      storageFactor: 1,
      stationFactor: 1 / 0.3,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.3kg",
    },
    14: {
      storageFactor: 1,
      stationFactor: 1 / 0.3,
      storageUnit: "條",
      stationUnit: "kg",
      note: "1條＝0.3kg",
    },
    16: {
      storageFactor: 1,
      stationFactor: 1 / 0.2,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.2kg",
    },
    19: {
      storageFactor: 1,
      stationFactor: 1 / 0.5,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.5kg",
    },
    21: {
      storageFactor: 1,
      stationFactor: 0.15 / 1.82,
      storageUnit: "袋",
      stationUnit: "份",
      note: "1份＝0.15kg；1袋＝1.82kg",
    },
    23: {
      storageFactor: 1,
      stationFactor: 1 / 0.3,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.3kg",
    },
    24: {
      storageFactor: 1,
      stationFactor: 1 / 0.3,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝0.3kg",
    },
    27: {
      storageFactor: 1,
      stationFactor: 1,
      storageUnit: "包",
      stationUnit: "kg",
      note: "1包＝1kg",
    },
    40: {
      storageFactor: 1,
      stationFactor: 1 / 0.14,
      storageUnit: "瓶",
      stationUnit: "kg",
      note: "1瓶＝0.14kg",
    },
    42: {
      storageFactor: 1,
      stationFactor: 1 / 3.23,
      storageUnit: "袋",
      stationUnit: "kg",
      note: "1袋＝3.23kg",
    },
    46: {
      storageFactor: 1,
      stationFactor: 1 / 0.3,
      storageUnit: "瓶",
      stationUnit: "kg",
      note: "1瓶＝0.3kg",
    },
    47: {
      storageFactor: 1,
      stationFactor: 1 / 0.375,
      storageUnit: "盒",
      stationUnit: "kg",
      note: "1盒＝0.375kg",
    },
  },
};

let activeStation = "cold";
let inventory = loadInventory(activeStation);
let saveTimer;

function storageKey(station) {
  return `kitchen-os-v4.1:101:${station}:weekly`;
}

function loadInventory(station) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(station)) || "{}");
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
  localStorage.setItem(storageKey(activeStation), JSON.stringify(inventory));
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
  if (field === "station" && inventory[item.order]?.prepLinked) {
    input.readOnly = true;
    input.title = inventory[item.order].prepNote || "由備料每日盤點自動帶入";
  }
  const conversion = WEEKLY_CONVERSIONS[activeStation]?.[item.order];
  const fieldUnit = field === "storage" ? conversion?.storageUnit : conversion?.stationUnit;
  input.setAttribute(
    "aria-label",
    `${item.name} ${field === "storage" ? "儲位" : "站上"}${fieldUnit ? `（${fieldUnit}）` : ""}`,
  );
  if (fieldUnit && !input.title) {
    input.title = `${field === "storage" ? "儲位" : "站上"}請輸入${fieldUnit}；${conversion.note}`;
  }
  return input;
}

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

async function getPrepInventory(station, date) {
  let data = null;
  try {
    const snap = await db.collection("dailyInventory").doc(`prep-${station}-${date}`).get();
    if (snap.exists) data = snap.data();
  } catch (error) {
    console.warn("雲端備料盤點讀取失敗，改用本機資料", error);
  }
  return data || JSON.parse(localStorage.getItem(`kos-daily-v06-prep-${station}-${date}`) || "null");
}

async function loadPrepInventory() {
  const date = inventoryDate.value;
  if (!date) return;
  loadPrepButton.disabled = true;
  prepSyncMessage.textContent = "正在讀取備料盤點…";
  let linked = 0;
  let missingStations = 0;

  for (const [station, rules] of Object.entries(PREP_TO_WEEKLY)) {
    const saved = await getPrepInventory(station, date);
    const stationInventory = loadInventory(station);
    if (!saved?.rows) {
      missingStations += 1;
      continue;
    }
    rules.forEach((rule) => {
      let hasValue = false;
      const converted = rule.sources.reduce((sum, [rowIndex, factor]) => {
        const raw = saved.rows[rowIndex]?.actual;
        if (raw !== "" && raw != null && Number.isFinite(Number(raw))) hasValue = true;
        return sum + toNumber(raw) * factor;
      }, 0);
      if (!hasValue) return;
      stationInventory[rule.order] ||= {};
      stationInventory[rule.order].station = formatNumber(converted);
      stationInventory[rule.order].prepLinked = true;
      stationInventory[rule.order].prepDate = date;
      stationInventory[rule.order].prepNote = rule.note || `由 ${date} 備料盤點換算`;
      linked += 1;
    });
    localStorage.setItem(storageKey(station), JSON.stringify(stationInventory));
  }

  inventory = loadInventory(activeStation);
  renderItems();
  prepSyncMessage.textContent = linked
    ? `已抓取 ${date} 的盤點資料，共更新 ${linked} 個 Weekly 站上數字${missingStations ? `；${missingStations} 站尚未儲存` : ""}。`
    : `找不到 ${date} 已儲存的備料盤點，請先到「備料每日盤點表」填寫並儲存。`;
  loadPrepButton.disabled = false;
}

function createRow(item) {
  const row = document.createElement("tr");
  row.dataset.search = `${item.name} ${item.unit}`.toLocaleLowerCase("zh-Hant");
  row.dataset.order = String(item.order);

  const nameCell = document.createElement("td");
  nameCell.className = "item-name";
  nameCell.textContent = item.name;
  const conversion = WEEKLY_CONVERSIONS[activeStation]?.[item.order];
  if (conversion) {
    const note = document.createElement("small");
    note.className = "conversion-hint";
    note.textContent = `儲位盤${conversion.storageUnit}｜站上盤${conversion.stationUnit}｜${conversion.note}`;
    nameCell.append(note);
  }

  const unitCell = document.createElement("td");
  unitCell.className = "unit";
  unitCell.textContent = item.unit || "—";

  const storageCell = document.createElement("td");
  if (conversion?.storageUnit) {
    const storageUnit = document.createElement("span");
    storageUnit.className = "inventory-unit-label";
    storageUnit.textContent = `盤${conversion.storageUnit}`;
    storageCell.append(storageUnit);
  }
  storageCell.append(createNumberInput(item, "storage"));

  const stationCell = document.createElement("td");
  if (conversion?.stationUnit) {
    const stationUnit = document.createElement("span");
    stationUnit.className = "inventory-unit-label";
    stationUnit.textContent = `盤${conversion.stationUnit}`;
    stationCell.append(stationUnit);
  }
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
  const conversion = WEEKLY_CONVERSIONS[activeStation]?.[order];
  const total = conversion
    ? toNumber(values.storage) * conversion.storageFactor +
      toNumber(values.station) * conversion.stationFactor
    : toNumber(values.storage) + toNumber(values.station);
  const cell =
    target || document.querySelector(`[data-total-for="${order}"]`);
  if (cell) cell.textContent = formatNumber(total);
}

function renderItems() {
  const fragment = document.createDocumentFragment();
  STATIONS[activeStation].items.forEach((item) => fragment.append(createRow(item)));
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
    ? `顯示 ${visible} / ${STATIONS[activeStation].items.length} 項`
    : `共 ${STATIONS[activeStation].items.length} 項`;
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

stationTabs.addEventListener("click", (event) => {
  const tab = event.target.closest(".station-tab");
  if (!tab || tab.dataset.station === activeStation) return;

  activeStation = tab.dataset.station;
  inventory = loadInventory(activeStation);
  searchInput.value = "";
  document.querySelectorAll(".station-tab").forEach((button) => {
    button.classList.toggle("active", button === tab);
  });
  inventorySection.setAttribute(
    "aria-label",
    `101 ${STATIONS[activeStation].label} 週盤點`,
  );
  saveState.textContent = "已載入";
  renderItems();
});

renderItems();
inventoryDate.value = dateKey();
loadPrepButton.addEventListener("click", loadPrepInventory);
