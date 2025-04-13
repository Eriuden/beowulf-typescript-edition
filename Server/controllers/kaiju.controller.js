const KaijuModel = require("../models/kaiju.model");

const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readKaiju = (res) => {
  KaijuModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};

module.exports.createKaiju = async (req, res) => {
  let fileName;

  if (req.file != null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("taille maximale dépassée");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body._id + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/kaiju/${fileName}`
      )
    );
  }

  const newKaiju = new KaijuModel({
    picture: req.file != null ? "./uploads/kaiju/" + fileName : "",
    name: req.body.name,
    threatForHumanity: req.body.threatForHumanity,
    threatForEarth: req.body.threatForEarth,
    threatForOtherKaijus: req.body.threatForOtherKaijus,
    powers: req.body.powers,
    size: req.body.size,
    weight: req.body.weight,
    description: req.body.description
  });

  

  try {
    const kaijuProfile = await newKaiju.save();
    return res.status(201).json(kaijuProfile);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updateKaiju = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    name: req.body.name,
    threatForHumanity: req.body.threatForHumanity,
    threatForEarth: req.body.threatForEarth,
    threatForOtherKaijus: req.body.threatForOtherKaijus,
    powers: req.body.powers,
    size: req.body.size,
    weight: req.body.weight,
    description: req.body.description
  };

  KaijuModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("update errors:" + err);
    }
  );
};

module.exports.deleteKaiju = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  KaijuModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs).json({ message: "éliminé" });
    else console.log("delete error:" + err);
  });
};