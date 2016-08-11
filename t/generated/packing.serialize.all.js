module.exports = (function () {
    var serializers = {}

    serializers.object = function (object) {
        this.object = object
    }

    serializers.object.prototype.serialize = function (buffer, start) {

        var object = this.object

        var value

        value =
            (object.flag << 15 & 0x8000) |
            (object.number & 0x7fff)

        buffer[start++] = value >>> 8 & 0xff
        buffer[start++] = value & 0xff

        return { start: start, serializer: null }
    }

    return serializers
})()
