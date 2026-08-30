(function(){
  "use strict";
  if(!window.KitchenItemSettings||typeof centralData==="undefined"||typeof prepData==="undefined")return;
  window.KitchenStoreDefaults?.applyDaily(centralData,prepData);
  if(window.KitchenStore?.current&&Array.isArray(prepData.s1)){
    const update=(pattern,name,unit)=>{
      const row=prepData.s1.find(item=>pattern.test(String(item[0]||"")));
      if(row){row[0]=name;row[1]=unit;}
    };
    update(/^混菇 1000g$/, "熟混菇（盤重量）", "g");
    update(/^退冰肋眼$/, "退冰肋眼", "包");
    update(/^退冰羊排$/, "退冰羊排", "包");
    update(/^馬鈴薯\(200g\)\/份$/, "馬鈴薯（200g／份）", "份");
    if(!prepData.s1.some(item=>/炒菇調味汁/.test(String(item[0]||"")))){
      prepData.s1.push(["炒菇調味汁（盤重量）","g","D+3"]);
    }
  }
  const baseCentralData={},basePrepData={};
  Object.keys(centralData).forEach(stationKey=>{
    baseCentralData[stationKey]=centralData[stationKey].slice();
    basePrepData[stationKey]=prepData[stationKey].slice();
    centralData[stationKey]=KitchenItemSettings.apply("central",stationKey,baseCentralData[stationKey]);
    prepData[stationKey]=KitchenItemSettings.apply("prep",stationKey,basePrepData[stationKey]);
  });
  const originalOpenStation=window.openStation;
    window.openStation=async function(stationKey){await originalOpenStation(stationKey);const top=document.querySelector("#formPanel .top");if(top&&!document.querySelector("#dailyItemSettings")){const button=document.createElement("button");button.id="dailyItemSettings";button.className="btn clear";button.style.cssText="height:38px;margin-left:auto;padding:0 12px";button.textContent="排序／顯示";button.onclick=()=>{const type=formType==="prep"?"prep":"central",data=formType==="prep"?basePrepData[station]:baseCentralData[station];KitchenItemSettings.openManager(type,station,data,()=>location.reload())};top.append(button)}};
})();
