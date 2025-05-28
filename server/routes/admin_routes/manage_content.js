const router = require('express').Router()
const Tracks = require('../../models/track.model').track
const contentManager = require('../../controllers/admin/manage_content')

const asynchandler = require('express-async-handler')
const { checkRoles } = require('../../utils/AuthenticateChecker')


router.get(
    '/all_content',
    checkRoles(['ContentAdmin', 'SuperAdmin']),
    asynchandler(async (req, res, next) => {
      const queryObj = {};
  
      // Dynamically include only fields that are present in the query string
      const allowedFields = [
        'mainArtist',
        'releaseType',
        'releaseTitle',
        'trackTitle',
        'isrc',
        'upc',
        'genre',
        'recordingVersion',
        'countryOfRecording',
        'claimingUser',
        'role',
        'copyrightName',
        'copyrightYear',
        'releaseDate',
        'countryOfRelease',
        'audioLang',
        'explicitCont',
        'releaseLabel',
        'uploadStatus',
        'userModel'
      ];
  
      allowedFields.forEach((field) => {
        if (req.query[field] !== undefined) {
          queryObj[field] = req.query[field];
        }
      });
  
      // For array-based filters, use $in if provided as comma-separated values
      const arrayFields = [
        'featuredArtist',
        'featuredInstrument',
        'producers',
        'writers',
        'composers',
        'publishers',
        'mood',
        'tag',
        'spotifyArtistIds'
      ];
  
      arrayFields.forEach((field) => {
        if (req.query[field]) {
          queryObj[field] = { $in: req.query[field].split(',') };
        }
      });
  
      // Date range filtering (e.g. ?fromDate=2024-01-01&toDate=2024-12-31)
      if (req.query.fromDate || req.query.toDate) {
        queryObj.recordingDate = {};
        if (req.query.fromDate) {
          queryObj.recordingDate.$gte = new Date(req.query.fromDate);
        }
        if (req.query.toDate) {
          queryObj.recordingDate.$lte = new Date(req.query.toDate);
        }
      }
  
      const items = await Tracks.find(queryObj)
        .populate('user', 'name email')
        .exec();
  
      res.send(items);
    })
);
  
router.get('/manage_content/review',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentReview))

router.get('/manage_content/search',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.searchContent))

router.post('/manage_content/trackupdate',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentUpdate))

router.post('/manage_content/transferownership',checkRoles(['ContentAdmin','SuperAdmin']),asynchandler(contentManager.contentTransferOwnership))

module.exports = router