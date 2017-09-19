
export default function responseHandler(res, status, payload, details) {
  return res.send({
    status: status,
    payload: payload,
    details: details
  })
}
