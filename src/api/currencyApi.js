// мок асинхронный
export const getCurrencies = () => {
    return new Promise((resolve) => {
        resolve([
            { id: 0, name: "Российский рубль", isoName: "RUB" },
            { id: 1, name: "Белорусский рубль", isoName: "BYN" },
            { id: 2, name: "Казахский тенге", isoName: "KZT" },
            { id: 3, name: "ОАЭ дирхам", isoName: "AED" },
        ]);
    });
};




