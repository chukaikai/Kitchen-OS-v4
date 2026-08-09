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
  [70, "145003SS", "薄荷/公斤", "Kg / 公斤"],
  [71, "142004SS", "乾蔥(紅蔥頭)/公斤", "Kg / 公斤"],
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
      ["142004SS", "乾蔥(紅蔥頭)/公斤", "Kg / 公斤"],
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

// 大巨蛋下午由主管統一盤點冷藏儲位的蔬菜。四個站別仍保留品項列與
// 站上盤點；只有儲位改由下午蔬菜表統一盤，避免重複計算。
const AFTERNOON_PRODUCE_ITEMS = makeItems([
  ["168021SS", "大漢板豆腐/400克/盒", "Box / 盒"],
  ["142019SS", "蒜仁-大 /公斤", "Kg / 公斤"],
  ["142004SS", "甘蔥(紅蔥頭)/公斤", "Kg / 公斤"],
  ["142001SS", "紅辣椒/公斤", "Kg / 公斤"],
  ["142012SS", "小黃瓜/公斤", "Kg / 公斤"],
  ["181005SS", "紅椒/公斤", "Kg / 公斤"],
  ["141001SS", "牛蕃茄 Tomato(大牛)/公斤", "Kg / 公斤"],
  ["142006SS", "紫洋蔥/公斤", "Kg / 公斤"],
  ["142030SS", "球芽甘藍/公斤", "Kg / 公斤"],
  ["142028SS", "青花菜/公斤", "Kg / 公斤"],
  ["142029SS", "秋葵/公斤", "Kg / 公斤"],
  ["142009SS", "西芹/公斤", "Kg / 公斤"],
  ["142015SS", "蘑菇/公斤", "Kg / 公斤"],
  ["142016SS", "濕香菇/中/5公分/公斤", "Kg / 公斤"],
  ["142017SS", "鴻禧菇/盒", "Box / 盒"],
  ["181002SS", "九層塔/公斤", "Kg / 公斤"],
  ["145015SS", "特規甜蘿勒/公斤", "Kg / 公斤"],
  ["145002SS", "蒔蘿/公斤", "Kg / 公斤"],
  ["145003SS", "薄荷/公斤", "Kg / 公斤"],
  ["145001SS", "蝦夷蔥/公斤", "Kg / 公斤"],
  ["181003SS", "平葉巴西里/公斤", "Kg / 公斤"],
  ["145004SS", "捲葉巴西里/公斤", "Kg / 公斤"],
  ["145006SS", "百里香/公斤", "Kg / 公斤"],
  ["181004SS", "迷迭香/公斤", "Kg / 公斤"],
  ["145008SS", "檸檬葉/公斤", "Kg / 公斤"],
  ["145009SS", "香菜/公斤", "Kg / 公斤"],
  ["143001SS", "奶油萵苣/公斤", "Kg / 公斤"],
  ["142014SS", "菠菜/公斤", "Kg / 公斤"],
  ["142010SS", "美生菜/公斤", "Kg / 公斤"],
  ["142020SS", "羽衣甘藍/ KG", "Kg / 公斤"],
  ["144011SS", "聖女蕃茄（中）/公斤", "Kg / 公斤"],
  ["142013SS", "白皮馬鈴薯/公斤", "Kg / 公斤"],
  ["142003SS", "青蔥/公斤", "Kg / 公斤"],
  ["142002SS", "青辣椒/公斤", "Kg / 公斤"],
  ["142041SS", "裂葉芝麻葉/500G/包", "Bag / 袋"],
  ["142037SS", "白花椰/公斤", "Kg / 公斤"],
  ["142018SS", "圓茄/公斤", "Kg / 公斤"],
]);
const AFTERNOON_PRODUCE_CODES = new Set(AFTERNOON_PRODUCE_ITEMS.map((item) => item.code));
const produceEnabled = KitchenStore.current?.id === "taipei-dome";

function isAfternoonProduce(item) {
  return produceEnabled && AFTERNOON_PRODUCE_CODES.has(item?.code);
}

const LEGACY_STATION_ITEMS = Object.fromEntries(
  Object.entries(STATIONS).map(([key, value]) => [key, value.items.slice()])
);
window.KitchenStoreDefaults?.applyWeekly(STATIONS);
if (KitchenStore.current?.id === "taipei-dome") {
  const s1Items = STATIONS.s1.items;
  const eggWhole = s1Items.find((item) => item.order === 52);
  const eggWhite = s1Items.find((item) => item.order === 53);
  if (eggWhole) Object.assign(eggWhole, { code: "183015SS", name: "殺菌全蛋液 970G/CAN", unit: "Can / 罐" });
  if (eggWhite) Object.assign(eggWhite, { code: "183017SS", name: "殺菌蛋白液 970G/CAN", unit: "Can / 罐" });
  if (!s1Items.some((item) => item.code === "161004SS")) {
    s1Items.push({
      order: Math.max(...s1Items.map((item) => Number(item.order) || 0)) + 1,
      code: "161004SS",
      name: "料理白酒 5L/BOT",
      unit: "Btl / 瓶",
      location: "乾貨",
    });
  }
}
const BASE_STATION_ITEMS = Object.fromEntries(
  Object.entries(STATIONS).map(([key, value]) => [key, value.items.slice()])
);

