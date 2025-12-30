const Table = require("./table.schema");

exports.createTable = (data) => {
  return Table.create(data);
};

exports.getAllTables = () => {
  return Table.find();
};
