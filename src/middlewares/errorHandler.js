module.exports = (err, req, res, next) => {
  console.error("❌ Erro:", err);

  res.status(err.statusCode || 500).json({
    error: err.message || "Erro interno do servidor",
  });
};