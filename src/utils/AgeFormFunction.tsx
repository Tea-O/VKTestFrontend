function isValid(value: string) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}

function returnAge(age: string | null, isValidAge: boolean) {

    if (age && isValidAge) {
        return `Estimated age: ${age}`;
    } else if (isValidAge) {
        return "";
    }
    return "Имя должно состоятоять только из букв";
}

export {isValid, returnAge}