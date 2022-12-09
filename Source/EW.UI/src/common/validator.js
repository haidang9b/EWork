/**
 * Check email valid or invalid
 * @param email for validate email
 * @returns false or true
 */
export const ValidateEmail = (email) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
};

/**
 * Check Vietnamese phone number valid or invalid
 * @param phoneNumber for validate Vietnamese Phone Number
 * @returns false or true
 */
export const ValidatePhoneNumber = (phoneNumber) => {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (regex.test(phoneNumber)) {
        return true;
    }
    return false;
};
