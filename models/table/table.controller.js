const tableService = require("./table.service");

exports.createTable = async (req, res) => {
  try {
    const table = await tableService.createTable(req.body);
    res.status(201).json(table);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Table number already exists" });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const tables = await tableService.getAllTables();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const table = await tableService.updateTable(req.params.id, req.body);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(table);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const table = await tableService.deleteTable(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json({ message: "Table deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
