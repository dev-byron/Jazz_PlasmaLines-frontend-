const service = require('../services/line.service');

module.exports = {
    async loadLines(req, res) {
        try {
            var response = await service.loadLines();
            return res.status(200).json({ status: 200, data: response, message: "data" });
        } catch (e) {
            res.status(500).send({ msg: 'Internal Server Error: ' + e.message })
        }
    },
    //temporal
    async load() {
        return await service.loadLines();
    },
};
