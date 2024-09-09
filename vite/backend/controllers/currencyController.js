const Currency = require('../models/currency');
const Counter = require('../models/counter');

// Add Currency
exports.addCurrency = async (req, res) => {
  try {
    const { currencyName } = req.body;

    // Check if the currency already exists
    const existingCurrency = await Currency.findOne({ currencyName });
    if (existingCurrency) return res.status(400).send('Currency already exists');

    // Get the next currencyID from the counter
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'currency' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new currency with the incremented currencyID
    const newCurrency = new Currency({
      currencyID: counter.sequence_value,
      currencyName,
    });

    await newCurrency.save();
    res.status(201).send('Currency created');
  } catch (err) {
    res.status(500).send('Error creating Currency');
  }
};

// Get Currencies (Paginated)
exports.getCurrency = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    // Fetch currencies, sorting by the newest first
    const currencies = await Currency.find()
      .sort({ _id: -1 }) // Sort by _id in descending order
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Delete Currency
exports.deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await Currency.findByIdAndDelete(id);
    if (!currency) return res.status(404).send('Currency not found');
    res.send('Currency deleted');
  } catch (err) {
    res.status(500).send('Error deleting Currency');
  }
};

// Update Currency
exports.updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const { currencyName } = req.body;
    const updatedCurrency = await Currency.findByIdAndUpdate(id, { currencyName }, { new: true });
    if (!updatedCurrency) return res.status(404).send('Currency not found');
    res.json(updatedCurrency);
  } catch (err) {
    res.status(500).send('Error updating Currency');
  }
};
