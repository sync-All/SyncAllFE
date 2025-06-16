const router = require('express').Router()
const Tracks = require('../../models/track.model').track
const contentManager = require('../../controllers/admin/manage_content')

const asynchandler = require('express-async-handler')
const { checkAdmin, checkRoles } = require('../../utils/AuthenticateChecker')


router.get(
    '/all_content',
    checkRoles(['ContentAdmin', 'SuperAdmin']),
    asynchandler(contentManager.all_content)
);
  
router.get('/manage_content/review',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentReview))

router.get('/manage_content/search',checkAdmin,asynchandler(contentManager.searchContent))

router.post('/manage_content/trackupdate',checkAdmin,asynchandler(contentManager.contentUpdate))

module.exports = router