const ValidateEmailAddress = (emailString) => {
    // check for @ sign
    let atSymbol = emailString.indexOf("@");
    if (atSymbol < 1) return false;

    let dot = emailString.indexOf(".");
    if (dot <= atSymbol + 2) return false;

    // check that the dot is not at the end
    if (dot === emailString.length - 1) return false;

    return true;
}
export default ValidateEmailAddress