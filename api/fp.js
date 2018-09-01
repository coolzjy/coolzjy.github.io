const crypto = require("crypto");

const UPPER_CASE_LETTER = "abeklnosuvwxy01279";

module.exports = (req, res) => {
  const { password = "", identifier = "" } = req.query;

  if (password && identifier) {
    const temp = crypto
      .createHmac("md5", identifier)
      .update(password)
      .digest("hex");
    const source = crypto.createHmac("md5", "snow").update(temp).digest("hex");
    const rule = crypto.createHmac("md5", "kise").update(temp).digest("hex");

    console.log(source, rule);

    const sourceArray = source.split("");
    for (let i = 0; i < sourceArray.length; i++) {
      if (UPPER_CASE_LETTER.includes(rule[i])) {
        sourceArray[i] = sourceArray[i].toUpperCase();
      }
    }

    const code = sourceArray.join("");
    const result = isNaN(code[0]) ? code.slice(0, 16) : "K" + code.slice(1, 16);
    res.json({ result });
  } else {
    res.status(400).send();
  }
};
