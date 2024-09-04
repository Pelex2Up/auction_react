export function validateEmail(value: string) {
    const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
    return regex.test(value)
}

export function validatePhone(phone:string) {
    const regexBY = /\+375 \((17|29|25|33|44)\) [0-9]{3} [0-9]{2} [0-9]{2}$/
    const regexRU = /\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/
    return regexBY.test(phone) || regexRU.test(phone)
}