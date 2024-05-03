// --- Module C

import A from './a'
import B from './b'

var C;

export function initC(){
    if (C) return;

    C = class C {
        constructor() {
            console.log(A)
            console.log(B)
        }
    }
}

initC();

export {C as default}; // IMPORTANT: not `export default C;` !!
