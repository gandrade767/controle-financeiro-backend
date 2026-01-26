const categoriesService = require('./categories.service');

async function create(req, res, next) {
    try {
        const result = await categoriesService.create(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function list(req, res, next) {
    try {
        const result = await categoriesService.list();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const result = await categoriesService.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    list,
    update
};