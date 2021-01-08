import { crc64ecma } from './crc64ecma.js';

function expect(b) {
  var line = (new Error).stack.split("\n")[2].split(":")[2];
  console.log(`${line}: ${b ? 'PASS' : 'FAIL'}`);
}

// You can test this using values from other implementations like
// https://crc64.online/
// http://www.sunshine2k.de/coding/javascript/crc/crc_js.html
expect(crc64ecma('glen') == 'aa3a22c699bca958');
expect(crc64ecma('cyclic redundancy check (CRC)') == '47c7fe019bf59b2d');
expect(crc64ecma("!@#)!@# 123 312 0213\n\n120-e2e1") == '996d2d3d42d8ef34');

// The online JS tools expect '6cff476e9ada3b3b' as they appear to throw away charCodeAts
// greater than 255 (they don't appear to handle UTF-16); need to investigate more
expect(crc64ecma("in the sea o🇸🇬f human dignity, the😄re is only\n\ncheese") == '2b9dec10da882bf1');