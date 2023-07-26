export default function Validate(type, val) {
    let valid = false;
    let msg = null;
    switch (type) {
        case "email":
            valid = String(val)
                .toLowerCase()
                .match(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                );
            if (!valid) msg = "Please enter a valid email address";
            break;

        case "password":
            let passStr = String(val);
            valid = passStr
                .match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/
                );

            if (passStr.length < 8 || passStr.length > 20) {
                msg = "Password must be minimum 8 characters or maximum 20 characters long";
            } else if (!valid) msg = "Password must contain atleast 1 lowercase, 1 uppercase, 1 digit, and 1 special character (any of: @ $ ! % * ? &)";
            break;

        case "phoneNumber":
            valid = String(val)
                .match(
                    /^(?:\+?\d{1,3}\s?)?(?:\(\d{1,4}\)\s?)?[\d\-.\s]{5,15}$/
                );
            if (!valid) msg = "Please enter a valid Phone Number";
            break;

        case "name":
            let nameStr = String(val);
            if (nameStr.length > 1) valid = true;
            if (!valid) msg = "Please enter a valid Name (atleast 2 characters long)";
            break;

        case "address":
            valid = true;
        default:
            break;

    }

    return { valid, msg }
}