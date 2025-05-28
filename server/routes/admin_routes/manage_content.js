const router = require('express').Router()
const Tracks = require('../../models/track.model').track
const contentManager = require('../../controllers/admin/manage_content')

const asynchandler = require('express-async-handler')
const { checkRoles } = require('../../utils/AuthenticateChecker')


router.get(
    '/all_content',
    checkRoles(['ContentAdmin', 'SuperAdmin']),
    asynchandler(contentManager.all_content)
);
  
router.get('/manage_content/review',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentReview))

router.get('/manage_content/search',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.searchContent))

router.post('/manage_content/trackupdate',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentUpdate))

router.post('/manage_content/transferownership',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentTransferOwnership))

module.exports = router