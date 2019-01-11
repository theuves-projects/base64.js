const Base64 = (function () {
  const chars = [
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ...'abcdefghijklmnopqrstuvwxyz',
    ...'0123456789',
    ...'+/'
  ]

  function str2bin(str) {
    return str.replace(/./g, (char) => {
      return char
        .codePointAt()
        .toString(2)
        .padStart(8, '0')
    })
  }

  function encode(str) {
    const base = str2bin(str)
      .split(/(\d{6})/g)
      .filter(Boolean)
      .map((bin) => bin.padEnd(6, '0'))
      .map((bin) => parseInt(bin, 2))
      .map((i) => chars[i])
      .join('')

    switch (str.length % 4) {
      case 0:
        return base + '=='
      case 1:
        return base + '='
      default:
        return base
    }
  }

  function decode(str) {
    return str.replace(/=+$/, '')
      .replace(/./g, (char) => {
        return chars
          .findIndex((c) => char === c)
          .toString(2)
          .padStart(6, '0')
      })
      .split(/(\d{8})/g)
      .filter((bin) => bin.length === 8)
      .map((bin) => parseInt(bin, 2))
      .map((dec) => String.fromCodePoint(dec))
      .join('')
  }

  return {
    encode: encode,
    decode: decode
  }
})()