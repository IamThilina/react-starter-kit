import mongoose from 'mongoose';
import counters from './counters';
const Schema = mongoose.Schema;

const districts = ['colombo', 'kandy', 'galle', 'ampara', 'anuradhapura', 'badulla', 'batticaloa', 'gampaha', 'hambantota', 'jaffna', 'kalutara', 'kegalle', 'kilinochchi', 'kurunegala', 'mannar', 'matale', 'matara', 'moneragala', 'mullativu', 'nuwara eliya', 'polonnaruwa', 'puttalam', 'ratnapura', 'trincomalee', 'vavuniya'];
const provinces = ['central', 'eastern', 'north central', 'northern', 'north western', 'sabaragamuwa', 'southern', 'uva', 'western'];
//                    0           1             2               3             4               5             6         7       8
const districtsProvinceMap = {
  'colombo': provinces[8],
  'kandy': provinces[0],
  'galle': provinces[6],
  'ampara': provinces[1],
  'anuradhapura': provinces[2],
  'badulla': provinces[7],
  'batticaloa': provinces[1],
  'gampaha': provinces[8],
  'hambantota': provinces[6],
  'jaffna': provinces[3],
  'kalutara': provinces[8],
  'kegalle': provinces[5],
  'kilinochchi': provinces[3],
  'kurunegala': provinces[4],
  'mannar': provinces[3],
  'matale': provinces[0],
  'matara': provinces[6],
  'moneragala': provinces[7],
  'mullativu': provinces[3],
  'nuwara eliya': provinces[0],
  'polonnaruwa': provinces[2],
  'puttalam': provinces[4],
  'ratnapura': provinces[5],
  'trincomalee': provinces[1],
  'vavuniya': provinces[3],

};

const familyMemberSchema = new mongoose.Schema({
  name: String,
  isLiving: {type: Boolean, default: true},
  relation: { type: String, enum: ['mother', 'father', 'sister', 'brother', 'other'] },
  occupation: String,
  income: {type: Number, default: 0},
});

const letterSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  reason: { type: String, enum: ['other', 'receipt', 'thankyou'] },  // TODO remove thankyou
  link: String,
});

const feedbackSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  link: String,
  meta: {},
});


const updatesSchema = new mongoose.Schema({
  timeStamp: {type: Date, default: Date.now},
  html: String,

});

const studentSchema = new mongoose.Schema({

  studentID: {type: Number, required: true},
  /*
   * Personal and Family details
   * */
  name: {firstName: String, lastName: String},
  fullName: {type: String, index: true},

  tagLine: String,
  // added to support 2PC
  pendingTransactions: [{type: Number}],
  pendingInActiveSponsorships: [{type: Number}],
  // add pre hook to province
  district: {type: String, lowercase: true, enum: districts},
  province: {type: String, lowercase: true},
  gender: { type: String, enum: ['male', 'female'] },
  // add pre hook to add date as ISODate()
  profileImage: [String],
  waterColorImage: String,
  imageGallery: [String],
  documentURLS: [String],
  birthday: Date,
  joinedDate: { type: Date, default: Date.now}, // start date as a scholar
  currentGrade: { type: String, enum: ['8', '9', '10', '11', '12', '13', 'a/l', 'uni', 'uni-1', 'uni-2', 'uni-3', 'uni-4'] }, //TODO remove uni
  currentSchool: String,
  previousSchools: [String],
  description: String,
  ambition: String,
  hobbies: [String],
  exams: [String],
  achievements: {
    academic: [String],
    nonAcademic: [String],
  },
  address: {
    no: String,
    street: String,
    city: String,
    zip: String,
    country: String,
  },

  mother: familyMemberSchema,
  father: familyMemberSchema,
  siblings: [familyMemberSchema],
  householdIncome: Number,

  /*
   * ELF details
   * */
  applicationURL: String,
  laisonOfficer: { type: String, ref: 'liaisons' },
  reviewStudentID: {type: Schema.Types.ObjectId},  // TODO add required true

  sponsorAmount: {type: Number, required: true},
  scholarID: {type: Number, default: 0},
  isLive: {type: Boolean, default: false},
  currentSponsor: {
    id: {type: String, ref: 'sponsors', default: null},
    isAnonymous: {type: Boolean, default: false},
    sponsorID: {type: Number}, // used to find the correct sponsor doc
    sponsorName: {type: String},
  },
  previousSponsors: [{
    id: {type: String, ref: 'sponsors', default: null},
    isAnonymous: {type: Boolean, default: true},
    sponsorID: {type: Number, required: true}, // used to find the correct sponsor doc
    sponsorName: {type: String, required: true},
  }],

  feedback: [feedbackSchema],
  notes: [{
    adminID: String,
    name: {},
    timestamp: {type: Date, default: Date.now()},
    comment: String,
  }],

  letters: [letterSchema],
  updates: [updatesSchema],

  /*
   * Alumni or success details
   * */
  isAlumni: { type: Boolean, default: false},
  // isGraduated => isAlumni
  isGraduated: { type: Boolean, default: false},
  isEmployed: { type: Boolean, default: false},
  story: String,
  videoURL: String,
  isInMeetTheStudents: {type: Boolean, default: false},
  isInTrueStories: {type: Boolean, default: false},
});
// pre hook for studentSchema

studentSchema.pre('save', function(next) {

  this.birthday = new Date(this.birthday);
  // isGraduated => isAlumni
  if (this.isGraduated) {
    this.isAlumni = true;
  }

  this.province = districtsProvinceMap[this.district];


  /*
   * Set Live and no scholar ID
   * */
  if(this.isLive === true && this.scholarID === 0){

    /*
     * Get the count
     * */
    counters.findOneAndUpdate({_id: 'SCHOLAR_COUNT'},
      { $inc: { count: 1 },
      },
      { upsert: true }, (err, doc) => {

        if(err || doc === null){
          console.log('error occured!');
        } else{
          // set the count,
          console.log(doc.count);
          this['scholarID'] = doc.count;
          next();
        }
      });
  } else{
    next();
  }
});

const student = mongoose.model('students', studentSchema);

export default student;
