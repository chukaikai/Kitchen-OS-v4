(function(){
  "use strict";
  if(!window.KitchenItemSettings||typeof centralData==="undefined")return;
  Object.keys(centralData).forEach(stationKey=>{
    centralData[stationKey]=KitchenItemSettings.apply("central",stationKey,centralData[stationKey]);
  });
  const originalOpenStation=window.openStation;
  window.openStation=async function(stationKey){await originalOpenStation(stationKey);if(formType!=="central")return;const top=document.querySelector("#formPanel .top");if(top&&!document.querySelector("#dailyItemSettings")){const button=document.createElement("button");button.id="dailyItemSettings";button.className="btn clear";button.style.cssText="height:38px;margin-left:auto;padding:0 12px";button.textContent="排序／顯示";button.onclick=()=>KitchenItemSettings.openManager("central",station,centralData[station],()=>location.reload());top.append(button)}};
})();
