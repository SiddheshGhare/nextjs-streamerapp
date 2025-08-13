// global-mongoose.js


import mongoose from "mongoose"

// Create or use an existing cached connection object in the global namespace
// In JS we don't declare types, just store values

// If global.mongoose doesn't exist yet, initialize it
global.mongoose = global.mongoose || { con: null, promise: null };

module.exports = global.mongoose;
