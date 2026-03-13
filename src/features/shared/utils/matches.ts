
export const isValidName = (str: string): boolean => {
    const nameRegex = /^(?!\s*$)(?!\s{2,})(?!\s?.\s?$).{2,40}$/;
    return nameRegex.test(str);
}

export const isValidEmail = (str: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
}

