const { createLogger, transports, format } = require('winston')
const dayjs = require('dayjs')

const formatDate = (dateISO) => {
  const day = dayjs(new Date(dateISO))
  return day.format('DD/MM/YY HH:mm')
}

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  // format.align(),
  format.printf(info => `[${formatDate(info.timestamp)}] ${info.level}: ${info.message}`)
);

const logger = createLogger({
  level: 'http',
  format: format.json(),
  transports: [
    new transports.Console({
      format: alignedWithColorsAndTime,
    }),
  ]
})

export default logger
