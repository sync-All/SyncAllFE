var express = require("express");

const multer = require("multer");
const { fileFilter } = require("../../utils/upload");
const upload = multer({ dest: "uploads/" , limits : {fileSize : 1048576, fieldNameSize: 300, files : 1}}).single("artWork");
const bulkUpload = multer({ dest: "bulkUploads/" , limits : {fileSize : 1048576, fieldNameSize: 300, files : 1}, fileFilter}).single("bulkUpload")
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const SyncUser = require("../../models/usermodel").syncUser;
var router = express.Router();
const trackController = require("../../controllers/trackController");
const { checkUploader, allowUnauthentication, checkSyncUser } = require("../../utils/AuthenticateChecker");


router.get("/verifyTrackUploaded/",checkUploader,asyncHandler(trackController.verifyTrackUpload));

router.post("/trackUpload/",checkUploader,upload,asyncHandler(trackController.trackUpload));
router.post("/invalid_spotify_resolution/",checkUploader,upload,asyncHandler(trackController.invalidSpotifyResolution));
router.delete("/ignore_bulk_resolution/",checkUploader,asyncHandler(trackController.ignoreBulkResolution));
router.delete("/ignore_single_resolution/",checkUploader,asyncHandler(trackController.ignoreSingleResolution));

router.get("/bulkUploadFileDispute/",checkUploader,asyncHandler(trackController.bulkUploadFileDispute));

router.post("/trackBulkUpload/",checkUploader,bulkUpload,asyncHandler(trackController.trackBulkUpload));

router.get("/get-upload-error-history", checkUploader, asyncHandler(trackController.getUploadErrorHistory))

router.get(
  "/allsongs",allowUnauthentication,checkSyncUser,
  asyncHandler(trackController.getAllSongs)
);


router.get(
  "/getTrackByGenre/:genre",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(trackController.getTracksByGenre)
);

router.get(
  "/getTrackByInstrument/:instrument",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(trackController.getTracksByInstrument)
);

router.get(
  "/getTrackByMood/:mood",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(trackController.getTracksByMood)
);

router.get(
  "/querySongs/:queryText",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(trackController.querySongsByIndex)
);
router.get(
  "/freequery/:queryText",
  asyncHandler(trackController.freequerySong)
);

router.get(
  "/queryTrackInfo/:trackId",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(trackController.queryTrackInfo)
);

router.get(
  "/liketrack/:trackId",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(async (req, res, next) => {
    const trackId = req.params.trackId;
    if (req.user.role == "Sync User") {
      if (req.user.tracklist.indexOf(trackId) != -1) {
        res
          .status(202)
          .send(
            "Track already added to your library, to undo action kindly proceed to your library"
          );
        return;
      } else {
        await SyncUser.findByIdAndUpdate(req.user._id, {
          $push: {
            tracklist: trackId,
          },
        }).exec();
        res.status(200).send("Track Added to Your Library");
        return;
      }
    } else {
      res.status(400).send("Bad Request");
    }
  })
);

router.get(
  "/unliketrack/:trackId",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(async (req, res, next) => {
    const trackId = req.params.trackId;
    if (req.user.role == "Sync User") {
      if (req.user.tracklist.indexOf(trackId) != -1) {
        await SyncUser.findByIdAndUpdate(req.user._id, {
          $pull: {
            tracklist: trackId,
          },
        }).exec();
        res.status(200).send("Track Successfully Removed From Library");
        return;
      } else {
        res.status(400).send("Track doesnt exit in your library");
      }
    } else {
      res.status(400).send("Bad Request");
    }
  })
);

module.exports = router;
