import superagent from 'superagent'

export const nextSectionAction = (updatedSectionState) => {
  return {
    type: 'NEXT_SECTION',
    updatedSection: updatedSectionState
  }
}

export const SelectSectionAction = (SectionIndex) => {
  return {
    type: 'SELECTED_SECTION',
    SectionIndex: SectionIndex
  }
}
 export const SubmissionStatus = (Status, response) => {
   return {
     type: 'SUBMISSION_STATUS',
     status: status,
     response: response
   }
 }

 export const SubmitFormAction = (formData) => {
   return dispatch => {
     dispatch(SubmissionStatus('sending'))
     superagent
       .post('http://requestb.in/1etperi1')
       .send(formData)
       .set('Accept', 'application/json')
       .end(function(err, res){
         console.log(err);
         console.log(res);
       });
   }
 }
// export const GettingStuff = (stuff) => {
//   return {
//     type: 'GETTING_STUFF',
//     stuff: STUFF
//   }
// }
//
// export const getStuffTestAction = (stuff) => {
//   return dispatch => {
//     dispatch(GettingStuff(stuff))
//     return superagent(`http://www.reddit.com/r/${subreddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(subreddit, json)))
//   }
// }
