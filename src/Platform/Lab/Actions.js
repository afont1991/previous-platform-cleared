import superagent from 'superagent'

export function init(formData){
  return {
    type: 'LAB_INIT',
  }
}

export function unmount(formData){
  return {
    type: 'LAB_UNMOUNT',
  }
}

export function onDrop(acceptedFiles, rejectedFiles, path){
  if(rejectedFiles.length === 0){
    return {
      type: 'LAB_ON_FILE_DROP',
      acceptedFiles: acceptedFiles,
      path: path,
    }
  }
}

export function submitForm(formData){
  return function (dispatch) {
    dispatch({type: 'LAB_STATUS', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .post(apiUrl + '/api/lab/upload')
      .attach('testFile', formData.testFile.file )
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || res.body.status === 'Error'){
          dispatch({type: 'LAB_STATUS', status: 'error', });
          dispatch({type: 'PLATFORM_ERROR', error: err, response: res });
        } else {
          dispatch({type: 'LAB_STATUS', status: 'ready'});
        }
      });
  }
}

export function download(){
  return function (dispatch) {
    dispatch({type: 'LAB_STATUS', status: 'pending'});
    let apiUrl = 'http://localhost:9000';
    if(process.env.NODE_ENV === 'production'){
      apiUrl = 'https://platform.debtmaven.com';
    }
    superagent
      .get(apiUrl + '/api/lab/download')
      .set('Accept', 'application/json').withCredentials()
      .end(function(err, res){
        if(err || (res.body && res.body.status === 'Error')){
          dispatch({type: 'LAB_STATUS', status: 'error', });
          dispatch({type: 'PLATFORM_ERROR', error: err, response: res });
        } else {
          console.log(res.body.payload);
          dispatch({type: 'LAB_STATUS', status: 'ready'});
          dispatch({type: 'LAB_SET_DOWNLOAD', url: res.body.payload})
        }
      });
  }
}
