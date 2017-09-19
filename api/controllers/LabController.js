import responseHandler from '../helpers/responseHelper';

export function uploadTest(req, res){
  const S3Params = {
    Bucket: 'debt-maven-public',
    Key: `lab_test`,
  }
  global.S3.putObject(S3Params).promise().then((s3Response)=>{
    console.log(s3Response);
    return responseHandler(res, 'Success', []);
  }).catch((err)=>{
    console.log('ERROR');
    console.log(err);
    return responseHandler(res, 'Success', []);
  })
}

export function downloadTest(req, res){
  const S3Params = {
    Bucket: 'debt-maven-deal-documents',
    Key: `cim-Deal4-3`,
  }
  let fileURl = global.S3.getSignedUrl('getObject', S3Params)
  console.log(fileURl);
  return responseHandler(res, 'Success', fileURl);
}