Object.keys(STATIONS).forEach((stationKey) => {
  STATIONS[stationKey].items = KitchenItemSettings.apply("weekly", stationKey, BASE_STATION_ITEMS[stationKey]);
});

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
const inventoryHeadRow = document.querySelector("#inventoryHeadRow");
const prepSyncSection = document.querySelector(".prep-sync");
const itemSettingsButton = document.querySelector("#itemSettingsButton");
const produceTab = document.querySelector(".produce-tab");
if (!produceEnabled && produceTab) produceTab.remove();

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
    {
      targetCode: "145003SS",
      targetName: "薄荷",
      order: 70,
      sources: [[4, 0.03]],
      note: "薄荷：每盒30g＝0.03kg",
    },
    {
      targetCode: "142001SS",
      targetName: "紅辣椒",
      order: 33,
      sources: [[7, 0.1]],
      note: "辣椒切片：每盒100g＝紅辣椒0.1kg",
    },
    {
      targetCode: "168003SS",
      targetName: "紅藜麥",
      order: 54,
      sources: [[9, 0.21]],
      note: "半成品紅藜麥：每盒回推生紅藜麥0.21包",
    },
    {
      targetCode: "168011SS",
      targetName: "洋薏仁",
      order: 62,
      sources: [[10, 0.0875]],
      note: "熟洋薏仁：350g生洋薏仁煮成4盒；每盒回推1KG／包生洋薏仁0.0875包",
    },
    {
      targetCode: "168015SS",
      targetName: "夏季5%黑松露醬",
      order: 61,
      sources: [[13, 0.16]],
      note: "半成品松露醬：每罐使用黑松露醬80g，回推夏季5%黑松露醬500g／罐的0.16罐",
    },
    {
      targetCode: "CKC000004",
      targetName: "番茄沙拉醃汁",
      order: 7,
      sources: [[13, 1]],
      note: "醃綜合蕃茄：每盒使用蕃茄醃汁1包",
    },
    {
      targetCode: "144011SS",
      targetName: "聖女蕃茄",
      order: 42,
      sources: [[13, 1]],
      note: "醃綜合蕃茄：每盒使用聖女蕃茄（中）1kg",
    },
    {
      targetCode: "142022SS",
      targetName: "綜合彩色番茄",
      order: 44,
      sources: [[13, 1]],
      note: "醃綜合蕃茄：每盒使用綜合彩色番茄1kg",
    },
    {
      targetCode: "142004SS",
      targetName: "乾蔥",
      order: 71,
      sources: [[13, 0.065]],
      note: "醃綜合蕃茄：每盒使用乾蔥0.065kg；百里香與EVO不回推",
    },
    { order: 27, sources: [[25, 0.25]] },
    { order: 29, sources: [[15, 0.25]] },
    { order: 34, sources: [[6, 0.4]] },
    { order: 36, sources: [[8, 0.25]] },
    { order: 37, sources: [[18, 0.25], [24, 0.25]] },
    { order: 38, sources: [[3, 0.03]] },
    { order: 40, sources: [[2, 0.03]] },
    { order: 41, sources: [[1, 0.7]] },
    { order: 43, sources: [[0, 0.3]] },
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
    { order: 8, sources: [[12, 1]], note: "波隆那肉醬：站上1桶＝原物料1包" },
    { order: 12, sources: [[17, 2]], note: "蛤蠣醬：站上1桶＝原物料2包" },
    { order: 13, sources: [[16, 1]], note: "墨魚肉醬：站上1桶＝原物料1包" },
    { order: 14, sources: [[5, 0.46875]], note: "墨魚絲：300g／盒 ÷ 640g／袋" },
    { order: 15, sources: [[15, 1]], note: "燉羊肉醬：站上1桶＝原物料1包" },
    { order: 17, sources: [[14, 2]], note: "伏特加辣番茄醬：站上1桶＝原物料2包" },
    { order: 18, sources: [[18, 2 / 3]], note: "蝦醬：站上3桶＝紅蝦高湯2包" },
    { order: 19, sources: [[11, 1]], note: "綠沙沙醬：站上1罐＝巴西里青醬1包" },
    { order: 22, sources: [[4, 0.56]], note: "蝦仁：站上1盒＝8份×70g＝0.56kg" },
    { targetCode: "142004SS", targetName: "乾蔥", order: 42, sources: [[6, 0.05]], note: "甘蔥碎：站上1盒50g＝乾蔥0.05kg；與白酒甘蔥碎分開計算" },
    { order: 31, sources: [[0, 0.05], [1, 0.1]], note: "巴西里碎與巴西里葉回推捲葉巴西里" },
    { order: 32, sources: [[3, 0.15]] },
    { order: 34, sources: [[7, 0.03]] },
    { order: 35, sources: [[8, 0.05]] },
    { order: 40, sources: [[13, 0.66]], note: "喬爾蕃茄醬：1桶1650g＝2.5kg番茄罐的0.66罐" },
  ],
  pizza: [
    { order: 8, sources: [[0, 4]] },
    {
      targetCode: "CKC048",
      targetName: "綜合起司包",
      order: 2,
      sources: [[6, 0.1]],
      note: "退冰綜合起司包：每10份＝原包裝1包；每1份＝0.1包",
    },
    {
      targetCode: "CKC047",
      targetName: "佛特樂起司",
      order: 3,
      sources: [[4, 0.2]],
      note: "佛特樂乾酪：每盒500g ÷ 2.5kg／包＝0.2包",
    },
    {
      targetCode: "168020SS",
      targetName: "ORO去皮整粒蕃茄",
      order: 17,
      sources: [[1, 2]],
      note: "Pizza醬：每盒5kg＝ORO去皮整粒蕃茄2.5kg×2罐",
    },
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
// 指定醬料與乾料：儲位盤原包裝、站上盤總重g，TOTAL換算為原包裝數。
// 三種舒肥肉維持原流程：備料份數先換算成kg，再帶入Weekly站上欄。
const WEEKLY_CONVERSIONS = {
  cold: {
    2: { storageFactor: 1, stationFactor: 1 / 200, storageUnit: "袋", stationUnit: "g", note: "1袋＝200g" },
    3: { storageFactor: 1, stationFactor: 1 / 350, storageUnit: "袋", stationUnit: "g", note: "1袋＝350g" },
    4: { storageFactor: 1, stationFactor: 1 / 200, storageUnit: "袋", stationUnit: "g", note: "1袋＝200g" },
    6: { storageFactor: 1, stationFactor: 1 / 200, storageUnit: "袋", stationUnit: "g", note: "1袋＝200g" },
    8: { storageFactor: 1, stationFactor: 1 / 300, storageUnit: "袋", stationUnit: "g", note: "1袋＝300g" },
    11: { storageFactor: 1, stationFactor: 1 / 220, storageUnit: "包", stationUnit: "g", note: "1包＝220g" },
    15: { storageFactor: 1, stationFactor: 1 / 800, storageUnit: "袋", stationUnit: "g", note: "1袋＝800g" },
    16: { storageFactor: 1, stationFactor: 1 / 800, storageUnit: "包", stationUnit: "g", note: "1包＝800g" },
    17: { storageFactor: 1, stationFactor: 1 / 800, storageUnit: "袋", stationUnit: "g", note: "1袋＝800g" },
    18: { storageFactor: 1, stationFactor: 1 / 800, storageUnit: "袋", stationUnit: "g", note: "1袋＝800g" },
    19: { storageFactor: 1, stationFactor: 1 / 800, storageUnit: "袋", stationUnit: "g", note: "1袋＝800g" },
    20: { storageFactor: 1, stationFactor: 1 / 200, storageUnit: "袋", stationUnit: "g", note: "1袋＝200g" },
    21: { storageFactor: 1, stationFactor: 1 / 450, storageUnit: "袋", stationUnit: "g", note: "1袋＝450g" },
    22: { storageFactor: 1, stationFactor: 1 / 600, storageUnit: "袋", stationUnit: "g", note: "1袋＝600g" },
    47: { storageFactor: 1, stationFactor: 1 / 100, storageUnit: "袋", stationUnit: "g", note: "1袋＝100g" },
    48: { storageFactor: 1, stationFactor: 1 / 50, storageUnit: "袋", stationUnit: "g", note: "1袋＝50g" },
    49: { storageFactor: 1, stationFactor: 1 / 200, storageUnit: "袋", stationUnit: "g", note: "1袋＝200g" },
    50: { storageFactor: 1, stationFactor: 1 / 300, storageUnit: "袋", stationUnit: "g", note: "1袋＝300g" },
    52: { storageFactor: 1, stationFactor: 1 / 500, storageUnit: "袋", stationUnit: "g", note: "1袋＝500g（6袋／箱）" },
  },
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
      stationFactor: 1 / 1000,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1000g",
    },
    8: {
      storageFactor: 1,
      stationFactor: 1 / 300,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝300g",
    },
    10: {
      storageFactor: 1,
      stationFactor: 1 / 250,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝250g",
    },
    13: {
      storageFactor: 1,
      stationFactor: 1 / 300,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝300g",
    },
    14: {
      storageFactor: 1,
      stationFactor: 1 / 300,
      storageUnit: "條",
      stationUnit: "g",
      note: "1條＝300g",
    },
    16: {
      storageFactor: 1,
      stationFactor: 1 / 200,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝200g",
    },
    19: {
      storageFactor: 1,
      stationFactor: 1 / 500,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝500g",
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
      stationFactor: 1 / 300,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝300g",
    },
    24: {
      storageFactor: 1,
      stationFactor: 1 / 300,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝300g",
    },
    27: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "包",
      stationUnit: "g",
      note: "1包＝1000g",
    },
    40: {
      storageFactor: 1,
      stationFactor: 1 / 140,
      storageUnit: "瓶",
      stationUnit: "g",
      note: "1瓶＝140g",
    },
    42: {
      storageFactor: 1,
      stationFactor: 1 / 3230,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝3230g",
    },
    46: {
      storageFactor: 1,
      stationFactor: 1 / 300,
      storageUnit: "瓶",
      stationUnit: "g",
      note: "1瓶＝300g",
    },
    47: {
      storageFactor: 1,
      stationFactor: 1 / 375,
      storageUnit: "盒",
      stationUnit: "g",
      note: "1盒＝375g",
    },
  },
  s2: {
    9: {
      storageFactor: 1,
      stationFactor: 1 / 150,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝150g",
    },
    10: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1000g",
    },
    11: {
      storageFactor: 1,
      stationFactor: 1 / 500,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝500g",
    },
    16: {
      storageFactor: 1,
      stationFactor: 1 / 100,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝100g",
    },
    20: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1000g",
    },
    21: {
      storageFactor: 1,
      stationFactor: 1 / 500,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝500g",
    },
    23: {
      storageFactor: 1,
      stationFactor: 1 / 600,
      storageUnit: "包",
      stationUnit: "g",
      note: "1包＝600g",
    },
    24: {
      storageFactor: 1,
      stationFactor: 1 / 600,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝600g",
    },
    26: {
      storageFactor: 1,
      stationFactor: 1 / 200,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝200g",
    },
    27: {
      storageFactor: 1,
      stationFactor: 1 / 125,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝125g",
    },
    28: {
      storageFactor: 1,
      stationFactor: 1 / 500,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝500g",
    },
    29: {
      storageFactor: 1,
      stationFactor: 1 / 400,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝400g",
    },
    30: {
      storageFactor: 1,
      stationFactor: 1 / 500,
      storageUnit: "盒",
      stationUnit: "g",
      note: "1盒＝500g",
    },
    36: {
      storageFactor: 1,
      stationFactor: 1 / 200,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝200g",
    },
    37: {
      storageFactor: 1,
      stationFactor: 1 / 200,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝200g",
    },
    38: {
      storageFactor: 1,
      stationFactor: 1 / 340,
      storageUnit: "盒",
      stationUnit: "g",
      note: "1盒＝340g",
    },
    39: {
      storageFactor: 1,
      stationFactor: 1 / 5000,
      storageUnit: "瓶",
      stationUnit: "g",
      note: "1瓶＝5000g（依5L規格換算）",
    },
  },
  pizza: {
    5: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1000g",
    },
    9: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1000g",
    },
    10: {
      storageFactor: 1,
      stationFactor: 1 / 1800,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1800g",
    },
    11: {
      storageFactor: 1,
      stationFactor: 1 / 1100,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1100g",
    },
    16: {
      storageFactor: 1,
      stationFactor: 1 / 250,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝250g",
    },
    18: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "包",
      stationUnit: "g",
      note: "1包＝1000g",
    },
    19: {
      storageFactor: 1,
      stationFactor: 1 / 1000,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝1000g",
    },
    20: {
      storageFactor: 1,
      stationFactor: 1 / 500,
      storageUnit: "袋",
      stationUnit: "g",
      note: "1袋＝500g",
    },
  },
};

