export const getGenerationName = (option) => {
    return option.generationDescription;
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
    return option.configurationDescription;
}

export const getModificationName = (option) => {
    return option.modificationDescription;
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
        const resp = await fetch(`https://localhost:7007/api/v1.0/vehicles/marks/${selectedMark}/models`);
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
        const resp = await fetch(`https://localhost:7007/api/v1.0/vehicles/marks/${selectedMark}/models/${selectedModel}/generations`);
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
        const resp = await fetch(`https://localhost:7007/api/v1.0/vehicles/marks/${selectedMark}/models/${selectedModel}/generations/${selectedGeneration}/configurations`);
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
        return safeGetData(gen.years);
    } catch (error) {
        console.log(error);
    }
};

export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}