// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// traverse the DOM tree recursively
function traverseTree(className, root, elementArr) {

    if(root.classList && root.classList.contains(className))
        elementArr.push(root)

    if(!root.hasChildNodes())
        return

    for(let i = 0; i < root.childNodes.length; i++)
        traverseTree(className, root.childNodes[i], elementArr)
}

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className ) {
    let elementArr = []

    traverseTree(className, document.body, elementArr)
    return elementArr
};
