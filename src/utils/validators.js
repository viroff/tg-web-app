import { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';

export const validatePhone = (value) => {
    let error = '';
    if (!value.startsWith('+')) {
        error = 'Укажите телефон в международном формате';
    }
    else if (!isPossiblePhoneNumber(value)) {
        error = 'Указан неверный номер телефона';
    }
    return error;
}
export const validateMark = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateModel = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateGeneration = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateConfiguration = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateModification = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateMileage = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateCondition = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateSellingType = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateCountry = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateCity = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateInfo = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}
export const validateYear = (value) => {
    let error = '';
    if (value === '') { error = 'Заполните все поля' }
    return error;
}