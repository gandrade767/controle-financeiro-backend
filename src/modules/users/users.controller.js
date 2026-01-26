const usersService = require('./users.service');

async function createUser(req, res, next) {
    try {
        const result = await usersService.createUser(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function listUsers(req, res, next) {
    try {
        const result = await usersService.listUsers();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const result = await usersService.updateUser(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function updateStatus(req, res, next) {
  try {
    const result = await usersService.updateStatus(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const result = await usersService.updateStatus(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function updatePassword(req, res, next) {
  try {
    const result = await usersService.updatePassword(
      req.params.id,
      req.body
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}


async function deleteUser(req, res, next) {
    try {
        const result = await usersService.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    listUsers,
    updateUser,
    updateStatus,
    updatePassword,
    deleteUser
};