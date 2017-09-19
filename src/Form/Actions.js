import InputValidator from '../Helpers/InputValidator'
import superagent from 'superagent'

export function init(formData){
  return {
    type: 'FORM_INIT',
    formData: formData,
  }
}

export function unmount(){
  return {
    type: 'FORM_UNMOUNT'
  }
}


export function changeSection(form, currentSection, nextSection){
  return function (dispatch) {
    let currentSectionForm = form[currentSection]
    let allowedToProceed = true
    if(currentSectionForm.sectionRules && currentSectionForm.sectionRules.length > 0){
      let ignoreKeys = ['sectionRules', 'submit_data'];
      if(currentSectionForm.ignorekeys){ignoreKeys = ignoreKeys.concat(currentSectionForm.ignorekeys)}

      // Validation required checking inputs
      if(currentSectionForm.sectionRules.includes('validation_required')){
        Object.keys(currentSectionForm).forEach((key)=> {
          if(!ignoreKeys.includes(key)){
            let currentInput = currentSectionForm[key];
            let validationState;
            if(currentInput.type === 'select' ||  currentInput.type === 'multi_select'){
              validationState = InputValidator(currentInput.selectedOption, currentInput.rules, currentInput.type)
            } else {
              validationState = InputValidator(currentInput.value, currentInput.rules)
            }
            dispatch({
              type: 'FORM_INPUT_VALIDATION',
              path: ['formData', currentSection, key],
              validationState: validationState
            })
            if(validationState.class === 'has-error'){allowedToProceed = false}
          }
        })
      }

      // Clearing validation
      if(currentSectionForm.sectionRules.includes('reset_inputs')){
        Object.keys(currentSectionForm).forEach((key)=> {
          if(!ignoreKeys.includes(key)){
            let currentInput = currentSectionForm[key];
            currentInput.validation = '';
          }
        })
      }
    }
    if(allowedToProceed === true){
      dispatch({type: "FORM_CHANGE_SECTION", nextSection:  nextSection})
    }
  }
}

export function onChange(input, path){
  return {
    type: 'FORM_ON_CHANGE',
    path: path,
    input: input,
  }
}

export function onSelect(option, path){
  return {
    type: 'FORM_ON_SELECT',
    option: option,
    path: path,
  }
}

export function onDrop(acceptedFiles, rejectedFiles, path){
  if(rejectedFiles.length === 0){
    return {
      type: 'FORM_ON_FILE_DROP',
      acceptedFiles: acceptedFiles,
      path: path,
    }
  }
}

export function addItem(form, sectionName, newItem, itemName){
  return function (dispatch) {
    let itemSection = form
    let allowedToProceed = true
    let ignoreKeys = ['sectionRules', 'sectionKeys', 'ignoreKeys', itemName]
    if(itemSection.ignoreKeys){ignoreKeys = ignoreKeys.concat(itemSection.ignoreKeys)}
    Object.keys(itemSection).forEach((key)=> {
      if(!ignoreKeys.includes(key)){
        let currentInput = itemSection[key];
        let validationState;
        if(currentInput.type === 'select' ||  currentInput.type === 'multi_select'){
          validationState = InputValidator(currentInput.selectedOption, currentInput.rules, currentInput.type)
        } else {
          validationState = InputValidator(currentInput.value, currentInput.rules)
        }
        dispatch({
          type: 'FORM_INPUT_VALIDATION',
          path: ['formData', sectionName, key],
          validationState: validationState
        })
        if(validationState.class === 'has-error'){allowedToProceed = false}
      }
    })
    if(allowedToProceed){
      newItem.id = form[itemName].length
      dispatch({
        type: 'FORM_ADD_ITEM',
        path: ['formData', sectionName, itemName],
        item: newItem,
      })
    }
  }
}

export function removeItem(form, itemName, itemId, path){
  let chosenID
  let itemArray = form[itemName]
  itemArray.forEach((item, i)=> {
    if(item.id === itemId){
      chosenID = i;
    }
  })
  itemArray.splice(chosenID, 1)
  return {
    type: 'FORM_REMOVE_ITEM',
    path: path.concat(itemName),
    newItemArray: itemArray,
  }
}

export function onRangeChange(value, path, range){
  return {
    type: 'FORM_RANGE_CHANGE',
    value: value,
    path: path,
    range: range,
  }
}

export function onCheck(checked, path){
  return {
    type: 'FORM_UPDATE_CHECKBOX',
    checked: checked,
    path: path,
  }
}

export function handleDate(date, path){
  return {
    type: 'FORM_DATE_UPDATE',
    date: date,
    path: path,
  }
}

function validateSection(formData, dispatch){
    let allowedToProceed = true
    Object.keys(formData).forEach((sectionKey)=>{
      let currentSectionForm = formData[sectionKey]
      if(currentSectionForm.sectionRules && currentSectionForm.sectionRules.length > 0){
        let ignoreKeys = ['sectionRules', 'submit_data'];
        if(currentSectionForm.ignorekeys){ignoreKeys = ignoreKeys.concat(currentSectionForm.ignorekeys)}

        // Validation required checking inputs
        if(currentSectionForm.sectionRules.includes('validation_required')){
          Object.keys(currentSectionForm).forEach((key)=> {
            if(!ignoreKeys.includes(key)){
              let currentInput = currentSectionForm[key];
              let validationState;
              if(currentInput.type === 'select' ||  currentInput.type === 'multi_select'){
                validationState = InputValidator(currentInput.selectedOption, currentInput.rules, currentInput.type)
              } else {
                validationState = InputValidator(currentInput.value, currentInput.rules)
              }
              dispatch({
                type: 'FORM_INPUT_VALIDATION',
                path: ['formData', sectionKey, key],
                validationState: validationState
              })
              if(validationState.class === 'has-error'){allowedToProceed = false}
            }
          })
        }
      }
    })
  return allowedToProceed
}

export function submitForm(formData){
  return function (dispatch) {
    if(validateSection(formData, dispatch) === true){
      dispatch({type: 'FORM_STATUS', status: 'pending'});
      let apiUrl = 'http://localhost:9000';
      if(process.env.NODE_ENV === 'production'){
        apiUrl = 'https://platform.debtmaven.com';
      }
      const logoFile = formData.overview.company_logo.file;
      delete formData.overview.company_logo.file;
      superagent
        .post(apiUrl + formData.submit_url)
        .field("formData",  JSON.stringify(formData))
        .attach('logo', logoFile )
        .set('Accept', 'application/json').withCredentials()
        .end(function(err, res){
          if(err || res.body.status === 'Error'){
            dispatch({type: 'FORM_STATUS', status: 'error', });
            dispatch({type: 'PLATFORM_ERROR', error: err, response: res });
          } else {
            dispatch({type: 'FORM_STATUS', status: 'ready'});
            dispatch({type: 'FORM_SUBMITTED', response: res});
          }
        });
    } else {
      console.log('TOM THIS IS WHERE YOU DISPATCH YOUR SCROLL TO TOP ERROR TOM')
    }
  }
}
