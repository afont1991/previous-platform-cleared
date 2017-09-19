import crypto from 'crypto';
import jsesc from 'jsesc'

let ignoreKeys = ['image_upload', 'teamArray', 'ignoreKeys', 'transactionArray', 'sectionRules', 'sectionKeys']

function emptyValue(value){
  if(typeof(value) === 'string'){
    value = value.replace(/\s/g,'')
  }
  if(value === '' || value === null || value === 0 || value === '0' || value === undefined){
    return true;
  }
  if(value.constructor === Object && Object.keys(value).length === 0 ){
    return true
  }
  if(value.constructor === Array && value.length === 0){
    return true
  }
  return false;
}

function handleBasic(input){
  if(emptyValue(input.value)){
    return null
  } else {
    return input.value
  }
}
function handleNumber(input){
  if(emptyValue(input.value)){
    return null
  } else {
    return parseFloat(input.value)
  }
}
function handleSelects(input){
  if(emptyValue(input.selectedOption)){
    return null
  } else {
    // special case might need work
    if(input.type === 'multi_select'){
      // return the whole array may require more validation down the line
      return input.selectedOption
    } else {
      return input.selectedOption.value
    }
  }
}
function handleRange(input){
  let formattedRanges = []
  Object.keys(input.ranges).forEach((rangeKey)=>{
    let range = input.ranges[rangeKey]
    let newRange = {
      id: range.name,
    }
    if(!emptyValue(range.min_value)){
      newRange.min = parseFloat(range.min_value)
    } else {
      newRange.no_min = true
    }
    if(!emptyValue(range.max_value)){
      newRange.max = parseFloat(range.max_value)
    } else {
      newRange.no_max = true
    }
    if(!emptyValue(newRange)){
      formattedRanges.push(newRange)
    }
  })
  return formattedRanges
}

// Doesnt do much now
function handleDate(input){
  if(emptyValue(input.value)){
    return null
  } else {
    return input.value
  }
}

function inputFormatter(form) {
  let formattedInput = {}
  Object.keys(form).forEach((inputKey)=>{
    let input = form[inputKey]
    if(!ignoreKeys.includes(inputKey) && input.type !== 'image_upload'){
      switch (input.type) {
        case 'select':
        case 'multi_select':
          formattedInput[input.name] = handleSelects(input)
          break;
        case 'multi_range':
          formattedInput[input.name] = handleRange(input)
          break;
        case 'number':
          formattedInput[input.name] = handleNumber(input)
          break;
        case 'date':
          formattedInput[input.name] = handleDate(input)
          break;
        default:
          formattedInput[input.name] = handleBasic(input)
          break;
      }
    }
  })
  return formattedInput
}

export function formatCompany(forms){
  let formattedData = {}
  if(forms.newUser){
    formattedData.user = inputFormatter(forms.newUser)
  }
  formattedData.overview = inputFormatter(forms.overview)
  formattedData.team = forms.team.teamArray
  formattedData.lender_transactions = forms.lender_transactions.transactionArray
  formattedData.borrower_transactions = forms.borrower_transactions.transactionArray
  formattedData.criteria = inputFormatter(forms.criteria)
  return formattedData
}
