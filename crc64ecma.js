var CRC64_ECMA182_POLY = 0x42F0E1EBA9EA3693n;
var crc64_table = [];
var mask = 0xFFFFFFFFFFFFFFFFn;

function generate_crc64_table() {
  var i, j;
  var c = 0n;
  var crc = 0n;

  for (i = 0n; i < 256n; i++) {
    crc = 0n;
    c = i << 56n;

    for (j = 0; j < 8; j++) {
      if ((crc ^ c) & 0x8000000000000000n)
        crc = (crc << 1n) ^ CRC64_ECMA182_POLY;
      else
        crc <<= 1n;
      c <<= 1n;
    }

    crc64_table[i] = crc & mask;
  }
}

export function crc64ecma(str) {
  if (crc64_table.length == 0)
    generate_crc64_table();

  var crc = 0n;
  for (var i = 0; i < str.length; i++) {
    var byte = BigInt(str.charCodeAt(i) & 0xFF);
    var byte56 = byte << 56n;
    crc = (crc ^ byte56);
    var index = (crc >> 56n) & 0xFFn;
    crc = ((crc << 8n) ^ crc64_table[index]) & mask;

  }
  return crc.toString(16);
}