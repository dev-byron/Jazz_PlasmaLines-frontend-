const service = require('../services/collector.service');

module.exports = {
    async get(req, res) {
     try {
      var response = await service.get();
      return res.status(200).json({ status: 200, data: response, message: "data" }); 
     } catch (e) {
       res.status(500).send({ msg: 'Internal Server Error' })
     }
    },
};
