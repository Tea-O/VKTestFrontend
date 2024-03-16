function isValid(value: string) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}


export {isValid}