export const getYears = (gen) => {
    try {
        const date = new Date();
        let yTo = gen['year-stop'] ? gen['year-stop'] : date.getFullYear();
        let yFrom = gen['year-start'];
        let result = [];
        for (let i = yFrom; i <= yTo; i++) {
            result.push(i);
        }
        return result;

    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getGenerationName = (option) => {
    let yTo = !option['year-stop'] ? 'н.в.' : option['year-stop'];
    let yFrom = option['year-start'];
    let name = option['name'];
    return `${yFrom} - ${yTo} ${name}`;
}

export const getOptionText = (target) => {
    try {
        return target.options[target.selectedIndex].text;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export const getConfigurationName = (option) => {
    let body = option['body-type'];
    let doors = option['doors-count'];
    let notice = option['notice'];

    let doorsWord = body.includes('дв.') ? '' : doors + ' дв.';
    return `${body} ${doorsWord} ${notice}`;
}

export const getModificationName = (option) => {
    try {
        let specs = option.specifications;
        let eVolume = specs['volume-litres'] ? specs['volume-litres'] + ' л.' : '';
        let eType = specs['engine-type'] ? specs['engine-type'] + ',' : '';
        let transmission = specs['transmission'] ? specs['transmission'] + ',' : '';
        let horsePower = specs['horse-power'] ? specs['horse-power'] + ' л.с.,' : '';
        let drive = specs['drive'];

        if (eType === 'бензин,') { eType = 'бенз.,' }
        if (eType === 'дизель,') { eType = 'диз.,' }
        if (eType === 'электро,') { eType = 'эл.,' }
        if (transmission === 'автоматическая,') { transmission = 'АТ,' }
        if (transmission === 'механическая,') { transmission = 'МТ,' }
        return `${eVolume} ${horsePower} ${eType} ${transmission} ${drive}`;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export const safeSetData = (data, setMethod, defaultValue) => {
    try {
        if (data.error) {
            console.log(data.error);
            setMethod(defaultValue);
        }
        else {
            setMethod(data);
        }
    } catch (error) {
        console.log(data.error);
        setMethod(defaultValue);
    }
}
export const safeGetData = (data) => {
    try {
        if (data.error) {
            console.log(data.error);
            return [];
        }
        else {
            return data;
        }
    } catch (error) {
        console.log(data.error);
        return [];
    }
}
// fill models
export const getModels = async (selectedMark) => {
    if (selectedMark === '') {
        return [];
    }
    try {
        const resp = await fetch(`https://cars-base.ru/api/cars/${selectedMark}?key=941092125`);
        return safeGetData(resp.json());
    } catch (error) {
        console.log(error)
    }
}

// fill generations
export const getGenerations = async (selectedMark, selectedModel) => {
    if (selectedMark === '' || selectedModel === '') {
        return [];
    }
    try {
        const resp = await fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}?key=941092125`);
        return safeGetData(resp.json());
    } catch (error) {
        console.log(error)
    }
}

// fill configurations
export const getConfigurations = async (selectedMark, selectedModel, selectedGeneration) => {
    if (selectedMark === '' || selectedModel === '' || selectedGeneration === '') {
        return [];
    }
    try {
        const resp = await fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}/${selectedGeneration}?key=941092125`);
        return safeGetData(resp.json());
    } catch (error) {
        console.log(error)
    }
}

// fill modifications
export const getModifications = (configurations, selectedConfiguration) => {
    if (!configurations || configurations.length === 0 || selectedConfiguration === '') {
        return [];
    }
    try {
        let modifications = configurations.find(c => c.id === selectedConfiguration).modifications;
        return safeGetData(modifications);
    } catch (error) {
        console.log(error);
    }
};

// fill years
export const getGenerationYears = (generations, selectedGeneration) => {
    if (!generations || generations.length === 0 || selectedGeneration === '') {
        return [];
    }
    try {
        let gen = generations.find(g => g.id === selectedGeneration);
        let years = getYears(gen);
        return safeGetData(years);
    } catch (error) {
        console.log(error);
    }
};

export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}