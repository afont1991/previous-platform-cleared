export function getCompany(req, res) {
  let companyProfile = {}
  global.database.Company.findOne({
      where: {
        id: req.query.company_id
      }
    })
    .then(function(company) {
        if (!company) {
          throw new Error({
              message: 'whatever')
          }
          companyProfile = company.get();
          // Formatting them for display
          companyProfile.aum_display = formatNumber(companyProfile.aum);
          companyProfile.dry_powder_display = formatNumber(companyProfile.dry_powder);
          return global.database.Criteria.findAll({
            where: {
              company_id: req.query.company_id
            }
          })
        })
      .map((crit) => {
          return global.database.SomeStuff.findAll({
              id: crit.id
          })
          .then((someStuff) => {
              crit.stuff = someStuff;

              return crit
          })
      })
      .then((criteria) => {
          console.log(criteria)
      })



      .then((criteria) => {

        companyProfile.criteria = {};
        if (criteria.length !== 0) {
          criteria.forEach((crit) => {
            const critValue = crit.get();
            if (!companyProfile.criteria.hasOwnProperty(critValue.category)) {
              companyProfile.criteria[critValue.category] = [];
            }
            const criteriaValue = criteriaFormater(critValue);
            companyProfile.criteria[critValue.category].push({
              displayVal: criteriaValue,
              rawVal: critValue
            });
          });
        }
        let transactionType = 'LenderTransactions';
        if (companyProfile.type === 'Borrower') {
          transactionType = 'BorrowerTransactions';
        }
        return global.database[transactionType].findAll({
          where: {
            company_id: req.query.company_id
          }
        })
      })
      .then((transactions) => {
        companyProfile.transactions = [];
        transactions.forEach((transaction) => {
          companyProfile.transactions.push(transaction.get());
        });
        return global.database.SimilarCompanies.findAll({
          where: {
            company_id: req.query.company_id
          }
        })
      })
      .then((similarCompanies) => {
        companyProfile.similar_companies = [];
        similarCompanies.forEach((similarCompany) => {
          companyProfile.similar_companies.push(similarCompany.get());
        });
        return global.database.CompanyTeam.findAll({
          where: {
            company_id: req.query.company_id
          }
        })
      }).then((companyTeam) => {
        companyProfile.team = [];
        companyTeam.forEach((team) => {
          companyProfile.team.push(team.get());
        });
        return responseHandler(res, 'Success', companyProfile, '');
      })

    }).catch((err) => {
      return responseHandler(res, 'Error', 'Database error', err);
    });
}

// export function searchDeals(req, res){
//   const minMaxValues = req.body.minMax;
//   const showRevenueFilter = req.body.showRevenueFilter;
//   const showEbitdaFilter = req.body.showEbitdaFilter;
//   const lookupFilters = req.body.chosenFilters;
//   let DealQueryPromises = [];
//   let filterResults = {
//     scenarios: false,
//     industries: false,
//     types: false,
//     financials: false,
//   }
//   if(lookupFilters.scenarios.length !== 0){
//     filterResults.scenarios = true;
//     lookupFilters.scenarios.forEach((scenario, i) => {
//       DealQueryPromises.push(
//         global.database.DealScenario.findAll({where: {LookupScenarioId: scenario.value}}).then((scenarioInstances)=>{
//           let scenarios = [];
//           if(scenarioInstances.length !== 0){
//             scenarios = scenarioInstances.map((scenario) => {
//               return scenario.get().DealId;
//             });
//           }
//           return filterResults.scenarios = scenarios;
//         })
//       );
//     });
//   }
//   if(lookupFilters.industries.length !== 0){
//     filterResults.industries = true;
//     lookupFilters.industries.forEach((industry, i) => {
//       DealQueryPromises.push(
//         global.database.DealIndustry.findAll({where: {LookupIndustryId: industry.value}}).then((industryInstances)=>{
//           let industries = [];
//           if(industryInstances.length !== 0){
//             industries = industryInstances.map((industry) => {
//               return industry.get().DealId;
//             });
//           }
//           return filterResults.industries = industries;
//         })
//       );
//     });
//   }
//   if(lookupFilters.types.length !== 0){
//     filterResults.types = true;
//     lookupFilters.types.forEach((typeAmount, i) => {
//       if(typeAmount.max === 0){
//         typeAmount.max = 9999999999999;
//       }
//       const DealTypeOfCapitalQuery = {
//         where: {
//           LookupTypesOfCapitalId: typeAmount.selected.value,
//           amount: {
//             $between: [typeAmount.min, typeAmount.max],
//           },
//         },
//       }
//       DealQueryPromises.push(
//         global.database.DealTypeOfCapital.findAll(DealTypeOfCapitalQuery).then((TypeOfCapitalInstances)=>{
//           let typesOfCapital = [];
//           if(TypeOfCapitalInstances.length !== 0){
//             typesOfCapital = TypeOfCapitalInstances.map((type) => {
//               return type.get().DealId;
//             });
//           }
//           return filterResults.types = typesOfCapital;
//         })
//       );
//     });
//   }
//   // let DealFinancialsQuery = dealFincialsQuery(minMaxValues);
//   if(showRevenueFilter || showEbitdaFilter){
//     filterResults.financials = true;
//     let DealFinancialsQuery = { where: {}};
//     if(showRevenueFilter){
//       DealFinancialsQuery.where.revenue = {$between: [minMaxValues.revenue_min, minMaxValues.revenue_max]};
//     }
//     if(showEbitdaFilter){
//       DealFinancialsQuery.where.ebitda = {$between: [minMaxValues.ebitda_min, minMaxValues.ebitda_max]};
//     }
//     DealQueryPromises.push(
//       global.database.Financials.findAll(DealFinancialsQuery).then((FinancialInstances)=>{
//         let Financials = [];
//         if(FinancialInstances.length !== 0){
//           Financials = FinancialInstances.map((Financial) => {
//             return Financial.get().DealId;
//           });
//         }
//         return filterResults.financials = Financials;
//       })
//     );
//   }
//   if(!filterResults.scenarios && !filterResults.industries && !filterResults.types && !filterResults.financials) {
//     DealQueryPromises.push(
//       global.database.Deal.findAll().then((dealInstances)=>{
//         let Deals = [];
//         if(dealInstances.length !== 0){
//           Deals = dealInstances.map((deal) => {
//             return deal.get().id;
//           });
//         }
//         return filterResults.dealIds = Deals;
//       })
//     );
//   }
//   Promise.all(DealQueryPromises).then((completedPromises)=>{
//     if(!filterResults.dealIds){
//       let dealIdsWithDupes = [];
//       Object.keys(filterResults).forEach((filterKey) => {
//         dealIdsWithDupes = dealIdsWithDupes.concat(filterResults[filterKey]);
//       });
//       filterResults.dealIds = Array.from(new Set(dealIdsWithDupes));
//       if(filterResults.dealIds.length === 0){
//         return responseHandler(res, 'Success', []);
//       }
//     }
//     return searchHelper.getDealSearchDetails(filterResults.dealIds)
//   }).then((DealSearchDetails)=>{
//     return responseHandler(res, 'Success', DealSearchDetails);
//   }).catch((err)=>{
//     console.log('ERROR', err);
//     return responseHandler(res, 'Error', 'Error Searching Deals', err);
//   });
// }
