const service = require('../services/collector.service');

module.exports = {
    get(req, res) {
      res.send(service.get());
    },
};
