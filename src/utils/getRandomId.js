export const getRandomId = (len) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz_';
    let randomSequence = '';
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomSequence += alphabet[randomIndex];
    }
    return randomSequence;
}