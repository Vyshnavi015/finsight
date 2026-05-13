const http = require("http");

const mongoose = require("mongoose");

const Transaction = require(
  "./models/Transaction"
);

// MongoDB Atlas Connection
mongoose
  .connect(
    "mongodb+srv://vyshu:Vyshu%40015@cluster0.xxxqwid.mongodb.net/finsight?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(
      "MongoDB Connected Successfully"
    );
  })
  .catch((err) => {
    console.log(err);
  });

const server = http.createServer(
  async (req, res) => {

    // CORS
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );

    // GET ALL TRANSACTIONS
    if (
      req.url === "/transactions" &&
      req.method === "GET"
    ) {

      const transactions =
        await Transaction.find();

      res.writeHead(200, {
        "Content-Type":
          "application/json",
      });

      res.end(
        JSON.stringify(transactions)
      );
    }

    // POST TRANSACTION
    else if (
      req.url === "/transactions" &&
      req.method === "POST"
    ) {

      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {

        const data = JSON.parse(body);

        const newTransaction =
          new Transaction({

            title: data.title,

            amount: data.amount,

            category: data.category,

            source: data.source,
          });

        await newTransaction.save();

        res.writeHead(201, {
          "Content-Type":
            "application/json",
        });

        res.end(
          JSON.stringify({
            message:
              "Transaction Saved",
            data: newTransaction,
          })
        );
      });
    }

    // HOME ROUTE
    else {

      res.writeHead(200, {
        "Content-Type": "text/plain",
      });

      res.end("Backend Running");
    }
  }
);

server.listen(5000, () => {
  console.log("Server started");
});