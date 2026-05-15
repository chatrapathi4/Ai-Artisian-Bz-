import { Payment } from '../models/Payment.js';
import mongoose from 'mongoose';

export const createPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, description } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const payment = await Payment.create({
      userId: req.user.id,
      amount,
      paymentMethod,
      description,
      status: 'completed'
    });

    return res.status(201).json({
      message: "Payment recorded",
      payment
    });
  } catch (error) {
    console.error("Create payment error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(payments);
  } catch (error) {
    console.error("Get payments error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPaymentStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const weeklyEarnings = await Payment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfWeek },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const monthlyEarnings = await Payment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfMonth },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const totalEarnings = await Payment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    return res.status(200).json({
      weeklyEarnings: weeklyEarnings[0]?.total || 0,
      monthlyEarnings: monthlyEarnings[0]?.total || 0,
      totalEarnings: totalEarnings[0]?.total || 0
    });
  } catch (error) {
    console.error("Get payment stats error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
