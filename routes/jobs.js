const express = require("express");
const router = express.Router();

const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  getJob,
  jobStats,
  welcomeTest,
  testWebhook, // This is for testing github webhook
} = require("../controllers/jobsController");
router.route("/").get(welcomeTest)
router.route("/jobs").get(getJobs);
router.route('/job/:id/:slug').get(getJob)
router.route("/job/new").post(newJob);
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
router.route('/stats/:topic').get(jobStats)


// Test webhook endpoint with ngrok
router.route('/test-webhook').post(testWebhook)

// Take on delete since routes are the same
router.route("/job/:id").put(updateJob).delete(deleteJob);
module.exports = router;


