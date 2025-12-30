const tableService = require("./table.service");

exports.createTable = async (req, res) => {
  const table = await tableService.createTable(req.body);
  res.status(201).json(table);
};

exports.getTables = async (req, res) => {
  const tables = await tableService.getAllTables();
  res.json(tables);
};