// 大巨蛋的周盤順序來自店內冷凍／冷藏／乾貨母表。既有換算規則
// 用品項代碼（無代碼時用品名）重新定位，避免沿用 101 的列號而套錯品項。
if (KitchenStore.current?.id === "taipei-dome") {
  const normalizeItemName = (value) => String(value || "").toLowerCase().replace(/[\s\-_.\/()（）*×]/g, "").replace(/蕃/g, "番");
  const locateNewOrder = (station, oldOrder) => {
    const source = LEGACY_STATION_ITEMS[station]?.find((item) => String(item.order) === String(oldOrder));
    if (!source) return null;
    const match = STATIONS[station]?.items.find((item) =>
      (source.code && item.code && source.code === item.code) ||
      normalizeItemName(source.name) === normalizeItemName(item.name)
    );
    return match?.order ?? null;
  };
  Object.keys(WEEKLY_CONVERSIONS).forEach((station) => {
    const remapped = {};
    Object.entries(WEEKLY_CONVERSIONS[station]).forEach(([oldOrder, config]) => {
      const newOrder = locateNewOrder(station, oldOrder);
      if (newOrder != null) remapped[newOrder] = config;
    });
    WEEKLY_CONVERSIONS[station] = remapped;
  });
  Object.entries(PREP_TO_WEEKLY).forEach(([station, rules]) => {
    rules.forEach((rule) => {
      if (rule.targetCode || rule.targetName) return;
      const newOrder = locateNewOrder(station, rule.order);
      if (newOrder != null) rule.order = newOrder;
    });
  });

  // 大巨蛋指定品項：Weekly 站上統一盤重量 g，再換算成原包裝／kg。
  // 以品項代碼定位，不依賴列號，避免分站或排序調整後套錯換算。
  const domeStationWeightConversions = {
    CKC000004: { grams: 300, storageUnit: "袋", note: "1袋＝300g" },
    "163011CK": { grams: 2760, storageUnit: "瓶", note: "3L橄欖油按淨重2760g＝1瓶" },
    "163006CK": { grams: 250, storageUnit: "瓶", note: "1瓶＝250g" },
    "164009SS": { grams: 400, storageUnit: "罐", note: "1罐＝400g" },
    "164005SS": { grams: 920, storageUnit: "瓶", note: "1瓶＝920g" },
    "162028SS": { grams: 1400, storageUnit: "罐", note: "1罐＝1400g" },
    "162037SS": { grams: 600, storageUnit: "包", note: "1包＝600g" },
    "181003SS": { grams: 1000, storageUnit: "kg", note: "1000g＝1kg" },
    "145002SS": { grams: 1000, storageUnit: "kg", note: "1000g＝1kg" },
    "145014SS": { grams: 25, storageUnit: "盒", note: "1盒＝25g" },
    "144013SS": { grams: 1000, storageUnit: "kg", note: "1000g＝1kg" },
    "145008SS": { grams: 1000, storageUnit: "kg", note: "1000g＝1kg" },
    CKC000025: { grams: 1000, storageUnit: "袋", note: "1袋＝1000g" },
  };
  Object.entries(STATIONS).forEach(([station, stationConfig]) => {
    stationConfig.items.forEach((item) => {
      if (item.code === "142013SS") item.name = "白皮馬鈴薯/公斤";
      if (item.code === "CKC000004" && item.name.includes("番茄沙拉醃汁")) {
        WEEKLY_CONVERSIONS[station] ||= {};
        WEEKLY_CONVERSIONS[station][item.order] = {
          storageFactor: 1,
          stationFactor: 1,
          storageUnit: "包",
          stationUnit: "包",
          note: "番茄沙拉醃汁儲位與站上皆盤包；備料回推亦以包數帶入",
        };
        return;
      }
      const config = domeStationWeightConversions[item.code];
      if (!config) return;
      WEEKLY_CONVERSIONS[station] ||= {};
      WEEKLY_CONVERSIONS[station][item.order] = {
        storageFactor: 1,
        stationFactor: 1 / config.grams,
        storageUnit: config.storageUnit,
        stationUnit: "g",
        note: `站上盤重量；${config.note}`,
      };
    });
  });

  // 大巨蛋 S1 已逐項確認的備料回推規則。備料表盤實際數量，
  // Weekly 站上欄則統一保存成周盤原包裝／原料主單位。
  // 大巨蛋 S1 原始備料表列序（0 起算）；炒菇調味汁由本版附加在第 27 列。
  const cookedMushroom = 0;
  const beefJus = 14;
  const ribeye = 15;
  const potato = 16;
  const lamb = 17;
  const mushroomSauce = 26;
  PREP_TO_WEEKLY.s1 = [
    { targetCode: "142016SS", targetName: "香菇", sources: [[cookedMushroom, 1 / 686]], note: "熟混菇：每686g回推香菇1kg" },
    { targetCode: "142015SS", targetName: "蘑菇", sources: [[cookedMushroom, 1 / 686]], note: "熟混菇：每686g回推洋菇1kg" },
    { targetCode: "142017SS", targetName: "鴻禧菇", sources: [[cookedMushroom, 6 / 686]], note: "熟混菇：每686g回推鴻禧菇6包" },
    { targetCode: "CKH000012", targetName: "褐色雞湯", sources: [[beefJus, 0.5]], note: "牛汁：每盒100g含褐色雞湯50g；回推100G／包褐色雞湯0.5包" },
    { targetCode: "111009CK", targetName: "修清肋眼", sources: [[ribeye, 1]], note: "退冰肋眼：備料盤包，回到周盤站上包數" },
    { targetCode: "CKMM50004", targetName: "舒肥羊排", sources: [[lamb, 1]], note: "退冰羊排：備料盤包，回到周盤站上包數" },
    { targetCode: "142013SS", targetName: "白皮馬鈴薯", sources: [[potato, 0.2]], note: "馬鈴薯：每份200g，回推白皮馬鈴薯0.2kg" },
    { targetCode: "162023SS", targetName: "巴沙米可醋", sources: [[mushroomSauce, 0.5 / 5000]], note: "炒菇調味汁：50%巴沙米可醋，換算5L／瓶" },
    { targetCode: "162001SS", targetName: "瑪薩拉", sources: [[mushroomSauce, 0.25 / 750]], note: "炒菇調味汁：25%瑪薩拉酒，換算750ml／瓶" },
    { targetCode: "161004SS", targetName: "料理白酒", sources: [[mushroomSauce, 0.25 / 5000]], note: "炒菇調味汁：25%料理白酒，換算5L／瓶" },
  ].filter((rule) => rule.sources.every(([index]) => index >= 0));

  WEEKLY_CONVERSIONS.s1[52] = { storageFactor: 1, stationFactor: 1 / 970, storageUnit: "罐", stationUnit: "g", note: "站上盤重量；970g＝1罐" };
  WEEKLY_CONVERSIONS.s1[53] = { storageFactor: 1, stationFactor: 1 / 970, storageUnit: "罐", stationUnit: "g", note: "站上盤重量；970g＝1罐" };
}

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

