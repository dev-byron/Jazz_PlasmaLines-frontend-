const service = require('../services/config.service');

module.exports = {
    setInitialConfig() {

    },
    async getRooms() {
      return await service.getRooms();
    },

};
