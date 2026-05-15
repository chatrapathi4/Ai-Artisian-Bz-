export const analyzePriceRange = async (req, res) => {
  try {
    const { itemType, quality, size } = req.body;

    if (!itemType) {
      return res.status(400).json({ message: "Item type is required" });
    }

    const priceRanges = {
      ceramic: { low: 500, high: 2000 },
      textile: { low: 300, high: 1500 },
      woodcraft: { low: 1000, high: 5000 },
      metalwork: { low: 800, high: 3000 },
      jewelry: { low: 500, high: 10000 },
      default: { low: 300, high: 1000 }
    };

    const range = priceRanges[itemType.toLowerCase()] || priceRanges.default;

    let adjustedRange = { ...range };
    if (quality === 'premium') {
      adjustedRange.low = adjustedRange.low * 1.5;
      adjustedRange.high = adjustedRange.high * 1.5;
    } else if (quality === 'basic') {
      adjustedRange.low = adjustedRange.low * 0.7;
      adjustedRange.high = adjustedRange.high * 0.7;
    }

    return res.status(200).json({
      itemType,
      quality: quality || 'standard',
      estimatedPriceRange: {
        min: Math.round(adjustedRange.low),
        max: Math.round(adjustedRange.high),
        recommended: Math.round((adjustedRange.low + adjustedRange.high) / 2)
      }
    });
  } catch (error) {
    console.error("Analyze price error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const detectDefects = async (req, res) => {
  try {
    const { itemType, description } = req.body;

    if (!itemType || !description) {
      return res.status(400).json({ message: "Item type and description are required" });
    }

    const commonDefects = {
      ceramic: ["cracks", "uneven surface", "improper glazing", "color inconsistency"],
      textile: ["loose threads", "uneven weave", "color fading", "shrinkage"],
      woodcraft: ["splinters", "uneven finish", "wood grain issues", "warping"],
      metalwork: ["oxidation", "rough edges", "poor joints", "surface scratches"],
      jewelry: ["misalignment", "loose stones", "tarnishing", "unfinished edges"]
    };

    const defects = commonDefects[itemType.toLowerCase()] || [];

    return res.status(200).json({
      itemType,
      commonDefectsToCheck: defects,
      suggestion: "Inspect your item carefully for these issues. Quality products fetch better prices."
    });
  } catch (error) {
    console.error("Detect defects error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getQualityAdvice = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const adviceDatabase = {
      "finish": "Apply smooth, even finishes. Sand surfaces properly and use quality varnish or polish for durability.",
      "durability": "Use quality materials. Ensure proper construction techniques. Test products before selling.",
      "color": "Use high-quality dyes or paints. Ensure proper mixing and application for consistent colors.",
      "design": "Research market trends. Get feedback from customers. Keep designs simple yet attractive.",
      "price": "Calculate all material and labor costs. Research market rates. Add reasonable profit margin.",
      "material": "Source quality materials from trusted suppliers. Test materials before bulk purchase.",
      "time": "Plan production schedule. Batch similar items. Invest in efficient tools."
    };

    let response = "General quality improvement tips: Focus on attention to detail, use quality materials, practice your craft consistently.";

    const lowerQuestion = question.toLowerCase();
    for (const [key, value] of Object.entries(adviceDatabase)) {
      if (lowerQuestion.includes(key)) {
        response = value;
        break;
      }
    }

    return res.status(200).json({
      question,
      advice: response
    });
  } catch (error) {
    console.error("Quality advice error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
