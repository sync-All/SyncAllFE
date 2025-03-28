const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { BadRequestError } = require("../../utils/CustomError");
const { informQuoteRequest } = require("../../utils/mailer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).array("attachments", 5);
const cloudinary = require("cloudinary").v2;
const fs = require("node:fs");
const { syncUser } = require("../../models/usermodel");
const { trackLicense } = require("../../models/track.model");
const {
  createFmtRecord,
  createTVARecord,
  createVideoGamesRecord,
  createSampleRecord,
  createInterpolationRecord,
  createCRBTRecord,
  createSMCRecord,
} = require("../../utils/createAirTable");
const { checkSyncUser } = require("../../utils/AuthenticateChecker");
const { attachNewNotification } = require("../../controllers/userControllers");
const Track = require("../../models/track.model").track;
const fmtRequest = require("../../models/quote.model").fmtRequest;
const tvaRequest = require("../../models/quote.model").tvaRequest;
const videoGamesRequest = require("../../models/quote.model").videoGamesRequest;
const samplingRequest = require("../../models/quote.model").samplingRequest;
const interpolationRequest =
  require("../../models/quote.model").interpolationRequest;
const crbtRequest = require("../../models/quote.model").crbtRequest;
const smcRequest = require("../../models/quote.model").smcRequest;

router.post(
  "/quote-request/tva",
  checkSyncUser,
  upload,
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const trackId = req.body.track_info;
    try {
      const trackDetails = await Track.findOne({ _id: trackId })
        .populate("user")
        .exec();
      if (!trackDetails) {
        throw new BadRequestError("Track does not exists");
      }
      if(req.files) {
        const attachments = [...req.files];
        let attachmentUrlList = [];
        await Promise.all(
          attachments.map(async (attachment) => {
            const linky = await cloudinary.uploader.upload(attachment.path, {
              folder: "tva_attachment_requests",
            });
            attachmentUrlList.push(linky.secure_url);
            fs.unlinkSync(attachment.path);
          })
        );
        const request = new tvaRequest({
          ...req.body,
          user_info: userId,
          attachments: attachmentUrlList,
        });
        await request.save().then(async (uploadResponse) => {
          await createTVARecord(uploadResponse, trackDetails, req.user.email);
          const license = new trackLicense({
            track_name: trackDetails.trackTitle,
            amount: "N/A",
            trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
            quote_id: uploadResponse._id,
            quote_type: "tvaRequest",
            sync_user_info: userId,
            music_uploader_info: trackDetails.user,
          });
          const newGeneratedLicense = await license.save();
          await syncUser.findOneAndUpdate(
            { _id: userId },
            { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
          );
        });
      } else {
        const request = new tvaRequest({ ...req.body, user_info: userId });
        await request.save().then(async (uploadResponse) => {
          await createTVARecord(uploadResponse, trackDetails, req.user.email);
          const license = new trackLicense({
            track_name: trackDetails.trackTitle,
            amount: "N/A",
            trackLink: trackDetails.trackLink || trackDetails.spotifyLink,
            quote_id: uploadResponse._id,
            quote_type: "tvaRequest",
            sync_user_info: userId,
            music_uploader_info: trackDetails.user,
          });
          const newGeneratedLicense = await license.save();
          await syncUser.findOneAndUpdate(
            { _id: userId },
            { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
          );
        });
      }
      attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
      res.send("Request Sent Successfully");
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Invalid Request, try again later");
    }
    
  })
);

router.post(
  "/quote-request/fmt",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  upload,
  asyncHandler(async (req, res, next) => {
    if (req.user.role == "Sync User") {
      const userId = req.user._id;
      const trackId = req.body.track_info;
      try {
        const trackDetails = await Track.findOne({ _id: trackId })
          .populate("user")
          .exec();
        if (!trackDetails) {
          throw new BadRequestError("Track does not exists");
        }
        if (req.files) {
          const attachments = [...req.files];
          let attachmentUrlList = [];
          await Promise.all(
            attachments.map(async (attachment) => {
              await cloudinary.uploader
                .upload(attachment.path, { folder: "fmt_attachment_requests" })
                .then((linky) => {
                  fs.unlinkSync(attachment.path);
                  attachmentUrlList.push(linky.secure_url);
                })
                .catch((error) => {
                  console.log(error);
                  fs.unlinkSync(attachment.path);
                  return;
                });
            })
          );
          const request = new fmtRequest({
            ...req.body,
            user_info: userId,
            attachments: attachmentUrlList,
          });
          await request.save().then(async (uploadResponse) => {
            await createFmtRecord(uploadResponse, trackDetails, req.user.email);
            const license = new trackLicense({
              track_name: trackDetails.trackTitle,
              amount: "N/A",
              trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
              quote_id: uploadResponse._id,
              quote_type: "fmtRequest",
              sync_user_info: userId,
              music_uploader_info: trackDetails.user,
            });
            const newGeneratedLicense = await license.save();
            await syncUser.findOneAndUpdate(
              { _id: userId },
              { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
            );
          });
        } else {
          const request = new fmtRequest({ ...req.body, user_info: userId });
          await request.save().then(async (uploadResponse) => {
            await createFmtRecord(uploadResponse, trackDetails, req.user.email);
            const license = new trackLicense({
              track_name: trackDetails.trackTitle,
              amount: "N/A",
              trackLink: trackDetails.trackLink || trackDetails.spotifyLink,
              quote_id: uploadResponse._id,
              quote_type: "fmtRequest",
              sync_user_info: userId,
              music_uploader_info: trackDetails.user,
            });
            const newGeneratedLicense = await license.save();
            await syncUser.findOneAndUpdate(
              { _id: userId },
              { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
            );
          });
        }
        attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
        res.send("Request Sent Successfully");
      } catch (error) {
        console.log(error);
        throw new BadRequestError("Invalid Request, try again later");
      }
    } else {
      throw new BadRequestError("Invalid Request, try again later");
    }
  })
);

router.post(
  "/quote-request/video_game",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  upload,
  asyncHandler(async (req, res, next) => {
    if (req.user.role == "Sync User") {
      const userId = req.user._id;
      const trackId = req.body.track_info;
      try {
        const trackDetails = await Track.findOne({ _id: trackId })
          .populate("user")
          .exec();
        if (!trackDetails) {
          throw new BadRequestError("Track does not exists");
        }
        if (req.files) {
          const attachments = [...req.files];
          const attachmentUrlList = [];
          await Promise.all(
            attachments.map(async (attachment) => {
              await cloudinary.uploader
                .upload(attachment.path, {
                  folder: "video_game_request_attachments",
                })
                .then((linky) => {
                  fs.unlinkSync(attachment.path);
                  attachmentUrlList.push(linky.secure_url);
                })
                .catch((error) => {
                  console.log(error);
                  fs.unlinkSync(attachment.path);
                  return;
                });
            })
          );
          const request = new videoGamesRequest({
            ...req.body,
            user_info: userId,
            attachments: attachmentUrlList,
          });
          await request.save().then(async (uploadResponse) => {
            await createVideoGamesRecord(
              uploadResponse,
              trackDetails,
              req.user.email
            );
            const license = new trackLicense({
              track_name: trackDetails.trackTitle,
              amount: "N/A",
              trackLink: trackDetails.trackLink || trackDetails.spotifyLink,
              quote_id: uploadResponse._id,
              quote_type: "videoGamesRequest",
              sync_user_info: userId,
              music_uploader_info: trackDetails.user,
            });
            const newGeneratedLicense = await license.save();
            await syncUser.findOneAndUpdate(
              { _id: userId },
              { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
            );
          });
        } else {
          const request = new videoGamesRequest({
            ...req.body,
            user_info: userId,
          });
          await request.save().then(async (uploadResponse) => {
            await createVideoGamesRecord(
              uploadResponse,
              trackDetails,
              req.user.email
            );
            const license = new trackLicense({
              track_name: trackDetails.trackTitle,
              amount: "N/A",
              trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
              quote_id: uploadResponse._id,
              quote_type: "videoGamesRequest",
              sync_user_info: userId,
              music_uploader_info: trackDetails.user,
            });
            const newGeneratedLicense = await license.save();
            await syncUser.findOneAndUpdate(
              { _id: userId },
              { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
            );
          });
        }
        attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
        res.send("Request Sent Successfully");
      } catch (error) {
        console.log(error);
        throw new BadRequestError("An error occured, please try again later");
      }
    } else {
      throw new BadRequestError("Invalid Request, try again later");
    }
  })
);

router.post(
  "/quote-request/sampling",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  upload,
  asyncHandler(async (req, res, next) => {
    if (req.user.role == "Sync User") {
      const userId = req.user._id;
      const trackId = req.body.track_info;
      try {
        const trackDetails = await Track.findOne({ _id: trackId })
          .populate("user")
          .exec();
        if (!trackDetails) {
          throw new BadRequestError("Track not found");
        }
        if (req.files) {
          const attachments = [...req.files];
          let attachmentUrlList = [];
          await Promise.all(
            attachments.map(async (attachment) => {
              const linky = await cloudinary.uploader.upload(attachment.path, {
                folder: "sampling_attachment_requests",
              });
              attachmentUrlList.push(linky.secure_url);
              fs.unlinkSync(attachment.path);
            })
          );
          const request = new samplingRequest({
            ...req.body,
            user_info: userId,
            attachments: attachmentUrlList,
          });
          await request.save().then(async (uploadResponse) => {
            // create airtable sample record
            await createSampleRecord(
              uploadResponse,
              trackDetails,
              req.user.email
            );
            // end---
            const license = new trackLicense({
              track_name: trackDetails.trackTitle,
              amount: "N/A",
              trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
              quote_id: uploadResponse._id,
              quote_type: "samplingRequest",
              sync_user_info: userId,
              music_uploader_info: trackDetails.user,
            });
            const newGeneratedLicense = await license.save();
            await syncUser.findOneAndUpdate(
              { _id: userId },
              { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
            );
          });
        } else {
          // informQuoteRequest('deemajor230600@gmail.com')
          const request = new samplingRequest({
            ...req.body,
            user_info: userId,
          });
          await request.save().then(async (uploadResponse) => {
            // create airtable sample record
            await createSampleRecord(
              uploadResponse,
              trackDetails,
              req.user.email
            );
            // end---
            const license = new trackLicense({
              track_name: trackDetails.trackTitle,
              amount: "N/A",
              trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
              quote_id: uploadResponse._id,
              quote_type: "samplingRequest",
              sync_user_info: userId,
              music_uploader_info: trackDetails.user,
            });
            const newGeneratedLicense = await license.save();
            await syncUser.findOneAndUpdate(
              { _id: userId },
              { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
            );
          });
        }
        attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
        res.send("Request Sent Successfully");
      } catch (error) {
        console.log(error);
        throw new BadRequestError("Invalid Request, try again later");
      }
    } else {
      throw new BadRequestError("Invalid Request, try again later");
    }
  })
);

router.post(
  "/quote-request/interpolation",
  checkSyncUser,
  upload,
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const trackId = req.body.track_info;
    try {
      const trackDetails = await Track.findOne({ _id: trackId })
        .populate("user")
        .exec();
      if (!trackDetails) {
        throw new BadRequestError("Track does not exists");
      }
      if (req.files) {
        const attachments = [...req.files];
        let attachmentUrlList = [];
        await Promise.all(
          attachments.map(async (attachment) => {
            const linky = await cloudinary.uploader.upload(attachment.path, {
              folder: "interpolation_attachment_requests",
            });
            attachmentUrlList.push(linky.secure_url);
            fs.unlinkSync(attachment.path);
          })
        );
        const request = new interpolationRequest({
          ...req.body,
          user_info: userId,
          attachments: attachmentUrlList,
        });
        await request.save().then(async (uploadResponse) => {
          // create airtable interpolation record
          await createInterpolationRecord(
            uploadResponse,
            trackDetails,
            req.user.email
          );
          // end---
          const license = new trackLicense({
            track_name: trackDetails.trackTitle,
            amount: "N/A",
            trackLink: trackDetails.trackLink || trackDetails.spotifyLink,
            quote_id: uploadResponse._id,
            quote_type: "interpolationRequest",
            sync_user_info: userId,
            music_uploader_info: trackDetails.user,
          });
          const newGeneratedLicense = await license.save();
          await syncUser.findOneAndUpdate(
            { _id: userId },
            { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
          );
        });
      } else {
        const request = new interpolationRequest({
          ...req.body,
          user_info: userId,
        });
        await request.save().then(async (uploadResponse) => {
          // create airtable interpolation record
          await createInterpolationRecord(
            uploadResponse,
            trackDetails,
            req.user.email
          );
          // end---
          const license = new trackLicense({
            track_name: trackDetails.trackTitle,
            amount: "N/A",
            trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
            quote_id: uploadResponse._id,
            quote_type: "interpolationRequest",
            sync_user_info: userId,
            music_uploader_info: trackDetails.user,
          });
          const newGeneratedLicense = await license.save();
          await syncUser.findOneAndUpdate(
            { _id: userId },
            { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
          );
        });
      }
      attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
      res.send("Request Sent Successfully");
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Invalid Request, try again later");
    }
    
  })
);

router.post(
  "/quote-request/crbt",
  checkSyncUser,
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const trackId = req.body.track_info;
    try {
      const trackDetails = await Track.findOne({ _id: trackId }).populate("user").exec();
      if (!trackDetails) {
        throw new BadRequestError("Track does not exists");
      }
      const request = new crbtRequest({ ...req.body, user_info: userId });
      await request.save().then(async (uploadResponse) => {
        // create airtable interpolation record
        await createCRBTRecord(uploadResponse, trackDetails, req.user.email);
        // end---
        const license = new trackLicense({
          track_name: trackDetails.trackTitle,
          amount: "N/A",
          trackLink: trackDetails.trackLink || trackDetails.spotifyLink,
          quote_id: uploadResponse._id,
          quote_type: "crbtRequest",
          sync_user_info: userId,
          music_uploader_info: trackDetails.user,
        });
        const newGeneratedLicense = await license.save();
        await syncUser.findOneAndUpdate(
          { _id: userId },
          { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
        );
        attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
        res.send("Request Sent Successfully");
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Invalid Request, try again later");
    }
    
  })
);

router.post(
  "/quote-request/smc",
  checkSyncUser,
  upload,
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const trackId = req.body.track_info;
    try {
      const trackDetails = await Track.findOne({ _id: trackId })
        .populate("user")
        .exec();
      if (!trackDetails) {
        throw new BadRequestError("Track does not exists");
      }
      if (req.files) {
        const attachments = [...req.files];
        let attachmentUrlList = [];
        await Promise.all(
          attachments.map(async (attachment) => {
            const linky = await cloudinary.uploader.upload(attachment.path, {
              folder: "smc_attachment_requests",
            });
            attachmentUrlList.push(linky.secure_url);
            fs.unlinkSync(attachment.path);
          })
        );
        const request = new smcRequest({
          ...req.body,
          user_info: userId,
          attachments: attachmentUrlList,
        });
        await request.save().then(async (uploadResponse) => {
          // create airtable interpolation record
          await createSMCRecord(uploadResponse, trackDetails, req.user.email);
          // end---
          const license = new trackLicense({
            track_name: trackDetails.trackTitle,
            amount: "N/A",
            trackLink: trackDetails.trackLink || trackDetails.spotifyLink,
            quote_id: uploadResponse._id,
            quote_type: "smcRequest",
            sync_user_info: userId,
            music_uploader_info: trackDetails.user,
          });
          const newGeneratedLicense = await license.save();
          await syncUser.findOneAndUpdate(
            { _id: userId },
            { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
          );
        });
      } else {
        const request = new smcRequest({ ...req.body, user_info: userId });
        await request.save().then(async (uploadResponse) => {
          // create airtable interpolation record
          await createSMCRecord(uploadResponse, trackDetails, req.user.email);
          // end---
          const license = new trackLicense({
            track_name: trackDetails.trackTitle,
            amount: "N/A",
            trackLink: trackDetails.trackLink ?? trackDetails.spotifyLink,
            quote_id: uploadResponse._id,
            quote_type: "smcRequest",
            sync_user_info: userId,
            music_uploader_info: trackDetails.user,
          });
          const newGeneratedLicense = await license.save();
          await syncUser.findOneAndUpdate(
            { _id: userId },
            { $push: { pendingLicensedTracks: newGeneratedLicense._id } }
          );
        });
      }
      attachNewNotification({title : `A New License Request has Been Made for ~${trackDetails.trackTitle}`, userId : trackDetails.user._id})
      res.send("Request Sent Successfully");
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Invalid Request, try again later");
    }

  })
);

module.exports = router;
