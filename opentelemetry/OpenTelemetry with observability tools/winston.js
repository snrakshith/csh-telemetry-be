const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'your-service-name' },
    transports: [
        new winston.transports.Console(),
    ],
});

// Log messages
logger.info('Server started!');
