import validator from 'validator'
import passwordValidator from 'password-validator'
const passwordSchema = new passwordValidator();
passwordSchema
  .isMin(8)
  .isMax(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .not().spaces();

function validateSelect(value, rules){
  let validationState = {
    class: 'has-success',
    message: false,
  }
  if(rules.includes('required') && !value){
    return validationState = {
      class: 'has-error',
      message: 'Field is required',
    }
  }
  if(rules.includes('required') && Object.keys(value).length === 0){
    return validationState = {
      class: 'has-error',
      message: 'Field is required',
    }
  }
  return validationState
}

function validateMinMax(value, rules){
  if(value.min === ''){
    value.min = 0;
  }
  if(value.max === ''){
    value.max = 0;
  }
  let validationState = {
    class: 'has-success',
    message: false,
  }
  if(rules.includes('required') && !value.max){
    return validationState = {
      class: 'has-error',
      message: 'Field is required',
    }
  }
  if(rules.includes('required') && value.max === 0){
    return validationState = {
      class: 'has-error',
      message: 'Field is required',
    }
  }
  if(parseInt(value.min, 10) > parseInt(value.max, 10)){
    return validationState = {
      class: 'has-error',
      message: 'Min greater than Max',
    }
  }
  return validationState
}

export default function InputValidator(value, rules, type){
  let validationState = {
    class: 'has-success',
    message: false,
  }
  if(rules.includes('year') && typeof(value) === 'number'){
    value += '';
  }
  if(rules.includes('min_max')){
    return validateMinMax(value, rules)
  }
  if(type === 'image_upload'){
    console.log('need to work on file validation');
    return validationState;
  }
  if(type === 'select' || type === 'multi_select'){
    return validateSelect(value, rules)
  }
  if(rules.includes('required') && !/\S/.test(value)){
    return validationState = {
      class: 'has-error',
      message: 'Field is required',
    }
  }
  if(rules.includes('email') && !validator.isEmpty(value) && !validator.isEmail(value)){
    return validationState = {
      class: 'has-error',
      message: 'Invalid Email',
    }
  }
  if(rules.includes('password') && !validator.isEmpty(value) && !passwordSchema.validate(value)){
    return validationState = {
      class: 'has-error',
      message: 'Password requirements: Min length 8, lowercase AND uppercase letters, numbers ',
    }
  }
  if(rules.includes('year') && !validator.isEmpty(value) && value.length !== 4){
    return validationState = {
      class: 'has-error',
      message: 'Year format EX: 2012',
    }
  }
  if(rules.includes('url') && !validator.isEmpty(value) && !validator.isURL(value)){
    return validationState = {
      class: 'has-error',
      message: 'Format: debtmaven.com or http://www.debtmaven.com',
    }
  }
  return validationState
}