function itemTotal(station, item, stationInventory = loadInventory(station)) {
  const values = stationInventory[item.order] || {};
  const conversion = item.customPackGrams
    ? { storageFactor: 1, stationFactor: 1 / item.customPackGrams }
    : WEEKLY_CONVERSIONS[station]?.[item.order];
  return conversion
    ? toNumber(values.storage) * conversion.storageFactor +
        toNumber(values.station) * conversion.stationFactor
    : toNumber(values.storage) + toNumber(values.station);
}

function stationOnlyTotal(station, item, stationInventory = loadInventory(station)) {
  const values = stationInventory[item.order] || {};
  const conversion = item?.customPackGrams
    ? { stationFactor: 1 / item.customPackGrams }
    : WEEKLY_CONVERSIONS[station]?.[item.order];
  return toNumber(values.station) * (conversion?.stationFactor ?? 1);
}

function producePrepTotal(item) {
  return SUMMARY_STATION_ORDER.reduce((sum, station) => {
    const matching = STATIONS[station].items.filter((entry) => entry.code === item.code);
    const stationInventory = loadInventory(station);
    return sum + matching.reduce((stationSum, entry) => {
      const values = stationInventory[entry.order] || {};
      if (!values.prepLinked) return stationSum;
      // prepValue 已由 PREP_TO_WEEKLY 換算成品項主單位（kg／盒／袋），
      // 不可再套用站上人工盤 g 的換算倍率，否則會被重複除以 1000。
      return stationSum + toNumber(values.prepValue);
    }, 0);
  }, 0);
}

