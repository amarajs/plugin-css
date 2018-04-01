// @flow

const rxSlug = /([^-])([A-Z])/g;

function processCSSArray(css, classes) {
    let className, resultIndex = css.length;
    while (className = css[--resultIndex]) {
        classes[classes.length] = className;
    }
}

function processCSSObject(css, classes) {
    const keys = Object.keys(css);
    let index, className, resultIndex = keys.length;
    while (className = keys[--resultIndex]) {
        if (css[className]) {
            classes[classes.length] = className;
            continue;
        }
        index = classes.indexOf(className);
        index >= 0 && classes.splice(index, 1);
    }
}

function removeIfUnused(className) {
    if (this.classes.indexOf(className) === -1) {
        this.target.classList.remove(className);
    }
}

function addIfNew(className) {
    if (!this.classList.contains(className)) {
        this.classList.add(className);
    }
}

function removeUnusedCSSClasses(classes, target) {
    target.className.length && target.className.split(' ')
        .forEach(removeIfUnused, {classes, target});
}

function addNewCSSClasses(classes, target) {
    classes.forEach(addIfNew, target);
}

function applyClassNames(arrCSS, target) {
    const classes = Array.from(target.classList);
    let css, index = arrCSS.length;
    while (css = arrCSS[--index]) {
        if (typeof css === 'string') {
            classes[classes.length] = css;
        } else if (Array.isArray(css)) {
            processCSSArray(css, classes);
        } else {
            processCSSObject(css, classes);
        }
    }
    removeUnusedCSSClasses(classes, target);
    addNewCSSClasses(classes, target);
}

function merge(...styles) {
    const result = {};
    let key,
        keys,
        style,
        keyIndex,
        index = 0;
    while (style = styles[index++]) {
        keys = Object.keys(style);
        keyIndex = keys.length;
        while (key = keys[--keyIndex]) {
            if (style[key] !== '')
                result[key] = style[key];
        }
    }
    return result;
}

function sluggify(key) {
    return key.replace(rxSlug, '$1-$2').toLowerCase();
}

function cssStringify(obj) {
    let key,
        keys = Object.keys(obj),
        index = keys.length;
    const result = new Array(index);
    while (key = keys[--index]) {
        result[index] = `${sluggify(key)}:${obj[key]}`;
    }
    return result.join(';');
}

function applyStyles(arrStyles, target) {
    target.setAttribute('style', cssStringify(merge({}, ...arrStyles)));
}

type Action = {
    type: string,
    payload: {
        style?: Map<HTMLElement, {}[]>,
        class?: Map<HTMLElement, (string|string[]|{})[]>
    }
}

type AmaraCSS = () => (action: Action) => void;

/**
 * Provides the ability to style HTML elements dynamically using CSS class names or inline styles.
 *
 * @export
 * @name AmaraCSS
 * @returns {AmaraCSS}
 */
export default function AmaraPluginCSS(): AmaraCSS {

    return function createHandler() {

        return function handler(action: Action) {
            if (action.type === 'core:apply-target-results') {
                action.payload.style && action.payload.style.forEach(applyStyles);
                action.payload.class && action.payload.class.forEach(applyClassNames);
            }
        };

    };

}
