// routes/adminRoutes.js
const validateToken = require("../middleware/validateToken");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const {
  registerUser,
  loginUser,
  dashboard,
  logoutUser,
  getRegisterUser,
  getLoginUser,
  getDashboardScroller,
  getDashboardInternships,
  getDashboardEvents,
  getDashboardUpdates,
  dashboardEvents,
  dashboardInternships,
  getDashboardEventsEdit,
  updateDashboardEventsEdit,
  deleteDashboardEventsEdit

} = require("../controllers/adminControllers");


// admin register
router.get("/register", getRegisterUser);
router.post("/register", registerUser);

// admin login
router.get("/login", getLoginUser);
router.post("/login", loginUser);

// admin logout
router.get("/logout", validateToken, logoutUser);

// admin dashboard
router.get("/dashboard", validateToken, dashboard);

// admin dashboard----------------->Internal routes...>
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/events');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to handle form submission
router.post('/dashboard/events',validateToken, upload.single('eventsImage'), dashboardEvents);
router.get("/dashboard/scroller" ,validateToken, getDashboardScroller);
router.get("/dashboard/internships" ,validateToken, getDashboardInternships);
router.get("/dashboard/events" ,validateToken, getDashboardEvents);
router.get("/dashboard/updates" ,validateToken, getDashboardUpdates);
router.post("/dashboard/internships" ,validateToken,dashboardInternships);
// router.post("/dashboard/events", validateToken, upload , dashboardEvents);

router.get('/dashboard/event/edit/:id',validateToken,getDashboardEventsEdit);
router.post('/dashboard/events/update/:id', validateToken, upload.single('eventsImage'), updateDashboardEventsEdit);
router.get("/dashboard/event/delete/:id", validateToken, deleteDashboardEventsEdit);
module.exports = router;