function produceManualValue(item, produceInventory = loadInventory("produce")) {
  return toNumber(produceInventory[item.order]?.quantity);
}

function normalizedItemName(name) {
  return name
    .replace(/[\s\-_/().（）]/g, "")
    .replace(/蕃/g, "番")
    .replace(/甘蔥/g, "乾蔥")
    .replace(/\d+(?:\.\d+)?(?:KG|K|G|ML|L)/gi, "")
    .toLocaleLowerCase("zh-Hant");
}

const SUMMARY_STATION_ORDER = ["s1", "s2", "pizza", "cold"];
const SUMMARY_CATEGORY_ORDER = ["冷凍", "冷藏", "乾貨"];

function summaryCategory(station, item) {
  if (SUMMARY_CATEGORY_ORDER.includes(item?.location)) return item.location;
  const order = item?.order;
  if (station === "s1") {
    if (order <= 27) return "冷凍";
    if ((order >= 28 && order <= 41) || order >= 52) return "冷藏";
    return "乾貨";
  }
  if (station === "s2") {
    if (order <= 30) return "冷凍";
    if ((order >= 31 && order <= 35) || order === 42) return "冷藏";
    return "乾貨";
  }
  if (station === "pizza") {
    if (order === 1) return "冷凍";
    if (order <= 17) return "冷藏";
    return "乾貨";
  }
  if (order <= 26) return "冷凍";
  if ((order >= 27 && order <= 46) || order === 57 || order === 58 || order >= 70) return "冷藏";
  return "乾貨";
}

function summaryRows() {
  const ambiguousCodes = new Set();
  Object.values(STATIONS).forEach((station) => {
    const seen = new Set();
    station.items.forEach((item) => {
      if (!item.code) return;
      if (seen.has(item.code)) ambiguousCodes.add(item.code);
      seen.add(item.code);
    });
  });

  const rows = new Map();
  SUMMARY_STATION_ORDER.forEach((stationKey, stationRank) => {
    const station = STATIONS[stationKey];
    const stationInventory = loadInventory(stationKey);
    station.items.forEach((item, itemRank) => {
      const afternoonProduce = isAfternoonProduce(item);
      const total = afternoonProduce
        ? stationOnlyTotal(stationKey, item, stationInventory)
        : itemTotal(stationKey, item, stationInventory);
      const normalizedName = normalizedItemName(item.name);
      const key = afternoonProduce && item.code
        ? `code:${item.code}`
        : item.code && !ambiguousCodes.has(item.code)
        ? `code:${item.code}`
        : `name:${normalizedName}|${item.unit}`;
      if (!rows.has(key)) {
        rows.set(key, {
          name: item.name,
          unit: item.unit || "—",
          search: `${item.name} ${item.unit} ${item.code}`.toLocaleLowerCase("zh-Hant"),
          stations: { cold: 0, s1: 0, s2: 0, pizza: 0, produce: 0 },
          category: summaryCategory(stationKey, item),
          stationRank,
          itemRank,
        });
      }
      const row = rows.get(key);
      row.stations[stationKey] += total;
      row.search += ` ${item.name}`.toLocaleLowerCase("zh-Hant");
    });
  });
  if (produceEnabled) {
    const produceInventory = loadInventory("produce");
    AFTERNOON_PRODUCE_ITEMS.forEach((item, itemRank) => {
      const key = `code:${item.code}`;
      const row = rows.get(key) || {
        name: item.name,
        unit: item.unit,
        search: `${item.name} ${item.unit} ${item.code}`.toLocaleLowerCase("zh-Hant"),
        stations: { cold: 0, s1: 0, s2: 0, pizza: 0, produce: 0 },
        category: "冷藏",
        stationRank: -1,
        itemRank,
      };
      // 下午蔬菜欄只放主管盤的冷藏儲位；各站人工站上與備料回推
      // 已包含在各站欄位，這裡不可再加 producePrepTotal，避免重複。
      row.stations.produce = produceManualValue(item, produceInventory);
      row.category = "冷藏";
      row.itemRank = itemRank;
      rows.set(key, row);
    });
  }
  return [...rows.values()].sort((a, b) =>
    SUMMARY_CATEGORY_ORDER.indexOf(a.category) - SUMMARY_CATEGORY_ORDER.indexOf(b.category) ||
    a.stationRank - b.stationRank ||
    a.itemRank - b.itemRank,
  );
}

