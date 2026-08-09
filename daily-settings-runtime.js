(function(){
  "use strict";
  if(!window.KitchenItemSettings||typeof centralData==="undefined"||typeof prepData==="undefined")return;
  window.KitchenStoreDefaults?.applyDaily(centralData,prepData);
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
