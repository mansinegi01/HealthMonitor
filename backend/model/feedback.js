// const mongoose = require("mongoose");

// const feedbackSchema = new mongoose.Schema({
//   sessionId: {
//     type: String,
//     required: true
//   },
//   empathyScore: {
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   helpfulnessScore: {
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   comfortScore: {
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   naturalnessScore: {
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   wouldReuse: Boolean
// }, { timestamps: true });

// module.exports = mongoose.model("Feedback", feedbackSchema);
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
{
  sessionId: {
    type: String,
    required: true
  },

  userId: {
    type: String
  },

  userType: {
    type: String,
    enum: ["guest", "registered"],
    default: "guest"
  },

  sessionDuration: {
    type: Number
  },

  messageCount: {
    type: Number
  },

  responseTime: {
    type: Number
  },

  topicCategory: {
    type: String
  },

  satisfactionScore: {
    type: Number,
    min: 1,
    max: 5
  },

  sentimentLabel: {
    type: String,
    enum: ["positive", "neutral", "negative"]
  },

  issueResolved: {
    type: Boolean
  },

  firstTimeUser: {
    type: Boolean
  },

  feedbackText: {
    type: String
  },

  empathyScore: {
    type: Number,
    min: 1,
    max: 5
  },

  helpfulnessScore: {
    type: Number,
    min: 1,
    max: 5
  },

  comfortScore: {
    type: Number,
    min: 1,
    max: 5
  },

  naturalnessScore: {
    type: Number,
    min: 1,
    max: 5
  },

  wouldReuse: {
    type: Boolean
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);