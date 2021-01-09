# CRC64
JavaScript and C# implementations of CRC-64-ECMA.

## JavaScript
This relies on BigInt support, and is (as far as I know) the only JS version to support unicode/emoji.

### Usage
- `import { crc64ecma } from './crc64ecma.js'`
- `console.log(crc64ecma('hello!'));`

### Test
- `deno run crc64ecma_test.js`

## C#
### Usage
- `Using Crc64;`
- `Console.WriteLine(crc64.Compute("hello"));`

### Test
No tests yet