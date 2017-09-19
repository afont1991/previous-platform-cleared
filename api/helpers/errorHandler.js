

export function LogError(newError){
  return global.database.ErrorLogs.create(newError)
}
