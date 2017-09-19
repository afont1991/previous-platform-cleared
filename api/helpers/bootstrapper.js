require('dotenv').config()

import database from '../models/index';
import {lookupCharacteristicData} from './bootstrapperData/lookupCharacteristic';
import {lookupIndustryData} from './bootstrapperData/lookupIndustry';
import {lookupScenarioData} from './bootstrapperData/lookupScenario';
import {lookupTypesOfCapitalData} from './bootstrapperData/lookupTypesOfCapital';
global.database = database;

console.log('?');
global.database.sequelize.sync({force: true}).then(() => {
  return global.database.LookupCharacteristic.bulkCreate(lookupCharacteristicData, { updateDuplicates: true })
  console.log('??');
}).then(() => {
  return global.database.LookupIndustry.bulkCreate(lookupIndustryData, { updateDuplicates: true })
  console.log('?2?');
}).then(() => {
  return global.database.LookupScenario.bulkCreate(lookupScenarioData, { updateDuplicates: true })
  console.log('?3?');
}).then(() => {
  return global.database.LookupTypesOfCapital.bulkCreate(lookupTypesOfCapitalData, { updateDuplicates: true })
  console.log('BOOTSTRAPPED');
}).catch((err) => {
  console.log('Error:', err);
});
