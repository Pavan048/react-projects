// userControllers.js

// Home EJS handler
const getHome = (req, res) => {
  res.render("home");
};

// About Us EJS handler
const getAboutUs = (req, res) => {
  res.render("aboutus");
};

// Timeline EJS handler
const getTimeline = (req, res) => {
  res.render("timeline");
};

// Past HOD EJS handler
const getPastHod = (req, res) => {
  res.render("pasthod");
};

// HOD Message EJS handler
const getHodMessage = (req, res) => {
  res.render("hodmessage");
};

// Faculty Directory EJS handler
const getFacultyDirectory = (req, res) => {
  res.render("facultydirectory");
};

// Staff Directory EJS handler
const getStaffDirectory = (req, res) => {
  res.render("staffdirectory");
};

// Research Themes EJS handler
const getResearchThemes = (req, res) => {
  res.render("researchthemes");
};

// Research Centre EJS handler
const getResearchCentre = (req, res) => {
  res.render("researchcentre");
};

// Programmes EJS handler
const getProgrammes = (req, res) => {
  res.render("programmes");
};

// Skill Development EJS handler
const getSkillDevelopment = (req, res) => {
  res.render("skilldevelopment");
};

// Skill Development About EJS handler
const getSkillDevAbout = (req, res) => {
  res.render("skilldevabout");
};

// Skill Development Training EJS handler
const getSkillDevTraining = (req, res) => {
  res.render("SkillDT");
};

// Skill IIAB Section 8 EJS handler
const getIIABSection8 = (req, res) => {
  res.render("Skilliiab8");
};

// News EJS handler
const getNews = (req, res) => {
  res.render("news");
};

// Events EJS handler
const getEvents = (req, res) => {
  res.render("events");
};

// Internships EJS handler
const getInternships = (req, res) => {
  res.render("interships");
};

// Project Positions EJS handler
const getProjectPositions = (req, res) => {
  res.render("projectpositions");
};

// Gallery EJS handler
const getGallery = (req, res) => {
  res.render("gallery");
};

// Contact Us EJS handler
const getContactUs = (req, res) => {
  res.render("contact");
};

// Add more handlers for other routes here (if needed)

module.exports = {
  getHome,
  getAboutUs,
  getTimeline,
  getPastHod,
  getHodMessage,
  getFacultyDirectory,
  getStaffDirectory,
  getResearchThemes,
  getResearchCentre,
  getProgrammes,
  getSkillDevelopment,
  getSkillDevAbout,
  getSkillDevTraining,
  getIIABSection8,
  getNews,
  getEvents,
  getInternships,
  getProjectPositions,
  getGallery,
  getContactUs,
  // Add other exported handlers here (if needed)
};
