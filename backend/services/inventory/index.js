const { getProducts } = require("../product");

// Define the calculation functions
function calculateMinInventory(
  avgDailyConsumption,
  reorderPeriod,
  safetyStock
) {
  return avgDailyConsumption * reorderPeriod + safetyStock;
}

function calculateMaxInventory(
  avgDailyConsumption,
  reorderPeriod,
  safetyStock
) {
  return 2 * (avgDailyConsumption * reorderPeriod) + safetyStock;
}

function calculateReorderPoint(avgDailyConsumption, leadTime) {
  return avgDailyConsumption * leadTime;
}

const calculateMinMax = async (data) => {
  const dailyDemand =
    (data.stripe_metadata_stock - data.stripe_metadata_quantity) / 1; // units
  const leadTime = 2; //days
  const safetyStock = 0.5 * dailyDemand * leadTime; // units
  const avgDailyConsumption = dailyDemand; // units per day
  const reorderPeriod = 4; // days
  // Perform the calculations
  const minInventory = calculateMinInventory(
    avgDailyConsumption,
    reorderPeriod,
    safetyStock
  );
  const maxInventory = calculateMaxInventory(
    avgDailyConsumption,
    reorderPeriod,
    safetyStock
  );
  const reorderPoint = calculateReorderPoint(avgDailyConsumption, leadTime);

  return { minInventory, maxInventory, reorderPoint };
};

const calculateAllMinMax = async () => {
  let result = [];
  let error = null;

  try {
    const products = await getProducts();
    for (const product of products) {
      const { minInventory, maxInventory, reorderPoint } =
        await calculateMinMax(product);
      result.push({ minInventory, maxInventory, reorderPoint });
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
};

module.exports = { calculateMinMax, calculateAllMinMax };
