/**
 * Created by asankah on 11/22/15.
 */
import mongoose from 'mongoose';

const inActiveReasons = ['graduated', 'terminated', 'cancelled'];

const tipPaymentsSchema = new mongoose.Schema({
  paymentID: {type: String, default: null}, // charge ID provided by STRIPE or PayPal
  amount: {type: Number, match: /^[1-9]\d+$/, default: null},  // amount paid
  paidDate: {type: Date, default: null},
});

const paymentsSchema = new mongoose.Schema({
  paymentID: {type: String, default: null}, // charge ID provided by STRIPE or PayPal
  amount: {type: Number, match: /^[1-9]\d+$/, default: null},  // amount paid
  paidDate: {type: Date, default: new Date()},
  paidWith: {type: String, enum: ['PayPal', 'Credit Card', 'paypal', 'credit card']},
  period: {
    to: {type: Date, required: true},
    from: {type: Date, required: true},
  },
});
const sponsoredStudentsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
  },
  name: {type: String, default: null},
  address: {
    street: {type: String, default: null},
    city: {type: String, default: null},
    zip: {type: Number, default: null},
    country: {type: String, default: null},
  },
  studentID: {type: Number, required: true},
  studentName: {type: String, required: true},
  grade: { type: String, enum: ['8', '9', '10', '11', '12', '13', 'a/l', 'uni', 'uni-1', 'uni-2', 'uni-3', 'uni-4'] },
  dedicateeName: {type: String, required: true}, // dedicatee name or 'anonymous'
  // the selected payment options in last time pay
  currentPaymentOption: {
    amount: {type: Number, required: true},
    isRecurring: {type: Boolean, required: true},
    months: {type: Number, required: true},
    method: {type: String, required: true, enum: ['PAY_PAL', 'STRIPE']},
  },
  // fields used to find the sponsorship on receiving events at web hook and  to cancel recurring sponsorships
  customerID: {type: String, default: null}, // customer ID provided by STRIPE for recurring payments
  subscriptionID: {type: String, default: null}, // subscription ID provided by STRIPE for recurring payments
  // capturing sponsorship status
  sponsorshipStatus: {
    isActive: {type: Boolean, required: true},
    reason: {type: String, required: false, enum: inActiveReasons},  // reason if the sponsorship is in-active
  },
  duration: {type: Number, required: true}, // no of months.total duration of sponsorship.increment this.use this to calculate school years funded
  initiatedDate: {type: Date, required: true},
  lastPaymentDate: {type: Date, required: true},
  nextDueDate: {type: Date, required: true},
  payments: [paymentsSchema],
});

const campaignPaymentsSchema = new mongoose.Schema({
  paymentID: {type: String, default: null}, // charge ID provided by STRIPE or PayPal
  paymentCount: Number,
  amount: {type: Number, match: /^[1-9]\d+$/, default: null},  // amount paid
  paidDate: {type: Date, default: new Date()},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
  }, // mail of funder
  status: {type: String, default: 'waiting'},
  name: {type: String, required: true},  // name of funder
  address: {  // address of funder
    street: {type: String, default: null},
    city: {type: String, default: null},
    zip: {type: Number, default: null},
    country: {type: String, default: null},
  },
});

const updatesSchema = new mongoose.Schema({
  update: {type: String, default: null},
  timeStamp: {type: Date, default: new Date()},
});

const campaignsSchema = new mongoose.Schema({
  campaignID: {type: Number, required: true},
  type: {type: String, enum: ['birthday', 'special occasion', 'sports event', 'fundraiser', 'holiday', 'other']},
  name: {type: String, required: true},
  goal: {type: Number, default: 0},
  startDate: {type: Date, default: new Date()},
  endDate: {type: Date, required: true},
  bannerImage: {type: String, required: true},
  story: {type: String, required: true},
  payments: [campaignPaymentsSchema],
  updates: [updatesSchema],
});

const sponsors = mongoose.model('sponsors', {
  sponsorID: {type: Number},  // set the same sponsor id in sql tbl. then auto increment for new sponsors
  profileImage: {type: String, default: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'},
  name: {
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
  },
  anonymous: {type: Boolean, default: false},
  joinedDate: {type: Date, default: new Date()},
  birthDay: {type: Date, default: new Date()},
  linkedIn: String,
  twitter: String,
  website: String,
  city: {type: String, default: null},
  country: {type: String, default: null},
  email: {
    type: String,
    required: true,
    /*unique: true,*/
    match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
  },
  phone: [String],
  hash: {type: String},
  sponsoredStudents: [sponsoredStudentsSchema],
  pendingTransactions: [{type: Number}],
  pendingInActiveSponsorships: [{type: Number}],
  tipPayments: [tipPaymentsSchema],
  facebook: {
    id: String,
    token: String,
  },
  google: {
    id: String,
    token: String,
  },
  visitedPrivateProfile: {type: Boolean, default: false},
  campaigns: [campaignsSchema],
  story: String,  // true story
  videoURL: String,  //true story video
  isInTrueStories: {type: Boolean, default: false},
});

export default sponsors;
