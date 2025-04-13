const AgentModel = require("../models/agent.model");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllAgents = async (req, res) => {
  const agents = await AgentModel.find().select("-password");
  res.status(200).json(agents);
};


module.exports.agentInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  AgentModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("id unknown: " + err);
  }).select("-password");
};

module.exports.updateAgent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    
    await AgentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          workOnFiles: req.body.workOnFiles
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteAgent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await AgentModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "l'agent en sait trop" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
