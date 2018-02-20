// stole this from stack overflow :)

 const RandomId = function RandId() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4());
  }


module.exports = RandomId;