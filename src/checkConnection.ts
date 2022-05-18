import logger from './logger';
import portalLogin from './portalLogin';
const isOnline = require('is-online');

const axios = require('axios').default;

const relogin = async () => {
  const loginURL = 'http://192.168.8.254/portal/user-authen.php'
  let hostConnection = false
  try {
    await axios.get(loginURL)
    hostConnection = true
    logger.info('Trying to reconnect...')
  } catch (err) {
    logger.error(err)
    hostConnection = false
  }
  if (!hostConnection) return

  portalLogin()
    .then( e => logger.info('Reconnected!'))
    .catch( err => logger.error('Cannot reconnect :('))
}

const checkConnection = async () => {
  const result = await isOnline()
  if (result) logger.http('Online')
  else {
    logger.error('Cannot connect to the internet')
    await relogin()
  }
}

export default checkConnection;
