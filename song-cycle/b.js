// --- Module B

import C, {initC} from './c';

initC();

console.log('Module B', C)

class B extends C {
    // ...
}

export {B as default}