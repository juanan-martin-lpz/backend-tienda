exports.checkBody = function(klass, body) {

  let k = new klass();

  for (let p in body) {

    if (!k.hasOwnProperty(p)) {
      return false;
    }
  }

  return true;
};
