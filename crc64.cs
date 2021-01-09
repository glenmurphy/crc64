using System.Text;

class Crc64
{
  private static ulong CRC64_ECMA182_POLY = 0x42F0E1EBA9EA3693;
  private static ulong mask8 = 0xFFFFFFFFFFFFFFFF;
  private static ulong[] EcmaTable;

  public static void GenerateEcmaTable() {
    if (EcmaTable != null) return;

    EcmaTable = new ulong[256];
    ulong c = 0, crc = 0;
    for (ulong i = 0; i < 256; i++) {
      crc = 0;
      c = i << 56;

      for (int j = 0; j < 8; j++) {
        if (((crc ^ c) & 0x8000000000000000) != 0)
          crc = (crc << 1) ^ CRC64_ECMA182_POLY;
        else
          crc <<= 1;
        c <<= 1;
      }

      EcmaTable[i] = crc & mask8;
    }
  }

  public static string Compute(string str)
  {
    byte[] bytes = Encoding.ASCII.GetBytes(str);
    ulong crc = 0;
    for (int i = 0; i < bytes.Length; i++)
    {
      byte index = (byte)(((crc >> 56) ^ bytes[i]) & 0xFF);
      crc = EcmaTable[index] ^ (crc << 8);
    }
    return string.Format("{0:x}", crc ^ 0);
  }
}