function setTableHead(mode) {
  if (mode === "summary") {
    inventoryHeadRow.innerHTML = produceEnabled
      ? `<th scope="col">品項</th><th scope="col">單位</th><th scope="col">整店總庫存</th><th scope="col">下午蔬菜</th><th scope="col">S1</th><th scope="col">S2</th><th scope="col">Pizza</th><th scope="col">Cold</th>`
      : `<th scope="col">品項</th><th scope="col">單位</th><th scope="col">整店總庫存</th><th scope="col">S1</th><th scope="col">S2</th><th scope="col">Pizza</th><th scope="col">Cold</th>`;
    return;
  }
  if (mode === "produce") {
    inventoryHeadRow.innerHTML = `<th scope="col">品項</th><th scope="col">單位</th><th scope="col">下午實盤</th><th scope="col">備料回推</th><th scope="col">整店總量</th>`;
    return;
  }
  inventoryHeadRow.innerHTML = `<th scope="col">品項</th><th scope="col">單位</th><th scope="col">儲位</th><th scope="col">站上</th><th scope="col">TOTAL</th>`;
}

function renderSummary() {
  const fragment = document.createDocumentFragment();
  let currentCategory = "";
  summaryRows().forEach((item) => {
    if (item.category !== currentCategory) {
      currentCategory = item.category;
      const categoryRow = document.createElement("tr");
      categoryRow.className = "summary-category-row";
      categoryRow.dataset.search = currentCategory.toLocaleLowerCase("zh-Hant");
      const categoryCell = document.createElement("th");
      categoryCell.colSpan = produceEnabled ? 8 : 7;
      categoryCell.scope = "rowgroup";
      categoryCell.textContent = currentCategory;
      categoryRow.append(categoryCell);
      fragment.append(categoryRow);
    }
    const row = document.createElement("tr");
    row.dataset.search = item.search;
    const nameCell = document.createElement("td");
    nameCell.className = "item-name";
    nameCell.textContent = item.name;
    const unitCell = document.createElement("td");
    unitCell.className = "unit";
    unitCell.dataset.label = "單位";
    unitCell.textContent = item.unit;
    const summarySources = produceEnabled ? ["produce", ...SUMMARY_STATION_ORDER] : SUMMARY_STATION_ORDER;
    const stationCells = summarySources.map((station) => {
      const cell = document.createElement("td");
      cell.className = "summary-station-cell";
      cell.dataset.label = station === "produce" ? "下午蔬菜" : STATIONS[station].label;
      cell.textContent = formatNumber(item.stations[station]);
      return cell;
    });
    const totalCell = document.createElement("td");
    totalCell.className = "total-cell summary-total-cell";
    totalCell.dataset.label = "整店總庫存";
    totalCell.textContent = formatNumber(
      Object.values(item.stations).reduce((sum, value) => sum + value, 0),
    );
    row.append(nameCell, unitCell, totalCell, ...stationCells);
    fragment.append(row);
  });
  inventoryBody.replaceChildren(fragment);
  filterItems();
}

