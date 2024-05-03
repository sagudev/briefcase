// --- Module A

import C, {initC} from './c';

initC();

console.log('Module A', C)

class A extends C {
    // ...
}

export {A as default}