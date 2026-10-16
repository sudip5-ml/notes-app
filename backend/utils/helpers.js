/**
 * Send a standardized error response
 */
const sendError = (res, status, message) => {
  return res.status(status).json({ error: message })
}

module.exports = { sendError }
