// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

function stringifyArray(arr, objStr) {

    if(!arr.length)
        return objStr.str += '[]'

    objStr.str += '['
    arr.forEach(elem => {
        if(Array.isArray(elem))
            stringifyArray(elem, objStr)
        else if(typeof elem === 'function' || typeof elem === 'null')
            objStr.str += 'null'
        else if(typeof elem === 'object')
            stringifyObject(elem, objStr)
        else if(typeof elem ==='string')
            objStr.str += '"' + elem + '"'
        else
            objStr.str += elem
        objStr.str += ','
    })

    objStr.str = objStr.str.slice(0,-1) + ']'
}

function stringifyObject(obj, objStr) {

    if(!Object.getOwnPropertyNames(obj).length)
        return objStr.str += '{}'

    objStr.str += '{'
    for(let property in obj)
    {
        if(property == 'undefined')
            continue

        if(obj.hasOwnProperty(property) && typeof obj[property] !== 'function')
        {
            objStr.str = objStr.str + '"' + property + '":'
            if(Array.isArray(obj[property]))
                stringifyArray(obj[property], objStr)
            else if(obj[property] !== null && typeof obj[property] === 'object')
                stringifyObject(obj[property], objStr)
            else
                objStr.str += typeof obj[property] == 'string' ? '"' + obj[property] + '"' : obj[property]

            objStr.str += ','
        }
    }

    if(objStr.str[objStr.str.length - 1] == ',')
        objStr.str = objStr.str.slice(0,-1) + '}'
    else
        objStr.str += '}'
}

var stringifyJSON = function(obj) {

    if(typeof obj === 'string')
        return '"' + obj + '"'

    if(typeof obj === 'number' || obj === null || obj === undefined || typeof obj === 'boolean')
        return String(obj)

    let objStr = { str : '' }
    if(Array.isArray(obj))
        stringifyArray(obj, objStr)
    else
        stringifyObject(obj, objStr)

    return objStr.str

};
