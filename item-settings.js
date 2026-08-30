(function(){
  "use strict";
  const KEY="kitchen-os:item-settings:v1";
  const UNIFIED_DEFAULTS_MARKER="kitchen-os:unified-dome-defaults:v1";
  const PRODUCE_ORDER_MARKER="kitchen-os:produce-store-order:v1";
  const PRODUCE_ORDERS={
    "taipei101":["142010SS","144011SS","142013SS","142006SS","142012SS","181005SS","145009SS","145003SS","181002SS","145006SS","145008SS","142001SS","142009SS","145002SS","produce-yellow-lemon","145001SS","142016SS","142015SS","142017SS","181004SS","142030SS","142018SS","141001SS","143001SS","142019SS","181003SS","145004SS","142014SS","142003SS","142002SS","142004SS","145015SS"],
    "nangang":["144011SS","142010SS","142012SS","142006SS","142009SS","142020SS","142001SS","181005SS","181002SS","145003SS","145009SS","145008SS","145002SS","145006SS","181004SS","142019SS","142041SS","145015SS","142004SS","143001SS","141001SS","142015SS","142016SS","142017SS","145001SS","142028SS","142030SS","142029SS","168021SS","142014SS","145004SS","181003SS","142013SS","produce-yellow-lemon","144013SS"],
    "taipei-dome":["142010SS","144011SS","142013SS","142006SS","142012SS","181005SS","145009SS","145003SS","181002SS","145006SS","145008SS","142001SS","142037SS","142009SS","145002SS","produce-yellow-lemon","145001SS","142016SS","142015SS","142017SS","181004SS","168021SS","142030SS","142018SS","141001SS","143001SS","142019SS","181003SS","145004SS","142014SS","142003SS","142002SS","142004SS","145015SS","144013SS","142028SS"]
  };
  const TYPES=["weekly","central","prep"];
  const STATIONS=["s1","s2","pizza","cold"];
  if(window.KitchenStore?.current && window.KitchenStore.current.id!=="taipei-dome" && !localStorage.getItem(UNIFIED_DEFAULTS_MARKER)){
    localStorage.removeItem(KEY);
    localStorage.setItem(UNIFIED_DEFAULTS_MARKER,"1");
  }
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){return {}}}
  let cloudDb=null, cloudUnsub=null, cloudReadyResolve=null;
  const cloudReady=new Promise(resolve=>cloudReadyResolve=resolve);
  function cloudDoc(){
    const storeId=window.KitchenStore?.current?.id;
    return cloudDb&&storeId?cloudDb.collection("itemSettings").doc(storeId):null;
  }
  function writeLocal(data){localStorage.setItem(KEY,JSON.stringify(data))}
  function write(data){
    writeLocal(data);
    const ref=cloudDoc();
    // Firestore 不支援巢狀陣列。中央盤點自訂品項本身是陣列，
    // 放進 custom[] 會形成 array-of-arrays，因此雲端改存 JSON 字串。
    if(ref) ref.set({settingsJson:JSON.stringify(data),updatedAt:new Date().toISOString()},{merge:true})
      .catch(e=>console.error("品項設定雲端同步失敗",e));
  }
  function configureCloud(db){
    if(!db||!window.KitchenStore?.current){cloudReadyResolve?.();return cloudReady}
    cloudDb=db;
    if(cloudUnsub) cloudUnsub();
    const ref=cloudDoc();
    let first=true;
    cloudUnsub=ref.onSnapshot(snap=>{
      const d=snap.exists?snap.data():null;
      let remote=null;
      if(d?.settingsJson){
        try{ remote=JSON.parse(d.settingsJson); }catch(e){ console.warn("品項設定 JSON 解析失敗",e); }
      }
      // 相容舊版曾以 settings 物件儲存的資料
      if(!remote && d?.settings && typeof d.settings==="object") remote=d.settings;
      if(remote&&typeof remote==="object"){
        const before=JSON.stringify(read());
        const after=JSON.stringify(remote);
        if(before!==after){writeLocal(remote);if(!first)setTimeout(()=>location.reload(),50)}
      }else if(first){
        const local=read();
        if(Object.keys(local).length) ref.set({settingsJson:JSON.stringify(local),updatedAt:new Date().toISOString()},{merge:true}).catch(console.error);
      }
      first=false;cloudReadyResolve?.();cloudReadyResolve=null;
    },e=>{console.warn("品項設定雲端讀取失敗，暫用本機",e);cloudReadyResolve?.();cloudReadyResolve=null});
    return cloudReady;
  }
  function key(type,station){return type+":"+station}
  function normalizeCfg(value){
    const v=(value&&typeof value==="object")?value:{};
    return {
      ...v,
      order:Array.isArray(v.order)?v.order:[],
      hidden:Array.isArray(v.hidden)?v.hidden:[],
      custom:Array.isArray(v.custom)?v.custom:[]
    };
  }
  function get(type,station){return normalizeCfg(read()[key(type,station)])}
  function set(type,station,value){const all=read();all[key(type,station)]=normalizeCfg(value);write(all)}
  function idFor(type,item,index){
    if(type==="weekly") return item._customId||("base:"+(item.code||"")+":"+item.order+":"+item.name);
    return item._customId||item[6]||("base:"+(item[5]||index+1)+":"+item[0]+":"+(item[1]||""));
  }
  function apply(type,station,base){
    const cfg=get(type,station), hidden=new Set(cfg.hidden||[]), byId=new Map();
    base.forEach((item,index)=>byId.set(idFor(type,item,index),item));
    (cfg.custom||[]).forEach((item,index)=>byId.set(idFor(type,item,index),item));
    if(type==="weekly"&&station==="produce"&&window.KitchenStore?.current&&!localStorage.getItem(PRODUCE_ORDER_MARKER)){
      const wanted=PRODUCE_ORDERS[window.KitchenStore.current.id]||[];
      const rank=new Map(wanted.map((code,index)=>[code,index]));
      const entries=[...byId.entries()];
      entries.sort((a,b)=>{
        const ai=rank.has(a[1].code)?rank.get(a[1].code):Number.MAX_SAFE_INTEGER;
        const bi=rank.has(b[1].code)?rank.get(b[1].code):Number.MAX_SAFE_INTEGER;
        return ai-bi;
      });
      cfg.order=entries.map(([id])=>id);
      cfg.hidden=[];
      set(type,station,cfg);
      localStorage.setItem(PRODUCE_ORDER_MARKER,"1");
    }
    const ids=[...(cfg.order||[]),...byId.keys()].filter((id,i,a)=>a.indexOf(id)===i&&byId.has(id));
    return ids.filter(id=>!hidden.has(id)).map(id=>byId.get(id));
  }
  function openManager(type,station,base,onDone){
    const cfg=get(type,station), all=new Map();
    base.forEach((item,index)=>all.set(idFor(type,item,index),item));
    (cfg.custom||[]).forEach((item,index)=>all.set(idFor(type,item,index),item));
    let ids=[...(cfg.order||[]),...all.keys()].filter((id,i,a)=>a.indexOf(id)===i&&all.has(id));
    const hidden=new Set(cfg.hidden||[]);
    const shade=document.createElement("div");
    shade.style.cssText="position:fixed;inset:0;z-index:20000;background:#0008;padding:18px;overflow:auto";
    shade.innerHTML='<div style="max-width:760px;margin:auto;background:#f6f7f5;border-radius:18px;padding:16px"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><h2 style="margin:0">排序與顯示設定</h2><button data-close style="border:0;border-radius:10px;padding:10px 14px">關閉</button></div><p style="color:#65706a">拖曳調整順序；取消勾選可隱藏。設定只套用目前店鋪。</p><div data-list></div><div style="display:flex;gap:10px;margin-top:14px"><button data-reset style="padding:11px;border:0;border-radius:10px">恢復原始排序</button><button data-save style="flex:1;padding:11px;border:0;border-radius:10px;background:#173b2f;color:#fff;font-weight:800">儲存設定</button></div></div>';
    const box=shade.querySelector('[data-list]');
    function draw(){box.innerHTML='';ids.forEach((id,index)=>{const item=all.get(id),name=type==='weekly'?item.name:item[0],unit=type==='weekly'?item.unit:item[1],row=document.createElement('div');row.draggable=true;row.dataset.id=id;row.style.cssText='display:grid;grid-template-columns:auto auto 1fr;gap:10px;align-items:center;padding:10px 4px;border-bottom:1px solid #e3e7e4;background:#fff';row.innerHTML=`<span style="cursor:grab;font-size:20px">☰</span><input type="checkbox" ${hidden.has(id)?'':'checked'} aria-label="顯示 ${name}"><div><b>${name}</b><small style="display:block;color:#748079">${unit||'未設定單位'}</small></div>`;row.querySelector('input').onchange=e=>e.target.checked?hidden.delete(id):hidden.add(id);row.ondragstart=e=>{e.dataTransfer.setData('text/plain',id);row.style.opacity='.35'};row.ondragend=()=>row.style.opacity='1';row.ondragover=e=>e.preventDefault();row.ondrop=e=>{e.preventDefault();const from=e.dataTransfer.getData('text/plain'),to=id;if(from===to)return;ids.splice(ids.indexOf(from),1);ids.splice(ids.indexOf(to),0,from);draw()};box.append(row)})}
    shade.querySelector('[data-close]').onclick=()=>shade.remove();shade.querySelector('[data-reset]').onclick=()=>{ids=[...all.keys()];hidden.clear();draw()};shade.querySelector('[data-save]').onclick=()=>{cfg.order=ids;cfg.hidden=[...hidden];set(type,station,cfg);shade.remove();onDone&&onDone()};document.body.append(shade);draw();
  }
  window.KitchenItemSettings={KEY,TYPES,STATIONS,read,write,get,set,idFor,apply,openManager,configureCloud,cloudReady};
  setTimeout(()=>{try{if(window.firebase?.apps?.length)configureCloud(window.firebase.firestore())}catch(e){console.warn(e)}},0);
  document.addEventListener("DOMContentLoaded",()=>{const select=document.getElementById("type");if(select&&!select.querySelector('option[value="prep"]')){const option=document.createElement("option");option.value="prep";option.textContent="備料盤點表";select.append(option)}});
})();
