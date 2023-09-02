// WPT testharness sim
function assert_true(t, msg) {
    if (t === true) {
        console.log(`Assert ${msg} succeeded`);
    } else {
        console.error(`Assert ${msg} failed`);
        throw "AssertFailed"
    }
}

function assert_equals(a, b, msg) {
    if (a == b) {
        console.log(`Assert (${a}==${b}) ${msg} succeeded`);
    } else {
        console.error(`Assert (${a}==${b}) ${msg} failed`);
        throw "AssertFailed"
    }
}

function assert_not_equals(a, b, msg) {
    if (a != b) {
        console.log(`Assert (${a}==${b}) ${msg} succeeded`);
    } else {
        console.error(`Assert (${a}==${b}) ${msg} failed`);
        throw "AssertFailed"
    }
}

function test(t, msg) {
    console.info(`Testing: ${msg}`);
    t();
}