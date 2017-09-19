import superagent from 'superagent'

export function changeSection(newSection){
  return {
    type: 'COMPANY_CREATION_SECTION_CHANGE',
    section: newSection,
  }
}
