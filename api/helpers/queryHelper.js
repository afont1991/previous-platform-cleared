function databaseHelper(companyProfile, callBack){
  if(companyProfile.type === 'Lender'){
    global.database.LenderTransactions.findAll({ where: {company_id: companyProfile.id} }).then((transactions)=> {
      companyProfile.transactions = [];
      if(!transactions){
        return callBack(null, companyProfile);
      } else{
        transactions.forEach((transaction) => {
          companyProfile.transactions.push(transaction.get());
        });
        return callBack(null, companyProfile);
      }
    }).catch((err) =>{
      return callBack(err);
    });
  }
  if(companyProfile.type === 'Borrower'){
    return callBack(null, companyProfile);
  }
}

export function dealFincialsQuery(minMaxValues){
  Object.keys(minMaxValues).forEach((key) => {
    if(minMaxValues[key] === 0 && key.split('_').includes('max')){
      minMaxValues[key] = 9999999999999;
    }
  });
  console.log('rev', minMaxValues.revenue_min, minMaxValues.revenue_max);
  console.log('ebi', minMaxValues.ebitda_min, minMaxValues.ebitda_max);
  return {
    where: {
      revenue: {$between: [minMaxValues.revenue_min, minMaxValues.revenue_max]},
      ebitda: {$between: [minMaxValues.ebitda_min, minMaxValues.ebitda_max]},
    }
  }
}
