const bcrypt = require("bcrypt");
const Admin = require("../model/adminModel");
// events data model
const Events = require("../model/eventsModel");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require("fs");
// post
// inserting event into the database
const dashboardEvents= async(req , res) => {
  try {
    const {
      eventsImage,
      eventsTitle,
      eventsTimings,
      eventsDate,
      eventsMonth,
      eventsDetails,
      eventsSpeaker,
    } = req.body;

    const newEvent = new Events({
      eventsImage: req.file.path,
      eventsTitle,
      eventsTimings,
      eventsDate,
      eventsMonth,
      eventsDetails,
      eventsSpeaker,
    });

    await newEvent.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).send('Error saving event.');
  }
}
// edit events in dashboard
const getDashboardEventsEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findById(id).exec();

    if (!event) {
      return res.redirect('/admin/dashboard');
    }

    // If the event exists, render the 'editEvents.ejs' template with the event data and user data
    res.render("editEvents.ejs", { user: req.user, event: event });
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).send("Error fetching event.");
  }
};

// update post the data into database
const updateDashboardEventsEdit = async (req, res) => {
  const id = req.params.id;
  let new_image = null;
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync('./uploads/events/' + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }

  try {
    await Events.findByIdAndUpdate(id, {
      eventsImage: new_image,
      eventsTitle: req.body.eventsTitle,
      eventsTimings: req.body.eventsTimings, // Corrected the field name to 'eventsTimings'
      eventsDate: req.body.eventsDate,
      eventsMonth: req.body.eventsMonth,
      eventsDetails: req.body.eventsDetails,
      eventsSpeaker: req.body.eventsSpeaker
      // ....................................................>
    });

    console.log("Updated successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).send("Error updating event.");
  }
};
// delte an event

const deleteDashboardEventsEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    if (event.eventsImage !== '') {
      const imagePath = path.join(__dirname, `./uploads/events/${event.eventsImage}`);
      fs.unlinkSync(imagePath);
    }

    console.log("Event deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).send("Error deleting event.");
  }
};


// internships
const dashboardInternships = (req , res) => {
  res.send("dashboardInternships");
}




// end of posts
// Start Of gets

const getRegisterUser = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // Validate input data
  if (!username || !email || !password) {
    return res.status(400).send("All fields are mandatory.");
  }

  try {
    // Check if the user already exists
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    // Redirect to the admin login page
    res.redirect("/admin/login");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
};

const getLoginUser = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input data
  if (!email || !password) {
    return res.status(400).send("All fields are mandatory.");
  }

  try {
    // Find the user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send("User not found.");
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials.");
    }

    // Generate a JWT token with a short expiration time (e.g., 1 hour)
    const accessToken = jwt.sign(
      { admin: { id: admin._id, username: admin.username, email: admin.email } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Store the token in the session along with the decoded user information
    req.session.token = accessToken;
    req.user = { id: admin._id, username: admin.username, email: admin.email };

    // Redirect to the dashboard
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in.");
  }
};
// dashboard for crud operations ------------------------------------------------->
const dashboard = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Events.find({});

    res.render('dashboard', { user: req.user, events }); // Pass the events array to the template
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Error fetching events.');
  }
};


const logoutUser = (req, res) => {
  // Clear the session to log out the user
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while logging out:", err);
    }
    // Redirect the user to the login page after logout
    res.redirect("/admin/login");
  });
};

const getDashboardScroller = (req , res) => {
    res.render("dashboardScroller");
}
// internships get
const getDashboardInternships = (req , res) => {
  res.render("dashboardInternship");
}
// events
const getDashboardEvents = (req , res) => {
  res.render("dashboardEvents");
}
// updates
const getDashboardUpdates = (req , res) => {
  res.render("dashboardupdates");
}



// exports


module.exports = {
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
};
