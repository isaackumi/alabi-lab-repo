const Job = require("../models/jobs");
const geoCoder = require("../utils/geocoder");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");


// test github webhook => ${BASE_URL}/api/v1/test-webhook
exports.testWebhook =  async (req, res) => {
    const payload = req.body
  console.log(payload)
  // extract relevant properties from req object
  const responseObj = {
    headers: req.headers,
    body: payload
  };
 res.status(200).json({
    success: true,
//    description: payload,
    request:responseObj
  });
}

exports.welcomeTest = (req, res) => {
  res.status(200).json({
    success: true,
    description: "Welcome to Jobbee",
  });
};
exports.getJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  });
});

// create new Job => /api/v1/job/new
exports.newJob = catchAsyncErrors((req, res, next) => {
  const job = Job.create(req.body);
  res.status(200).json({
    success: true,
    message: "Job created successfully",
    data: job,
  });
});

// Update a Job => /api/v1/job/:id
exports.updateJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Job is updated",
    data: job,
  });
});

// Delete a Job => /api/v1/job/:id
exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  job = await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Job is deleted",
  });
});

// Get a single job by slug and id => api/v1/:id/:slug
exports.getJob = catchAsyncErrors(async (req, res, next) => {
  let job = await Job.find({
    $and: [{ _id: req.params.id }, { slug: req.params.slug }],
  });

  if (!job || job.length === 0) {
    return next(new ErrorHandler("Job not found", 404));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

// search jobs within radius => /api/v1/jobs/:zipcode/:distance
exports.getJobsInRadius = catchAsyncErrors(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Getting latitude & longitude from geocoder with zipcode
  const loc = await geoCoder.geocode(zipcode);
  const latitude = loc[0].latitude;
  const longitude = loc[0].longitude;

  const radius = distance / 3963;

  const jobs = await Job.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  });
});

// Get stats about a topic(job)  =>  /api/v1/stats/:topic
exports.jobStats = catchAsyncErrors(async (req, res, next) => {
  const stats = await Job.aggregate([
    {
      $match: { $text: { $search: '"' + req.params.topic + '"' } },
    },
    {
      $group: {
        _id: { $toUpper: "$experience" },
        totalJobs: { $sum: 1 },
        avgPosition: { $avg: "$positions" },
        avgSalary: { $avg: "$salary" },
        minSalary: { $min: "$salary" },
        maxSalary: { $max: "$salary" },
      },
    },
  ]);

  if (stats.length === 0) {
    return next(
      new ErrorHandler(`No stats found for - ${req.params.topic}`, 200)
    );
  }

  res.status(200).json({
    success: true,
    data: stats,
  });
});
