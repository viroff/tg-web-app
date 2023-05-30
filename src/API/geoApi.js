// мок асинхронный
export const getCountries = () => {
    return new Promise((resolve) => {
        resolve([
            { id: 0, name: "Россия", nameLat: "Russia" },
            { id: 1, name: "Казахстан", nameLat: "Kazakhstan" }
        ]);
    });
};
export const getCities = (countryId) => {
    return new Promise((resolve) => {
        const cities = [
            { id: 0, name: "Москва", cid: 0 },
            { id: 1, name: "Санкт-Петербург", cid: 0 },
            { id: 2, name: "Калининград", cid: 0 },
            { id: 3, name: "Куроград", cid: 0 },
            { id: 4, name: "Васинск", cid: 0 },
            { id: 5, name: "Алма-Аты", cid: 1 },
            { id: 6, name: "Байконур", cid: 1 },
            { id: 7, name: "Казаксити", cid: 1 },
            { id: 8, name: "Васильск", cid: 1 },
            { id: 9, name: "Шимкент", cid: 1 },
        ];
        const result = cities.filter(c => c.cid === parseInt(countryId, 10));
        resolve(result);
    });
};




