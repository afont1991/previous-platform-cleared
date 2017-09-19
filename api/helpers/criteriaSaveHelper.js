
function handleMinMax(CompanyId, value, parentName, name){
  const lookupName = `Lookup${parentName}`;
  const criteriaName = `Criteria${parentName}`;
  if(value.min && value.min !== '' && value.max !== ''){
    const newCriteria = {
      min: value.min,
      max: value.max,
      CompanyId: CompanyId,
    }
    newCriteria[`${lookupName}Id`] = value.id;
    return global.database[criteriaName].create(newCriteria);
  } else {
    return Promise.resolve();
  }
}

function handleSelect(CompanyId, value){
  const lookupName = `Lookup${value.parent}`
  const criteriaName = `Criteria${value.parent}`
  const newCriteria = {CompanyId: CompanyId}
  newCriteria[`${lookupName}Id`] = value.value;
  return global.database[criteriaName].create(newCriteria);
}

const valueHandler = {
  minMax: handleMinMax,
  select: handleSelect
}

export default function criteriaSaveHelper(type, CompanyId, value, parentName, name) {
  return valueHandler[type](CompanyId, value, parentName, name);
}
