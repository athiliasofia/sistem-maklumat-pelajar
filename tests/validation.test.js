const validateEmail = require("../js/validation");

test("email valid", () => {
    expect(
        validateEmail("abc@gmail.com")
    ).toBe(true);
});

test("email invalid", () => {
    expect(
        validateEmail("abcgmail.com")
    ).toBe(false);
});