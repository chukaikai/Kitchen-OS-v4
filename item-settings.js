(function(){
  "use strict";
  const KEY="kitchen-os:item-settings:v1";
  const TYPES=["weekly","central","prep"];
  const STATIONS=["s1","s2","pizza","cold"];
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){return {}}}
  function write(data){localStorage.setItem(KEY,JSON.stringify(data))}
  function key(type,station){return type+":"+station}
  function get(type,station){return read()[key(type,station)]||{order:[],hidden:[],custom:[]}}
  function set(type,station,value){const all=read();all[key(type,station)]=value;write(all)}
  function idFor(type,item,index){
    if(type==="weekly") return item._customId||("base:"+(item.code||"")+":"+item.order+":"+item.name);
    return item._customId||item[6]||("base:"+(item[5]||index+1)+":"+item[0]+":"+(item[1]||""));
  }
  function apply(type,station,base){
    const cfg=get(type,station), hidden=new Set(cfg.hidden||[]), byId=new Map();
    base.forEach((item,index)=>byId.set(idFor(type,item,index),item));
    (cfg.custom||[]).forEach((item,index)=>byId.set(idFor(type,item,index),item));
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
  window.KitchenItemSettings={KEY,TYPES,STATIONS,read,write,get,set,idFor,apply,openManager};
  document.addEventListener("DOMContentLoaded",()=>{const select=document.getElementById("type");if(select&&!select.querySelector('option[value="prep"]')){const option=document.createElement("option");option.value="prep";option.textContent="備料盤點表";select.append(option)}});
})();
