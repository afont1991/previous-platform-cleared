export function getFilteredIds(IDs){
  var idCount = {};
  IDs.forEach((idArray, i)=>{
    idArray.forEach((id, y)=>{
      if(!idCount[id]){
        idCount[id] = 1;
      } else {
        idCount[id] = 1 + idCount[id];
      }
    });
  });
  const uniqueIds = Object.keys(idCount).filter((idCountKey)=>{
    if(idCount[idCountKey] === IDs.length){
      return idCountKey;
    }
  });
  return uniqueIds;
}


export function findNestedValue(nestObj, path){
  let value = path.split(".").reduce(function(value, nextKey) {
    return (typeof value === "undefined" || value === null) ? value : value[nextKey];
  }, nestObj);
  return (typeof value === "undefined" || value === null || value === '') ? null : value;
}
