# Logger utils
[![Maintainability](https://api.codeclimate.com/v1/badges/7e2767311baae450a014/maintainability)](https://codeclimate.com/github/element-gaming/logger-utils/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/element-gaming/logger-utils/badge.svg?targetFile=package.json)](https://snyk.io/test/github/element-gaming/logger-utils?targetFile=package.json)

Logger utils for the popular [Winston](https://github.com/winstonjs/winston) Node.js logging framework.

## Features
 - Winston console logger
 - Winston file logger with daily rotation
 - Morgan setup

## Installation
```shell
$ yarn add @element-gaming/logger-utils
$ npm install @element-gaming/logger-utils
```

## Usage
### Setup winston logger
```javascript
const { logger } = require('@element-gaming/logger-utils');

logger.log('info', 'This is information', {data: ''})
logger.info('This is information!')
logger.warn('This is a warning!')
logger.error('This is a problem!')
logger.verbose('This is verbose!')
logger.debug('This is a debug!')
```

### Setup morgan logger
```javascript
const { morgan } = require('@element-gaming/logger-utils');

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
```

## Contributing
01. Learn more in the Contributing guide
Please take a look at the [contributing guide](.github/contributing.md).
02. Fork this project
03. Install dependencies (`yarn or npm install`)

## License

[MIT](LICENSE) © 2020 Element Gaming ASD
