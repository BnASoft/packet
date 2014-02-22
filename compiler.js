module.exports = function (source) {
    var i = 0, variables = {}, $
    while (i < source.length) {
        if (source[i] == '\n') {
            source[i] = '"__nl__"'
        } else if ($ = /^var ([\w\d_]+);$/.exec(source[i])) {
            variables[$[1]] = true
            source.splice(i, 1)
            continue
        }
        i++
    }
    variables = Object.keys(variables).sort().map(function (variable) {
        return 'var ' + variable + ';'
    })
    if (variables.length) {
        source.unshift('"__nl__"')
        source.unshift.apply(source, variables)
    }
    return source.join('\n')
}