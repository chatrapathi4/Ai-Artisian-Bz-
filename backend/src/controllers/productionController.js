import { Production } from '../models/Production.js';

export const createProduction = async (req, res) => {
  try {
    const { itemName, quantity, materialsUsed, totalCost, notes } = req.body;

    if (!itemName || !quantity) {
      return res.status(400).json({ message: "Item name and quantity are required" });
    }

    const production = await Production.create({
      userId: req.user.id,
      itemName,
      quantity,
      materialsUsed,
      totalCost,
      notes
    });

    return res.status(201).json({
      message: "Production entry created",
      production
    });
  } catch (error) {
    console.error("Create production error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserProductions = async (req, res) => {
  try {
    const productions = await Production.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(productions);
  } catch (error) {
    console.error("Get productions error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const production = await Production.findById(id);

    if (!production) {
      return res.status(404).json({ message: "Production entry not found" });
    }

    if (production.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    return res.status(200).json(production);
  } catch (error) {
    console.error("Get production error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduction = async (req, res) => {
  try {
    const { id } = req.params;
    const production = await Production.findById(id);

    if (!production) {
      return res.status(404).json({ message: "Production entry not found" });
    }

    if (production.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProduction = await Production.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      message: "Production updated",
      production: updatedProduction
    });
  } catch (error) {
    console.error("Update production error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduction = async (req, res) => {
  try {
    const { id } = req.params;
    const production = await Production.findById(id);

    if (!production) {
      return res.status(404).json({ message: "Production entry not found" });
    }

    if (production.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Production.findByIdAndDelete(id);
    return res.status(200).json({ message: "Production deleted" });
  } catch (error) {
    console.error("Delete production error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
