const service = require('../services/line.service');

module.exports = {
    async reloadLines(req, res) {
        try {
            var response = await service.refreshLines();
            return res.status(200).json({ status: 200, data: response, message: "data" });
        } catch (e) {
            res.status(500).send({ msg: 'Internal Server Error: ' + e.message })
        }
    },
};
