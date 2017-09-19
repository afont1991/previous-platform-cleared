import numeral from 'numeral';

export function formatNumber(num, name){
  if(!num){
    return '';
  }
  if(num === 'Undisclosed'){
    return num
  }
  if(name){
    if(name.split('_')[1] === 'percentage' || name.split('_')[2] === 'percentage' || name === 'yoy_growth' || name === 'percentage'){
      return `${num}%`
    }
    if(name === 'financial_year' || name === 'fiscal_year'){
      if(typeof(num) === 'number'){
        num = num.toString();
      }
      let numArray = num.split('');
      if(!numArray[2] || !numArray[3]){
        return num;
      } else {
        const formattedYear = `FY${numArray[2]}${numArray[3]}`
        return formattedYear;
      }
    }
  }
  let numFormat = '($0a)'
  if(num % 1 !== 0){
    numFormat = '($0.0a)'
  }
  const finalNum = numeral(num * 1000000).format(numFormat);
  // const numStringArray = finalNum.split('');
  // if(numStringArray[numStringArray.length - 2] === '0' && numStringArray[numStringArray.length - 3] === '0'){
  //   return numeral(num).format('($0a)');
  // }
  return finalNum;
}
