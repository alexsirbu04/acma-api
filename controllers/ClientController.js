const Client = require("../models/Client");

exports.add = (req, res, next) => {
  const clients = req.body.clients;
  for (const client of clients) {
    Client.findOne({ phone: client.phone }, (err, existingClient) => {
      if (err) return next(err);
      if (existingClient) return next();
      const doc = new Client(client);
      doc.save(err => {
        if (err) return next(err);
      });
    });
  }
  res.json({ added: true });
};
