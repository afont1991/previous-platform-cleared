
import moment from 'moment'

export function MapProfileToState(ProfileData, State){

  let formData = State.formData

  formData.DealId = ProfileData.basicDetails.id
  formData.title.value = ProfileData.basicDetails.title
  formData.headline.value = ProfileData.basicDetails.headline
  formData.founded.value = ProfileData.basicDetails.founded
  formData.description.value = ProfileData.basicDetails.description
  formData.region.selectedOption = {label: ProfileData.basicDetails.region, value: ProfileData.basicDetails.region}
  formData.financial_review_level.selectedOption = {label: ProfileData.basicDetails.financial_review_level, value: ProfileData.basicDetails.financial_review_level}
  formData.status.selectedOption = {label: ProfileData.basicDetails.status, value: ProfileData.basicDetails.status}
  if(ProfileData.basicDetails.private === true){
    formData.private_mode.selectedOption = {value: 'Private', label: 'Private'}
  }
  if(ProfileData.basicDetails.blind_sponsor === true){
    formData.blind_sponsor.selectedOption = {value: 'Yes', label: 'Yes'}
  }
  if(ProfileData.basicDetails.sponsored === false){
    formData.sponsored.selectedOption = {value: 'non-sponsored', label: 'non-sponsored'}
  } else {
    formData.sponsored.selectedOption = {value: 'sponsored', label: 'sponsored'}
  }
  if(ProfileData.scenarios && ProfileData.scenarios[0]){
    formData.transaction_scenario.selectedOption = {label: ProfileData.scenarios[0].LookupScenario.name, value: ProfileData.scenarios[0].LookupScenario.id}
  }
  formData.termsheet_date.value = moment(ProfileData.basicDetails.termsheet_date)
  formData.additional_information.value = (ProfileData.basicDetails.additional_information ? ProfileData.basicDetails.additional_information : '')
  formData.contacts.selectedOption = ProfileData.keyContacts.map((contact) => {
    return { value: contact.Team.id, label: `${contact.Team.title} - ${contact.Team.first_name} ${contact.Team.last_name}`}
  })
  formData.industries.selectedOption = ProfileData.industries.map((industry) => {
    return { value: industry.LookupIndustry.id, label: industry.LookupIndustry.name}
  })
  formData.debt_type_amount_form.debtTypeAmountArray = ProfileData.typesOfCapital.map((CapitalType, i) => {
    return {
      id: i,
      debt_type: {
        value: CapitalType.LookupTypesOfCapitalId,
        label: CapitalType.LookupTypesOfCapital.name,
      },
      amount: CapitalType.amount,
    }
  })
  if(ProfileData.financials){
    Object.keys(formData.financial_information_form).forEach((key) => {
      if(key !== 'formRules' && ProfileData.financials[key]){
        formData.financial_information_form[key].value = ProfileData.financials[key]
      }
    })
  }
  formData.faq_form.faqArray = ProfileData.faq.map((faq, y) => {
    return {
      id: y,
      question: faq.question,
      answer: faq.answer,
    }
  })

  if(ProfileData.basicDetails.teaser){
    formData.documentSection.teaser.file = true
  }
  if(ProfileData.basicDetails.nda){
    formData.documentSection.nda.file = true
  }
  if(ProfileData.basicDetails.cim){
    formData.documentSection.cim.file = true
  }

  return State
}
