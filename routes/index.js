module.exports = (app) => {
  app.use("/api/auth", require("../models/user").routes);
  app.use("/api/tables", require("../models/table").routes);
  app.use("/api/reservations", require("../models/reservation").routes);
};
