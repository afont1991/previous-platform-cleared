
import responseHandler from '../helpers/responseHelper';
import * as ErrorHandler from '../helpers/errorHandler.js'

export function getTeam(req, res){
  req.user.getCompany().then((CompanyInstance) => {
    let UserCompanyId = CompanyInstance.get().id
    if(req.query.CompanyId){
      UserCompanyId = req.query.CompanyId;
    }
    return global.database.Team.findAll({ where: {CompanyId: UserCompanyId} })
  }).then((Team)=>{
    const formattedTeam = Team.map((teamMember) => {
      return teamMember.get();
    });
    return responseHandler(res, 'Success', formattedTeam);
  }).catch((err)=>{
    const NewError = {
      type: 'Team',
      reason: 'Error Getting Team',
      details: JSON.stringify(err),
      UserId: req.user.get().id
    }
    ErrorHandler.LogError(NewError)
    return responseHandler(res, 'Error', 'Error Getting Team', err);
  });
}
