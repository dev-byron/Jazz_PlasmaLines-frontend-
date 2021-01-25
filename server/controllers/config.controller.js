const service = require('../services/config.service');

module.exports = {
    async setInitialConfig() {

    },
    async loadInitialData() {

    },   
    async getRooms() {
      return await service.getRooms();
    },
};
