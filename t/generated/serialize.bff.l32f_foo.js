module.exports = function (object, callback) {
    var inc

    inc = function (buffer, start, end, index) {
        var index
        var bite
        var next
        var _foo

        this.write = function (buffer, start, end) {
            switch (index) {
            case 0:
                _foo = new ArrayBuffer(4)
                new DataView(_foo).setFloat32(0, object["foo"], true)
                bite = 0
                index = 1
            case 1:
                while (bite != 4) {
                    if (start == end) {
                        return start
                    }
                    buffer[start++] = _foo[bite]
                    bite++
                }
            }

            if (next = callback && callback(object)) {
                this.write = next
                return this.write(buffer, start, end)
            }

            return start
        }

        return this.write(buffer, start, end)
    }

    return function (buffer, start, end) {
        var next
        var _foo

        if (end - start < 4) {
            return inc.call(this, buffer, start, end, 0)
        }

        _foo = new ArrayBuffer(4)
        new DataView(_foo).setFloat32(0, object["foo"], true)
        buffer[start++] = _foo[0]
        buffer[start++] = _foo[1]
        buffer[start++] = _foo[2]
        buffer[start++] = _foo[3]
        if (next = callback && callback(object)) {
            this.write = next
            return this.write(buffer, start, end)
        }

        return start
    }
}