function renderProduce() {
  const fragment = document.createDocumentFragment();
  AFTERNOON_PRODUCE_ITEMS.forEach((item) => {
    const prepValue = producePrepTotal(item);
    const manualValue = produceManualValue(item, inventory);
    const row = document.createElement("tr");
    row.dataset.search = `${item.name} ${item.unit}`.toLocaleLowerCase("zh-Hant");

    const nameCell = document.createElement("td");
    nameCell.className = "item-name";
    nameCell.textContent = item.name;

    const unitCell = document.createElement("td");
    unitCell.className = "unit";
    unitCell.dataset.label = "單位";
    unitCell.textContent = item.unit;

    const inputCell = document.createElement("td");
    inputCell.className = "inventory-field produce-manual-cell";
    inputCell.dataset.label = "下午實盤";
    const input = document.createElement("input");
    input.className = "number-input produce-input";
    input.type = "number";
    input.inputMode = "decimal";
    input.min = "0";
    input.step = "any";
    input.placeholder = "0";
    input.value = inventory[item.order]?.quantity ?? "";
    input.dataset.produceOrder = String(item.order);
    input.setAttribute("aria-label", `${item.name} 下午實盤（${item.unit}）`);
    inputCell.append(input);

    const prepCell = document.createElement("td");
    prepCell.className = "total-cell produce-prep-cell";
    prepCell.dataset.label = "備料回推";
    prepCell.textContent = formatNumber(prepValue);

    const totalCell = document.createElement("td");
    totalCell.className = "total-cell produce-total-cell";
    totalCell.dataset.label = "整店總量";
    totalCell.dataset.produceTotalFor = String(item.order);
    totalCell.textContent = formatNumber(manualValue + prepValue);

    row.append(nameCell, unitCell, inputCell, prepCell, totalCell);
    fragment.append(row);
  });
  inventoryBody.replaceChildren(fragment);
  filterItems();
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
    const snap = await db.collection("dailyInventory").doc(KitchenStore.cloudId(`prep-${station}-${date}`)).get();
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
  let s2ShallotValue = null;
  let coldTomatoValues = null;
  let coldTruffleValue = null;

  function resolveTargetOrder(station, rule) {
    const items = STATIONS[station]?.items || [];
    if (rule.targetCode) {
      const exact = items.find((item) =>
        item.code === rule.targetCode &&
        (!rule.targetName || item.name.includes(rule.targetName))
      );
      if (exact) return exact.order;
    }
    if (rule.targetName) {
      const byName = items.find((item) => item.name.includes(rule.targetName));
      if (byName) return byName.order;
    }
    return rule.order;
  }

  // 先移除上一次抓取產生的回推值，只保留 Weekly 人工輸入的站上數字。
  // 若選擇的日期沒有備料存檔，就不會繼續顯示前一日的回推庫存。
  function clearPreviousPrepLinks(stationInventory) {
    Object.values(stationInventory).forEach((current) => {
      if (!current || typeof current !== "object" || !current.prepLinked) return;
      current.station = current.manualStation ?? "";
      delete current.manualStation;
      delete current.prepValue;
      delete current.prepLinked;
      delete current.prepDate;
      delete current.prepNote;
    });
  }

  function addPrepValue(station, stationInventory, targetOrder, value, note) {
    stationInventory[targetOrder] ||= {};
    const current = stationInventory[targetOrder];
    const manualStation = current.prepLinked
      ? toNumber(current.manualStation)
      : toNumber(current.station);
    current.manualStation = formatNumber(manualStation);
    current.prepValue = formatNumber(value);
    const targetItem = STATIONS[station]?.items.find((item) => String(item.order) === String(targetOrder));
    const conversion = targetItem?.customPackGrams
      ? { stationFactor: 1 / targetItem.customPackGrams }
      : WEEKLY_CONVERSIONS[station]?.[targetOrder];
    const prepInStationInputUnit = conversion?.stationFactor
      ? value / conversion.stationFactor
      : value;
    current.station = formatNumber(manualStation + prepInStationInputUnit);
    current.prepLinked = true;
    current.prepDate = date;
    current.prepNote = note || `由 ${date} 備料盤點換算`;
  }

  for (const [station, rules] of Object.entries(PREP_TO_WEEKLY)) {
    const saved = await getPrepInventory(station, date);
    const stationInventory = loadInventory(station);
    clearPreviousPrepLinks(stationInventory);
    if (!saved?.rows) {
      missingStations += 1;
      localStorage.setItem(storageKey(station), JSON.stringify(stationInventory));
      continue;
    }
    // v18 修正：舊版曾將 S2 甘蔥碎誤寫到第 41 項白米。
    // 只清除由該錯誤回推建立的數字，不影響人員手動盤點的白米。
    if (
      station === "s2" &&
      stationInventory[41]?.prepLinked &&
      /甘蔥碎|乾蔥/.test(stationInventory[41]?.prepNote || "")
    ) {
      delete stationInventory[41].station;
      delete stationInventory[41].prepLinked;
      delete stationInventory[41].prepDate;
      delete stationInventory[41].prepNote;
    }
    const convertedByTarget = new Map();
    rules.forEach((rule) => {
      let hasValue = false;
      const converted = rule.sources.reduce((sum, [rowIndex, factor]) => {
        const raw = saved.rows[rowIndex]?.actual;
        if (raw !== "" && raw != null && Number.isFinite(Number(raw))) hasValue = true;
        return sum + toNumber(raw) * factor;
      }, 0);
      if (!hasValue) return;
      const targetOrder = resolveTargetOrder(station, rule);
      const entry = convertedByTarget.get(targetOrder) || { value: 0, notes: [] };
      entry.value += converted;
      if (rule.note) entry.notes.push(rule.note);
      convertedByTarget.set(targetOrder, entry);
      if (station === "s2" && rule.targetCode === "142004SS") {
        s2ShallotValue = formatNumber(converted);
      }
      if (station === "cold" && rule.targetCode === "168015SS") {
        coldTruffleValue = formatNumber(converted);
      }
      linked += 1;
    });
    convertedByTarget.forEach((entry, targetOrder) => {
      addPrepValue(
        station,
        stationInventory,
        targetOrder,
        entry.value,
        entry.notes.join("；") || `由 ${date} 備料盤點換算`,
      );
    });

    // 醃綜合蕃茄固定拆料：直接用品項代碼定位兩種鮮蕃茄，避免名稱中的
    // 「蕃／番」或「綜合櫻」規格文字差異造成同步漏項。
    if (station === "cold") {
      const tomatoBoxesRaw = saved.rows[13]?.actual;
      if (
        tomatoBoxesRaw !== "" &&
        tomatoBoxesRaw != null &&
        Number.isFinite(Number(tomatoBoxesRaw))
      ) {
        const tomatoKg = toNumber(tomatoBoxesRaw);
        const tomatoTargets = [
          ["144011SS", "聖女蕃茄（中）"],
          ["142022SS", "綜合彩色番茄(綜合櫻)"],
        ];
        tomatoTargets.forEach(([code, name]) => {
          const target = STATIONS.cold.items.find((item) => item.code === code);
          if (!target) return;
          // 兩種番茄已有一般回推規則時，不重複加總，只補強說明。
          if (stationInventory[target.order]?.prepLinked) {
            stationInventory[target.order].prepNote = `醃綜合蕃茄：每盒回推${name} 1kg`;
          } else {
            addPrepValue(
              station,
              stationInventory,
              target.order,
              tomatoKg,
              `醃綜合蕃茄：每盒回推${name} 1kg`,
            );
          }
        });
        coldTomatoValues = formatNumber(tomatoKg);
      }
    }
    localStorage.setItem(storageKey(station), JSON.stringify(stationInventory));
  }

  inventory = loadInventory(activeStation);
  renderItems();
  prepSyncMessage.textContent = linked
    ? `已抓取 ${date} 的盤點資料，共更新 ${linked} 個 Weekly 站上數字${missingStations ? `；${missingStations} 站尚未儲存` : ""}。${coldTomatoValues !== null ? ` COLD聖女蕃茄：${coldTomatoValues} kg；綜合彩色番茄：${coldTomatoValues} kg。` : ""}${coldTruffleValue !== null ? ` COLD夏季5%黑松露醬：${coldTruffleValue}罐。` : ""}${s2ShallotValue !== null ? ` S2乾蔥：${s2ShallotValue} kg。` : ""}`
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
  unitCell.dataset.label = "單位";
  unitCell.textContent = item.unit || "—";

  const storageCell = document.createElement("td");
  storageCell.className = "inventory-field storage-field";
  storageCell.dataset.label = "儲位";
  if (isAfternoonProduce(item)) {
    storageCell.classList.add("produce-storage-managed");
    storageCell.textContent = "下午蔬菜統一盤";
  } else if (conversion?.storageUnit) {
    const storageUnit = document.createElement("span");
    storageUnit.className = "inventory-unit-label";
    storageUnit.textContent = `盤${conversion.storageUnit}`;
    storageCell.append(storageUnit);
  }
  if (!isAfternoonProduce(item)) storageCell.append(createNumberInput(item, "storage"));

  const stationCell = document.createElement("td");
  stationCell.className = "inventory-field station-field";
  stationCell.dataset.label = "站上";
  if (conversion?.stationUnit) {
    const stationUnit = document.createElement("span");
    stationUnit.className = "inventory-unit-label";
    stationUnit.textContent = `盤${conversion.stationUnit}`;
    stationCell.append(stationUnit);
  }
  stationCell.append(createNumberInput(item, "station"));

  const totalCell = document.createElement("td");
  totalCell.className = "total-cell";
  totalCell.dataset.label = "TOTAL";
  totalCell.dataset.totalFor = String(item.order);
  totalCell.setAttribute("aria-label", `${item.name} TOTAL`);

  row.append(nameCell, unitCell, storageCell, stationCell, totalCell);
  updateTotal(item.order, totalCell);
  return row;
}

