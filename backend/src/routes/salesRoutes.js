import express from "express";
import { getSales } from "../services/salesService.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getSales(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
