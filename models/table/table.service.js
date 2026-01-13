const Table = require("./table.schema");

exports.createTable = async (data) => {
  return Table.create(data);
};

exports.getAllTables = () => {
  return Table.find().sort({ tableNumber: 1 });
};

exports.getTableById = (id) => {
  return Table.findById(id);
};

exports.updateTable = (id, data) => {
  return Table.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTable = (id) => {
  return Table.findByIdAndDelete(id);
};
