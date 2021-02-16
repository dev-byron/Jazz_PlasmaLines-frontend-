const service = require('../services/plasma-configuration.service');
module.exports = {
    async get(req, res) {
        try {
            var response = await service.get(req.params.code);
            return res.status(200).json(response);
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error: ' + e.message })
        }
    },
    async getAll(req, res) {
        try {
            var response = await service.getAll();
            return res.status(200).json(response);
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error: ' + e.message })
        }
    },
    async validConfigurationCode(req, res) {
        try {
            var response = await service.validConfigurationCode(req.params.code);
            return res.status(200).json(response);
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error: ' + e.message })
        }
    },
    async save(req, res) {
        try {
            await service.save();
            return res.status(200).json({ status: 200, data: [] });
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error: ' + e.message })
        }
    },
};