function updateTotal(order, target) {
  const values = inventory[order] || {};
  const item = STATIONS[activeStation]?.items.find((entry) => String(entry.order) === String(order));
  const conversion = item?.customPackGrams
    ? { storageFactor: 1, stationFactor: 1 / item.customPackGrams }
    : WEEKLY_CONVERSIONS[activeStation]?.[order];
  const total = isAfternoonProduce(item)
    ? toNumber(values.station) * (conversion?.stationFactor ?? 1)
    : conversion
      ? toNumber(values.storage) * conversion.storageFactor +
        toNumber(values.station) * conversion.stationFactor
      : toNumber(values.storage) + toNumber(values.station);
  const cell =
    target || document.querySelector(`[data-total-for="${order}"]`);
  if (cell) cell.textContent = formatNumber(total);
}

function renderItems() {
  if (activeStation === "summary") {
    renderSummary();
    return;
  }
  if (activeStation === "produce") {
    renderProduce();
    return;
  }
  const fragment = document.createDocumentFragment();
  STATIONS[activeStation].items
    .forEach((item) => fragment.append(createRow(item)));
  inventoryBody.replaceChildren(fragment);
  filterItems();
}

function filterItems() {
  const query = searchInput.value.trim().toLocaleLowerCase("zh-Hant");
  let visible = 0;

  inventoryBody.querySelectorAll("tr").forEach((row) => {
    const matches = !query || row.dataset.search.includes(query);
    row.hidden = !matches;
    if (matches && !row.classList.contains("summary-category-row")) visible += 1;
  });

  const totalItems = activeStation === "summary"
    ? inventoryBody.querySelectorAll("tr:not(.summary-category-row)").length
    : activeStation === "produce"
      ? AFTERNOON_PRODUCE_ITEMS.length
      : STATIONS[activeStation].items.length;
  itemCount.textContent = query
    ? `顯示 ${visible} / ${totalItems} 項`
    : `共 ${totalItems} 項`;
  emptyState.hidden = visible !== 0;
}

inventoryBody.addEventListener("input", (event) => {
  const input = event.target.closest(".number-input");
  if (!input) return;

  if (input.dataset.produceOrder) {
    const order = input.dataset.produceOrder;
    inventory[order] ||= {};
    inventory[order].quantity = input.value;
    const item = AFTERNOON_PRODUCE_ITEMS.find((entry) => String(entry.order) === order);
    const totalCell = inventoryBody.querySelector(`[data-produce-total-for="${order}"]`);
    if (item && totalCell) {
      totalCell.textContent = formatNumber(toNumber(input.value) + producePrepTotal(item));
    }
    saveInventory();
    return;
  }

  const order = input.dataset.order;
  const field = input.dataset.field;
  inventory[order] ||= {};
  inventory[order][field] = input.value;
  updateTotal(order);
  saveInventory();
});

inventoryBody.addEventListener("focusin", (event) => {
  const input = event.target.closest(".number-input");
  if (input && !input.readOnly) input.select();
});

inventoryBody.addEventListener("keydown", (event) => {
  const input = event.target.closest(".number-input");
  if (!input || event.key !== "Enter") return;
  event.preventDefault();
  const inputs = [...inventoryBody.querySelectorAll(".number-input:not([readonly])")]
    .filter((field) => !field.closest("tr").hidden);
  const next = inputs[inputs.indexOf(input) + 1];
  if (next) next.focus();
  else input.blur();
});

searchInput.addEventListener("input", filterItems);

stationTabs.addEventListener("click", (event) => {
  const tab = event.target.closest(".station-tab");
  if (!tab || tab.dataset.station === activeStation) return;

  activeStation = tab.dataset.station;
  if (activeStation !== "summary") inventory = loadInventory(activeStation);
  searchInput.value = "";
  document.querySelectorAll(".station-tab").forEach((button) => {
    button.classList.toggle("active", button === tab);
  });
  const isSummary = activeStation === "summary";
  const isProduce = activeStation === "produce";
  inventorySection.setAttribute("aria-label", isSummary
    ? `${KitchenStore.current.name} 各站周盤整店總表`
    : isProduce
      ? `${KitchenStore.current.name} 下午冷藏蔬菜盤點`
      : `${KitchenStore.current.name} ${STATIONS[activeStation].label} 週盤點`);
  prepSyncSection.hidden = isSummary || isProduce;
  itemSettingsButton.hidden = isSummary || isProduce;
  setTableHead(isSummary ? "summary" : isProduce ? "produce" : "station");
  saveState.textContent = "已載入";
  renderItems();
});

renderItems();
setTableHead("station");
inventoryDate.value = dateKey();
loadPrepButton.addEventListener("click", loadPrepInventory);
itemSettingsButton.addEventListener("click", () => {
  if (activeStation === "summary" || activeStation === "produce") return alert("請先選擇 S1、S2、Pizza 或 Cold。");
  KitchenItemSettings.openManager("weekly", activeStation, BASE_STATION_ITEMS[activeStation], () => location.reload());
});
