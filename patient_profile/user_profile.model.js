const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messages = mongoose.Schema ({
    bot_text: { type: String, required: false },
    bot_time: { type: Date, default: Date.now },
    user_text: { type: String, required: true },
    user_time: { type: Date, default: Date.now }
});
const schema = new Schema({
    sender_id: { type: String, required: true },
    created: { type: Date, default: Date.now },
    patient_name: [messages],
    patient_birthday: [messages] ,
    patient_brothers: [messages] ,
    patient_children:  [messages] ,
    patient_family_situation:  [messages] ,
    patient_gender: [messages] ,
    patient_oldest_boy: [messages] ,
    patient_professional:  [messages] ,
    patient_health_concerns: [messages] ,
    patient_family_health_concerns: [messages]
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('User_Profile', schema);
