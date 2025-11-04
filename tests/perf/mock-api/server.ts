import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

// simula latência entre 50 e 120ms
const delay = (min = 50, max = 120) =>
  new Promise((r) => setTimeout(r, Math.random() * (max - min) + min));

// --- Rotas da API ---
app.get("/health", async (req, res) => {
  await delay();
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.post("/orders", async (req, res) => {
  await delay();
  const order = {
    id: Math.floor(Math.random() * 1000000),
    ...req.body,
    status: "created",
  };
  res.status(201).json(order);
});

app.get("/orders/:id", async (req, res) => {
  await delay();
  const { id } = req.params;
  res.status(200).json({
    id,
    status: "confirmed",
    estimatedDelivery: "2025-11-05",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Mock API rodando em http://localhost:${PORT}`);
});
