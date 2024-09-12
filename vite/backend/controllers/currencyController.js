const Currency = require('../models/currency');
const Counter = require('../models/counter');

// Add Currency
exports.addCurrency = async (req, res) => {
  try {
    const { currency } = req.body;

    // Check if the currency already exists
    const existingCurrency = await Currency.findOne({ currency });
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
      currency,
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
// Get Currency by currencyID
exports.getCurrencyByID = async (req, res) => {
  try {
    let { currencyID } = req.params;

    // Convert currencyID to a number if necessary
    currencyID = Number(currencyID);

    // Check if the currencyID is a valid number
    if (isNaN(currencyID)) {
      return res.status(400).send('Invalid currencyID');
    }

    // Fetch the currency by its unique currencyID
    const currency = await Currency.findOne({ currencyID });

    if (!currency) return res.status(404).send('Currency not found');

    res.json(currency);
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
    const { currency } = req.body;
    const updatedCurrency = await Currency.findByIdAndUpdate(id, { currency }, { new: true });
    if (!updatedCurrency) return res.status(404).send('Currency not found');
    res.json(updatedCurrency);
  } catch (err) {
    res.status(500).send('Error updating Currency');
  }
};
