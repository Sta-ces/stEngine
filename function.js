export function get(selector){ return document.querySelector(selector); }
export function gets(selector){ return document.querySelectorAll(selector); }
export function getEl(id){ return document.getElementById(id); }
export function action(action, callback, element = document){ element.addEventListener(action, callback);  }