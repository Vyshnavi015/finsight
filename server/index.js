require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Transaction = require("./models/Transaction");
const Goal = require("./models/Goal");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Log all requests for debugging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================= MONGODB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// ================= AUTH ROUTES =================
app.use("/auth", authRoutes);

// ================= TRANSACTIONS =================

app.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.post("/transactions", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, source } = req.body;

    const newTransaction = await Transaction.create({
      title,
      amount,
      category,
      source,
      userId: req.userId,
    });

    res.status(201).json({ message: "Transaction Saved", data: newTransaction });
  } catch (err) {
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

app.delete("/transactions/:id", authMiddleware, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    res.json({ message: "Transaction Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete Failed" });
  }
});

app.put("/transactions/:id", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, amount, category },
      { returnDocument: "after" }
    );
    if (!updated) return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Transaction Updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: "Update Failed" });
  }
});

// ================= GOALS =================

app.get("/goals", authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

app.post("/goals", authMiddleware, async (req, res) => {
  try {
    const { title, saved, target } = req.body;

    const newGoal = await Goal.create({
      title,
      saved,
      target,
      userId: req.userId,
    });

    res.status(201).json({ message: "Goal Saved", data: newGoal });
  } catch (err) {
    res.status(500).json({ error: "Failed to save goal" });
  }
});

app.put("/goals/:id", authMiddleware, async (req, res) => {
  try {
    const { title, saved, target } = req.body;
    const updated = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, saved, target },
      { returnDocument: "after" }
    );
    if (!updated) return res.status(404).json({ error: "Goal not found" });
    res.json({ message: "Goal Updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: "Update Failed" });
  }
});

app.delete("/goals/:id", authMiddleware, async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Goal Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete Failed" });
  }
});

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ================= START =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
