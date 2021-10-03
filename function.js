export function get(selector){ return document.querySelector(selector); }
export function gets(selector){ return document.querySelectorAll(selector); }
export function getEl(id){ return document.getElementById(id); }
export function getId(element){ return element.getAttribute("id"); }
export function create(tagname, parent = null){
    let element = document.createElement(tagname);
    if(parent) parent.appendChild(element);
    return element;
}
export function svg(src, parent){
    fetch(src).then((response) => { return response.text(); }).then((text) => { 
        insert("inbefore", parent, text);
     });
}
export function insert(position, parent, element) {
    switch (position) {
        case "before":
        case "beforebegin":
        case "begin":
        case "start":
        case "previous":
            position = "beforebegin";
            break;

        case "after":
        case "afterend":
        case "end":
        case "next":
            position = "afterend";
            break;

        case "inbefore":
        case "instart":
        case "afterbegin":
        case "insert":
        case "insertBefore":
            position = "afterbegin";
            break;

        case "inafter":
        case "inend":
        case "beforeend":
        case "append":
        case "appendChild":
        default:
            position = "beforeend";
            break;
    }
    parent.insertAdjacentHTML(position, element.trim());
};
/**
 * @param {string} action click, load, keyup, etc.
 * @param {function} callback when the action is called.
 * @param {Element} element (Optionnal) the html element. Default: document.
 */
export function action(action, callback, element = document){ element.addEventListener(action, callback);  }
/**
 * @param {string} action click, load, keyup, etc.
 * @param {Element} element (Optionnal) the html element. Default: document.
 */
export function removeAction(action, element = document){ element.removeEventListener(action); }
export function random(min = 0, max = 1){
    if (isNaN(min) && isNaN(max)) return;
    min = parseFloat(min); max = parseFloat(max);
    return Math.round(min + Math.random() * (max - min));
}
export function percentage({excute = "percentage", number, max = 100, min = 0, reduce = 0}){
    if (Number.isNaN(number) || Number.isNaN(max) || Number.isNaN(min) || Number.isNaN(reduce)) return null;
    let rslt = null;
    switch(excute){
        case "percentage": rslt = valToPerc(number, max, min); break;
        case "value": rslt = percToVal(number, max, min); break;
        case "reduce": rslt = reducePerc(number, reduce); break;
    }
    if(excute != "reduce" && reduce > 0) rslt = reducePerc(rslt, reduce);
    return rslt;
}
export function betweenNum(num, min = 0, max = 100){
    let rslt = num;
    rslt = (rslt < min) ? min : rslt;
    rslt = (rslt > max) ? max : rslt;
    return rslt;
}

// NOT EXPORT
function valToPerc(number, max = 100, min = 0){ return ((number - min) * 100) / (max - min); }
function percToVal(number, max = 100, min = 0){ return (number * (max - min) / 100) + min; }
function reducePerc(number, percentage){ return ((100 - percentage) / 100) * number; }