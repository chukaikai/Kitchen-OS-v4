(function(){
  function norm(s){return String(s??'').normalize('NFKC').toLowerCase().replace(/[\s　]/g,'').replace(/[－–—_]/g,'-').replace(/公斤/g,'kg').replace(/公克/g,'g').replace(/袋/g,'bag').replace(/包裝/g,'包');}
  function canonicalName(name){
    const n=norm(name);
    if (/(退冰)?綜合起司包|5-?cheese|綜合起司.*10份|綜合起司包10bag\/pack/.test(n)) return '綜合起司包';
    if (/佛特樂(乾酪|起司)?/.test(n)) return '佛特樂起司';
    if (/乾醃熟燻畢可培根/.test(n)) return '乾醃熟燻畢可培根';
    if (/修清肋眼/.test(n)) return '修清肋眼';
    return n;
  }
  function stableIdForName(name){
    const key=canonicalName(name); let h=0x811c9dc5;
    for(let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,0x01000193);}
    return 'kos_'+(h>>>0).toString(16).padStart(8,'0');
  }
  function migrate(doc){
    const d=Object.assign({},doc||{}), exp=d.expected||{}, vals=d.values||{};
    const e=Object.assign({},d.expectedById||{}), v={}, names=Object.assign({},d.namesById||{});
    Object.entries(exp).forEach(([name,q])=>{const id=stableIdForName(name);e[id]=Number(q);names[id]=name;});
    Object.entries(vals).forEach(([name,q])=>{const id=stableIdForName(name);if(Object.prototype.hasOwnProperty.call(e,id)){const n=Number(q);if(Number.isFinite(n))v[id]=n;names[id]=names[id]||name;}});
    d.expectedById=e; d.valuesById=v; d.namesById=names; d.itemIdVersion=1; return d;
  }
  window.KOSStableItemId={norm,canonicalName,stableIdForName,migrate,version:'v15-20260825'};
})();