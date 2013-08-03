#!/usr/bin/env node

require('./proof')(2, function (createParser, deepEqual) {
    var parser = createParser()
    var buffer = [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x24, 0xc0 ]
    parser.extract('x64, foo: l64f', function (number, read) {
        deepEqual(number, { foo: -10 }, 'parsed')
        deepEqual(read, buffer.length, 'length')
        return read
    })
    parser.parse(buffer, 0, 4)
    parser.parse(buffer, 4, 12)
    parser.parse(buffer, 12, buffer.length)
})
