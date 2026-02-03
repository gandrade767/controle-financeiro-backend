const categoriesService = require('./categories.service');

async function create(req, res) {
  try {
    const { name, kind } = req.body;

    if (!name || !kind) {
      return res.status(400).json({ error: "Campos obrigatórios" });
    }

    const category = await categoriesService.create({
      name,
      kind
    });

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


async function list(req, res) {
  try {
    const includeInactive = req.query.includeInactive === "true";
    const categories = await categoriesService.list(includeInactive);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

async function toggleActive(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID da categoria não informado" });
    }

    const category = await categoriesService.toggleActive(id);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
    create,
    list,
    update,
    toggleActive
};