const fs = require('fs');
const logFile = '.\logs\app.log';

fs.writeFileSync(logFile, '', 'utf-8');

const logger = {
    writeToLog: function(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
    
        fs.appendFileSync(logFile, logMessage, 'utf-8');
    }
};

module.exports = logger;
  