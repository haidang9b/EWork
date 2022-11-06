export const ValidateEmail = (email) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
};

export const ValidatePhoneNumber = (input) => {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (regex.test(input)) {
        return true;
    }
    return false;
};
