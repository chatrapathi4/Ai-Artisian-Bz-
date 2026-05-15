import { Production } from '../models/Production.js';
import mongoose from 'mongoose';

export const getWeeklySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const summary = await Production.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfWeek }
        }
      },
      {
        $group: {
          _id: null,
          totalItems: { $sum: '$quantity' },
          totalCost: { $sum: '$totalCost' },
          itemsCount: { $sum: 1 }
        }
      }
    ]);

    return res.status(200).json({
      weekStartDate: startOfWeek,
      summary: summary[0] || { totalItems: 0, totalCost: 0, itemsCount: 0 }
    });
  } catch (error) {
    console.error("Get weekly summary error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const summary = await Production.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalItems: { $sum: '$quantity' },
          totalCost: { $sum: '$totalCost' },
          itemsCount: { $sum: 1 }
        }
      }
    ]);

    return res.status(200).json({
      monthStartDate: startOfMonth,
      summary: summary[0] || { totalItems: 0, totalCost: 0, itemsCount: 0 }
    });
  } catch (error) {
    console.error("Get monthly summary error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
