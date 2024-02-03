const express = require("express");
const app = express();

module.exports =  (req, res, next) => {
  // Get the original client IP address
  const originalIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Reverse the IP address
  const reversedIP = originalIP.split('.').reverse().join('.');

  // Log the original and reversed IP addresses
  console.log(`Original IP: ${originalIP}`);
  console.log(`Reversed IP: ${reversedIP}`);

  // Save the IP addresses to MongoDB
  // try {
  //   await IPModel.create({ originalIP, reversedIP });
  //   console.log('IP addresses saved to MongoDB');
  // } catch (error) {
  //   console.error('Error saving IP addresses to MongoDB:', error);
  // }

  next();
};

module.exports = app;
