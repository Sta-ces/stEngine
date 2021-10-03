export function get(selector){ return document.querySelector(selector); }
export function gets(selector){ return document.querySelectorAll(selector); }
export function getEl(id){ return document.getElementById(id); }
export function action(action, callback, element = document){ element.addEventListener(action, callback);  }
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

// NOT EXPORT
function valToPerc(number, max = 100, min = 0){ return ((number - min) * 100) / (max - min); }
function percToVal(number, max = 100, min = 0){ return (number * (max - min) / 100) + min; }
function reducePerc(number, percentage){ return ((100 - percentage) / 100) * number; }