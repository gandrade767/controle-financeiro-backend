const express = require("express");
const router = express.Router();
const authRoutes = require("../modules/auth/auth.routes");
const accountsRoutes = require("../modules/accounts/accounts.routes");
const dashboardRoutes = require('../modules/dashboard/dashboard.routes');
const usersRoutes = require('../modules/users/users.routes');
const categoriesRoutes = require('../modules/categories/categories.routes');

//auth
router.use("/auth", authRoutes);

//accounts
router.use('/accounts', require('../modules/accounts/accounts.routes'));

//transactions
router.use('/transactions', require('../modules/transactions/transactions.routes'));

//dashboard
router.use('/dashboard', dashboardRoutes);

//users
router.use('/users', usersRoutes);

//categories
router.use('/categories', categoriesRoutes);

router.get("/", (req, res) => {
  res.json({ message: "API Financeiro OK" });
});

module.exports = router;