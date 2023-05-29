
import { React, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import styles from './App.css';
const tg = window.Telegram.WebApp;

const App = () => {
  const [marks, setMarks] = useState([]);

  const getYears = (gen) => {
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

  const getGenerationName = (option) => {
    let yTo = !option['year-stop'] ? 'н.в.' : option['year-stop'];
    let yFrom = option['year-start'];
    let name = option['name'];
    return `${yFrom} - ${yTo} ${name}`;
  }

  const getOptionText = (target) => {
    try {
      return target.options[target.selectedIndex].text;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  const getConfigurationName = (option) => {
    let body = option['body-type'];
    let doors = option['doors-count'];
    let notice = option['notice'];

    let doorsWord = body.includes('дв.') ? '' : doors + ' дв.';
    return `${body} ${doorsWord} ${notice}`;
  }

  const getModificationName = (option) => {
    try {
      let specs = option.specifications;
      let eVolume = specs['volume-litres'] ? specs['volume-litres'] + ' л.' : '';
      let eType = specs['engine-type'] ? specs['engine-type'] + ',' : '';
      let transmission = specs['transmission'] ? specs['transmission'] + ',' : '';
      let horsePower = specs['horse-power'] ? specs['horse-power'] + ' л.с.,' : '';
      let drive = specs['drive'];

      return `${eVolume} ${horsePower} ${eType} ${transmission} ${drive}`;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  const safeSetData = (data, setMethod, defaultValue) => {
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
  const safeGetData = (data) => {
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
  // fill marks
  useEffect(() => {
    fetch('https://cars-base.ru/api/cars')
      .then(response => response.json())
      .then(data => safeSetData(data, setMarks, []))
      .catch(error => console.log(error));
  }, []);

  // fill models
  const getModels = async (selectedMark) => {
    if (selectedMark === '') {
      return [];
    }
    try {
      const resp = await fetch(`https://cars-base.ru/api/cars/${selectedMark}`);
      return safeGetData(resp.json());
    } catch (error) {
      console.log(error)
    }
  }

  // fill generations
  const getGenerations = async (selectedMark, selectedModel) => {
    if (selectedMark === '' || selectedModel === '') {
      return [];
    }
    try {
      const resp = await fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}`);
      return safeGetData(resp.json());
    } catch (error) {
      console.log(error)
    }
  }

  // fill configurations
  const getConfigurations = async (selectedMark, selectedModel, selectedGeneration) => {
    if (selectedMark === '' || selectedModel === '' || selectedGeneration === '') {
      return [];
    }
    try {
      const resp = await fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}/${selectedGeneration}`);
      return safeGetData(resp.json());
    } catch (error) {
      console.log(error)
    }
  }

  // fill modifications
  const getModifications = (configurations, selectedConfiguration) => {
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
  const getGenerationYears = (generations, selectedGeneration) => {
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

  return (

    <div className='App'>
      <Formik
        initialValues={{
          marks: marks,
          models: [],
          generations: [],
          configurations: [],
          modifications: [],
          years: [],

          year: '',
          mark: '',
          markText: '',
          model: '',
          modelText: '',
          generation: '',
          generationText: '',
          configuration: '',
          configurationText: '',
          modification: '',
          modificationText: '',
          state: '',
          mileage: '',
          sellingMethod: '',
          info: '',
          country: '',
          city: '',
          phone: '',
        }}
        onSubmit={values => {
          console.log('submit', values);
        }}
      >
        {props => {
          const {
            values,
            dirty,
            isSubmitting,
            handleChange,
            handleSubmit,
            handleReset,
            setFieldValue
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Field
                id='mark'
                name='mark'
                as='select'
                value={values.mark}
                onChange={async e => {
                  const { value } = e.target;
                  const models = await getModels(value);
                  setFieldValue('mark', value);
                  setFieldValue('markText', getOptionText(e.target));
                  setFieldValue('models', models);

                  setFieldValue('model', '');
                  setFieldValue('generation', '');
                  setFieldValue('configuration', '');
                  setFieldValue('modification', '');
                  setFieldValue('year', '');

                  setFieldValue('generations', []);
                  setFieldValue('configurations', []);
                  setFieldValue('modifications', []);
                  setFieldValue('years', []);
                }}
              >
                <option value=''>Выберите марку</option>
                {marks.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <br />
              <Field
                id='model'
                name='model'
                as='select'
                value={values.model}
                onChange={async e => {
                  const { value } = e.target;
                  const generations = await getGenerations(values.mark, value);
                  setFieldValue('model', value);
                  setFieldValue('modelText', getOptionText(e.target));
                  setFieldValue('generations', generations);

                  setFieldValue('generation', '');
                  setFieldValue('configuration', '');
                  setFieldValue('modification', '');
                  setFieldValue('year', '');

                  setFieldValue('configurations', []);
                  setFieldValue('modifications', []);
                  setFieldValue('years', []);
                }}
              >
                <option value=''>Выберите модель</option>
                {values.models.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <br />
              <Field
                id='generation'
                name='generation'
                as='select'
                value={values.generation}
                onChange={async e => {
                  const { value } = e.target;
                  const configurations = await getConfigurations(values.mark, values.model, value);
                  setFieldValue('generation', value);
                  setFieldValue('generationText', getOptionText(e.target));
                  setFieldValue('configurations', configurations);

                  setFieldValue('configuration', '');
                  setFieldValue('modification', '');
                  setFieldValue('year', '');

                  setFieldValue('modifications', []);
                  setFieldValue('years', []);
                }}
              >
                <option value=''>Выберите поколение</option>
                {values.generations.map(option => (
                  <option key={`gen_${option.id}`} value={option.id}>{getGenerationName(option)}</option>
                ))}
              </Field>
              <br />
              <Field
                id='configuration'
                name='configuration'
                as='select'
                value={values.configuration}
                onChange={async e => {
                  const { value } = e.target;
                  const modifications = getModifications(values.configurations, value);
                  setFieldValue('configuration', value);
                  setFieldValue('configurationText', getOptionText(e.target));
                  setFieldValue('modifications', modifications);

                  setFieldValue('modification', '');
                  setFieldValue('year', '');

                  setFieldValue('years', []);
                }}
              >
                <option value=''>Выберите конфигурацию</option>
                {values.configurations.map(option => (
                  <option key={`conf_${option.id}`} value={option.id}>{getConfigurationName(option)}</option>
                ))}
              </Field>
              <br />
              <Field
                id='modification'
                name='modification'
                as='select'
                value={values.modification}
                onChange={async e => {
                  const { value } = e.target;
                  const years = getGenerationYears(values.generations, values.generation);
                  setFieldValue('modification', value);
                  setFieldValue('modificationText', getOptionText(e.target));
                  setFieldValue('years', years);

                  setFieldValue('year', '');
                }}
              >
                <option value=''>Выберите модификацию</option>
                {values.modifications.map(option => (
                  <option key={option['complectation-id']} value={option['complectation-id']}>{getModificationName(option)}</option>
                ))}
              </Field>
              <br />
              <Field
                id='year'
                name='year'
                as='select'
                value={values.year}
                onChange={async e => {
                  const { value } = e.target;

                  setFieldValue('year', value);
                }}
              >
                <option value=''>Выберите год выпуска</option>
                {values.years.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Field>
              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}

      </Formik>
    </div>)
}
export default App;


/*
<br />
<label className={classnames(styles.label, { [styles.errorLabel]: errors.Year && touched.Year })}>
  Год выпуска
</label>
<Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Year && touched.Year })}
  name='Year'
  validate={validateYear}>
  <option selected value='-1'>Выберите год выпуска</option>
  <option value='2023'>2023</option>
  <option value='2022'>2022</option>
  <option value='2021'>2021</option>
</Field>
{errors.Year && touched.Year && <div className={styles.error}>{errors.Year}</div>}
<br />
*/