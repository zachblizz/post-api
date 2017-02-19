import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const commentSchema = new Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    _creator: { type: Schema.ObjectId, ref: 'User' },
    _post: { type: Schema.ObjectId, ref: 'Post' },
});

const autoPopulateCreator = function(next) {
    this.populate({
        path: '_creator',
        select: 'username createdAt -_id'
    });
    next();
};

commentSchema.pre('find', autoPopulateCreator);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;