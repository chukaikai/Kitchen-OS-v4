(function () {
  "use strict";

  const STORES = [
    { id: "taipei101", name: "台北101" },
    { id: "nangang", name: "南港" },
    { id: "taipei-dome", name: "大巨蛋" },
  ];
  const SELECTION_KEY = "kitchen-os:selected-store";
  const nativeGet = Storage.prototype.getItem;
  const nativeSet = Storage.prototype.setItem;
  const nativeRemove = Storage.prototype.removeItem;
  const nativeKey = Storage.prototype.key;
  const selectedId = nativeGet.call(localStorage, SELECTION_KEY);
  const selected = STORES.find((store) => store.id === selectedId) || null;

  function prefix(key) {
    return `kitchen-os:store:${selected.id}:${key}`;
  }

  function choose(id) {
    if (!STORES.some((store) => store.id === id)) return;
    nativeSet.call(localStorage, SELECTION_KEY, id);
    location.href = "index.html";
  }

  function clearSelection() {
    nativeRemove.call(localStorage, SELECTION_KEY);
    location.href = "index.html";
  }

  window.KitchenStore = {
    stores: STORES,
    current: selected,
    choose,
    clearSelection,
    cloudId(id) {
      if (!selected) return id;
      return `${selected.id}--${id}`;
    },
    legacyCloudId(id) {
      return selected?.id === "taipei101" ? id : null;
    },
  };

  if (!selected) {
    if (!/(^|\/)index\.html$/.test(location.pathname) && !location.pathname.endsWith("/")) {
      location.replace("index.html");
    }
    return;
  }

  // 所有既有本機資料鍵自動加上店鋪範圍。台北101第一次讀取時，
  // 會從舊版未分店的資料遷移，確保升級後原盤點仍保留。
  Storage.prototype.getItem = function (key) {
    if (this !== localStorage || key === SELECTION_KEY) return nativeGet.call(this, key);
    const scoped = nativeGet.call(this, prefix(key));
    if (scoped !== null) return scoped;
    if (selected.id === "taipei101") {
      const legacy = nativeGet.call(this, key);
      if (legacy !== null) nativeSet.call(this, prefix(key), legacy);
      return legacy;
    }
    return null;
  };
  Storage.prototype.setItem = function (key, value) {
    if (this !== localStorage || key === SELECTION_KEY) return nativeSet.call(this, key, value);
    return nativeSet.call(this, prefix(key), value);
  };
  Storage.prototype.removeItem = function (key) {
    if (this !== localStorage || key === SELECTION_KEY) return nativeRemove.call(this, key);
    return nativeRemove.call(this, prefix(key));
  };

  document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.textContent = ".store-context-bar{position:sticky;top:0;z-index:10000;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 16px;background:#172554;color:#fff;font:14px -apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',sans-serif;box-shadow:0 2px 8px #0002}.store-context-bar button{border:1px solid #ffffff66;border-radius:999px;background:#fff;color:#172554;padding:6px 12px;font:inherit;font-weight:700;cursor:pointer}";
    document.head.append(style);
    document.documentElement.dataset.store = selected.id;
    const bar = document.createElement("div");
    bar.className = "store-context-bar";
    bar.innerHTML = `<span>目前店鋪：<strong>${selected.name}</strong></span><button type="button">切換店鋪</button>`;
    bar.querySelector("button").addEventListener("click", clearSelection);
    document.body.prepend(bar);
  });
})();
