'use strict';

var Base64 = (function () {
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    chars = chars.toUpperCase() + chars + '0123456789+/';

    function toBinary(str) {
        var bins = [];

        for (var i = 0; i < str.length; i++) {
            bins.push(str[i].charCodeAt(0).toString(2));
        }

        var binarios = [];

        bins.forEach(function (i) {
            if (i.length < 8) {
                binarios.push('0'.repeat(8 - i.length) + i);
            } else {
                binarios.push(i);
            }
        });

        str = binarios.join('');
        return str;
    }

    function encode(str) {
        if (!str) return;

        str = str.toString();

        var binario = toBinary(str);
        var separados = binario.match(/.{6}|(.+)$/g);
        var indices = [];

        separados.forEach(function (i, n) {
            if (n === separados.length - 1 && i.length < 6) {
                indices.push(parseInt(i + '0'.repeat(6 - i.length), 2));
            } else {
                indices.push(parseInt(i, 2));
            }
        });

        var codificado = '';

        indices.forEach(function (i) {
            codificado += chars[i];
        });

        if (codificado.length % 4 === 2) codificado = codificado + '==';
        if (codificado.length % 4 === 3) codificado = codificado + '=';

        return codificado;
    }

    function dec(caractere) {
        for (var i = 0; i < chars.length; i++) {
            if (chars[i] === caractere) {
                return i;
            }
        }
    }

    function decode(str) {
        if (!str) return;

        str = str.toString();

        if (!/^[a-zA-Z0-9\/\+\=]*$/.test(str) || str.length < 2) {
            return undefined;
        }

        str = str.replace(/\=*$/, '');
        var binarios = [];

        for (var i = 0; i < str.length; i++) {
            var bin = dec(str[i]).toString(2);

            bin = '0'.repeat(6 - bin.length) + bin;

            binarios.push(bin)
        }

        binarios = binarios.join('').match(/.{8}|(.+)$/g);;

        binarios = binarios.slice(0, binarios.length - 1);

        var decodificado = [];

        for (var i = 0; i < binarios.length; i++) {
            var charcode = parseInt(binarios[i], 2).toString(10);

            decodificado.push(String.fromCharCode(charcode));
        }

        decodificado = decodificado.join('');

        return decodificado;
    }

    return {
        encode: encode,
        decode: decode
    };
})();