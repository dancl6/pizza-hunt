const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        required: 'You need to provide a reply body!',
        type: String
      },
      writtenBy: {
        required: 'You need to provide who it was written by!',
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

  const CommentSchema = new Schema(
    {
      writtenBy: {
        required: 'You need to provide who it was written by!',
        type: String
      },
      commentBody: {
        required: 'You need to provide the comment body!',
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
      // use ReplySchema to validate data for a reply
      replies: [ReplySchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;