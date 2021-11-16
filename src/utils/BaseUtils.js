const moment = require('moment');

var getWeekDayFromDate = currentDate => {
  const date = new Date(currentDate);
  return date.getDay();
};

var getCurrentMonth = () => {
  var m = moment().format('MMM YYYY');
  return m;
};

var getTodayDate = () => {
  var m = moment().format('DD MMM YYYY');
  return m;
};

var parseDate = date => {
  var m = moment(date).format('DD MMM YYYY');
  return m;
};

var parseStrToDate = date => {
    var m = moment(date, 'YYYY-MM-DD').toDate();
    return m;
};

var parseMonth = date => {
  var m = moment(date).format('MMM YYYY');
  return m;
};

var parseDateMonthFormat = date => {
  var m = moment(date).format('MM/DD/YYYY');
  return m;
};

var parseDateHiphenFormat = date => {
  var m = moment(date).format('YYYY-MM-DD');
  return m;
};

var parseDateMonth = (date, isDate) => {
  var m = date.split(' ')[0];
  //console.log(m);
  return isDate
    ? moment(m, 'MM/DD/YYYY', true).format('DD')
    : moment(m, 'MM/DD/YYYY', true).format('MMM');
};

var parseTime = date => {
  var m = moment(date).format('HH:mm');
  return m;
};

const today = moment();
var disableFutureDt = current => {
  return current.isBefore(today);
};

export {
  getCurrentMonth,
  getTodayDate,
  parseDate,
  parseStrToDate,
  parseDateMonthFormat,
  parseTime,
  parseDateMonth,
  parseDateHiphenFormat,
  parseMonth,
  getWeekDayFromDate,
  disableFutureDt,
};
