module.exports = class Utils {
  static checkForMandatoryFields(obj, fields) {
    if (!fields || fields.length == 0 || !obj) return false;

    for (let i = 0; i < fields.length; i++) {
      if (!(fields[i] in obj) || !obj[fields[i]]) return false;
    }
    return true;
  }
};
