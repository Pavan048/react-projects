const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userControllers');

// User routes
router.get('/', getHome);
router.get('/aboutus', getAboutUs);
router.get('/timeline', getTimeline);
router.get('/pasthod', getPastHod);
router.get('/hodmessage', getHodMessage);
router.get('/profilecards', getFacultyDirectory);
router.get('/staffdirectory', getStaffDirectory);
router.get('/researchthemes', getResearchThemes);
router.get('/researchcentre', getResearchCentre);
router.get('/programmes', getProgrammes);
router.get('/skilldevelopment', getSkillDevelopment);
router.get('/skilldevabout', getSkillDevAbout);
router.get('/SkillDT', getSkillDevTraining);
router.get('/Skilliiab8', getIIABSection8);
router.get('/news', getNews);
router.get('/events', getEvents);
router.get('/internships', getInternships);
router.get('/projectpositions', getProjectPositions);
router.get('/gallery', getGallery);
router.get('/contactus', getContactUs);

module.exports = router;
