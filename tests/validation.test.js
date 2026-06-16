const {
    validateEmail
} = require("../js/validation");

describe("Email Validation", () => {

    test(
        "Email yang sah",
        () => {

            expect(
                validateEmail(
                    "ali@gmail.com"
                )
            ).toBe(true);

        }
    );

    test(
        "Email tanpa @",
        () => {

            expect(
                validateEmail(
                    "aligmail.com"
                )
            ).toBe(false);

        }
    );

    test(
        "Email kosong",
        () => {

            expect(
                validateEmail("")
            ).toBe(false);

        }
    );

});