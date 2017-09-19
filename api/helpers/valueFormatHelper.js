import numeral from 'numeral';

export function formatNumber(num, format){
  if(!num){
    return null;
  }
  const finalNum = numeral(num).format('($0.00a)');
  const numStringArray = finalNum.split('');
  if(numStringArray[numStringArray.length - 2] == 0 && numStringArray[numStringArray.length - 3] == 0){
    return numeral(num).format('($0a)');
  }
  return finalNum;
}

export function criteriaFormater(critValue){
  let finalValue = '';
  if(critValue.sub_category){
    finalValue += critValue.sub_category + ': ';
  }
  if(critValue.value_type === 'string'){
    finalValue += critValue.value_1_text;
    return finalValue;
  } else{
    let firstIntvalue = formatNumber(critValue.value_1_int, critValue.display_format);
    let secondIntValue = formatNumber(critValue.value_2_int, critValue.display_format);
    if(critValue.value_type === 'max'){
      finalValue += secondIntValue + ' max';
    }
    if(critValue.value_type === 'min'){
      finalValue += firstIntvalue + ' min';
    }
    if(critValue.value_type === 'range'){
      finalValue += firstIntvalue;
      finalValue += ' - ' + secondIntValue;
    }
    return finalValue;
  }

}
