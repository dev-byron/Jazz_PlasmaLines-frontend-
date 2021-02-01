const service = require('../services/plasma-configuration.service');

module.exports = {
    async verifyIfExist(code) {
        try {
            // var response = await service.loadLines();
            // return res.status(200).json({ status: 200, data: response, message: "data" });
        } catch (e) {
            // res.status(500).send({ msg: 'Internal Server Error: ' + e.message })
        }
    },
    async get(req, res) {
        try {
            var response = await service.get(req.params.code);
            return res.status(200).json(response);
        } catch (e) {
            res.status(500).send({ msg: 'Internal Server Error: ' + e.message })
        }
    },
    async save(req, res) {
        try {
            await service.save();
            return res.status(200).json({ status: 200, data: [] });
        } catch (e) {
            return res.status(500).send({ msg: 'Internal Server Error: ' + e.message })
        }
    },
};
