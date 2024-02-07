
const IP = require("../models/ip");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.welcomeTest = (req, res) => {
  res.status(200).json({
    success: true,
    description: "Welcome to The World of Magic!!!",
  });
};

exports.getIPs = catchAsyncErrors(async (req, res, next) => {
  const ips = await IP.find();

  res.status(200).json({
    success: true,
    results: ips.length,
    data: ips,
  });
});

// create new Job => /api/v1/job/new
exports.newIP = catchAsyncErrors((req, res, next) => {
  const ip = IP.create(req.body);
  res.status(200).json({
    success: true,
    message: "IP created successfully",
    data: ip,
  });
});

exports.IPlog = catchAsyncErrors(async (req, res, next) => {
  // Get the original client IP address
  const originalIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Reverse the IP address
  const reversedIP = originalIP.split('.').reverse().join('.');

  // Log the original and reversed IP addresses
  console.log(`Original IP: ${originalIP}`);
  console.log(`Reversed IP: ${reversedIP}`);


   res.status(200).json({
    success: true,
    originalIP: originalIP ,
    reversedIP: reversedIP,
  });

 
  // try {
  //   await IP.create({ originalIP, reversedIP });
  //   // await IPModel.create({ originalIP, reversedIP });
  //   console.log('IP addresses saved to MongoDB');
  // } catch (error) {
  //   console.error('Error saving IP addresses to MongoDB:', error);
  // }

  next();

});