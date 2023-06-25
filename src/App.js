import { React, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { getCountries, getCities } from './api/geoApi';
import { getCurrencies } from './api/currencyApi';
import FileUploader from './Components/FileUploader';
import { dataURLtoFile } from './utils/base64toFile'

import {
  getOptionText,
  getGenerationName,
  getConfigurationName,
  getModificationName,
  safeGetData,
  safeSetData,
  getModels,
  getGenerations,
  getModifications,
  getConfigurations,
  getGenerationYears,
} from './utils/addposter';

import {
  validateMark,
  validateModel,
  validateGeneration,
  validateConfiguration,
  validateModification,
  validateMileage,
  validateCondition,
  validateSellingType,
  validateCountry,
  validateCity,
  validatePhone,
  validateInfo,
  validateYear,
  validatePrice,
  validateCurrencyId,
} from './utils/validators';
import styles from './App.css';

const App = () => {
  const [marks, setMarks] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [sellingTypes, setSellingTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [images, setImages] = useState([]);
  const [tgApp, setTg] = useState(window.Telegram.WebApp);
  const [tgUser, setTgUser] = useState(window.WebAppUser);



  // fill marks
  useEffect(() => {
    fetch('https://cars-base.ru/api/cars')
      .then(response => response.json())
      .then(data => safeSetData(data, setMarks, []))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    setConditions([
      { name: 'Хорошее', id: 0 },
      { name: 'На ходу', id: 1 },
      { name: 'Битый', id: 2 },
      { name: 'Не на ходу', id: 3 },
      { name: 'Тотал', id: 4 }]);
  }, []);

  useEffect(() => {
    setSellingTypes([
      { name: 'Простая продажа', id: 0 },
      { name: 'Лом', id: 1 },
      { name: 'По запчастям', id: 2 }]);
  }, []);

  useEffect(() => {
    const getCountriesInternal = async () => {
      const cs = await getCountries();
      setCountries(safeGetData(cs));
    };
    getCountriesInternal();
  }, []);
  
  useEffect(() => {
    const getCurrenciesInternal = async () => {
      const currencies = await getCurrencies();
      setCurrencies(safeGetData(currencies));
    };
    getCurrenciesInternal();
  }, []);

  const submitPoster = async (values) => {

    const { city,
      condition,
      configuration,
      country,
      generation,
      info,
      mark,
      mileage,
      model,
      modification,
      phone,
      sellingType,
      year,
      price,
      currencyId,
      modelText,
      generationText,
      configurationText,
      modificationText } = values;

    const formData = new FormData();
    formData.append('city', city);
    formData.append('condition', condition);
    formData.append('configuration', configuration);
    formData.append('country', country);
    formData.append('generation', generation);
    formData.append('info', info);
    formData.append('mark', mark);
    formData.append('mileage', mileage);
    formData.append('model', model);
    formData.append('modification', modification);
    formData.append('phone', phone);
    formData.append('sellingType', sellingType);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('currencyId', currencyId);
    images.forEach((image) => {
      formData.append('files', dataURLtoFile(image.data, image.file.name));
    });
    console.log(tgApp);
    console.log(tgUser);
    console.log("modelText:" + modelText + " generationText:" + generationText + " configurationText:" + configurationText + " modificationText" + modificationText);
    console.log(formData);
    await fetch('http://localhost:5007/api/poster', {
      method: 'POST',
      body: formData,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  };
  return (

    <div className='App'>
      <Formik
        initialValues={{
          models: [],
          generations: [],
          configurations: [],
          modifications: [],
          years: [],
          cities: [],
          condition: '',
          sellingType: '',
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
          phone: '+',
          price: '',
          currencyId: 0,
        }}
        onSubmit={submitPoster}
      >
        {props => {
          const {
            values,
            dirty,
            isSubmitting,
            isValid,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
            setErrors,
            setFieldTouched
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                id='mark'
                name='mark'
                as='select'
                value={values.mark}
                validate={validateMark}
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
                validate={validateModel}
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
                validate={validateGeneration}
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
                validate={validateConfiguration}
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
                validate={validateModification}
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
                validate={validateYear}
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
              <p>-------------</p>
              <Field
                id='mileage'
                name='mileage'
                as='input'
                placeholder='Пробег'
                validate={validateMileage}
                onKeyDown={async e => {
                  const allowedChars = /^[0-9]+$/;
                  const inputValue = e.target.value;
                  const isNotBs = e.key !== 'Backspace';
                  if (!allowedChars.test(e.key) && isNotBs) {
                    e.preventDefault();
                  } else if (inputValue.length > 6 && isNotBs) {
                    e.preventDefault();
                  }
                }}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('mileage', value);
                }}
              />
              {errors.mileage && touched.mileage && <div className={styles.error}>{errors.mileage}</div>}
              <br />
              <Field
                id='condition'
                name='condition'
                as='select'
                value={values.condition}
                validate={validateCondition}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('condition', value);
                }}
              >
                <option value=''>Укажите состояние</option>
                {conditions.map(option => (
                  <option key={'c_' + option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <br />
              <Field
                id='sellingtype'
                name='sellingtype'
                as='select'
                value={values.sellingType}
                validate={validateSellingType}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('sellingType', value);
                }}
              >
                <option value=''>Укажите тип продажи</option>
                {sellingTypes.map(option => (
                  <option key={'st_' + option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <p>---------------------------------------</p>
              <br />
              <Field
                id='country'
                name='country'
                as='select'
                value={values.country}
                validate={validateCountry}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('country', value);
                  const cities = await getCities(value);
                  setFieldValue('cities', cities);
                  setFieldValue('city', '');
                }}
              >
                <option value=''>Страна продажи</option>
                {countries.map(option => (
                  <option key={'ctr_' + option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <br />
              <Field
                id='city'
                name='city'
                as='select'
                value={values.city}
                validate={validateCity}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('city', value);
                }}
              >
                <option value=''>Город продажи</option>
                {values.cities.map(option => (
                  <option key={'cty_' + option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <p>---------------------------------------</p>
              <Field
                id='phone'
                name='phone'
                as='input'
                placeholder='Телефон'
                validate={validatePhone}
                onKeyDown={async e => {
                  const onlyDigitsAndPlus = /^[0-9+]*$/;
                  const { key, target } = e;
                  if ((target.selectionStart === 1 || target.selectionStart === 0) && key === 'Backspace') {
                    e.preventDefault();
                  }
                  if (!(onlyDigitsAndPlus.test(key) || key === 'Backspace')) {
                    e.preventDefault();
                  }
                }}
                onChange={async e => {
                  const { value } = e.target;
                  if (!value.startsWith('+')) {
                    setFieldValue('phone', '');
                  }
                  else {
                    setFieldValue('phone', value);
                  }
                }}
              />
              {errors.phone && touched.phone && <div className={styles.error}>{errors.phone}</div>}
              <br />
              <Field
                id='info'
                name='info'
                as='textarea'
                rows='5' cols='35'
                maxLength='256'
                placeholder='Дополнительная информация'
                validate={validateInfo}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('info', value);
                }}
              />
              <p>-------------</p>
              <Field
                id='price'
                name='price'
                as='input'
                placeholder='Цена'
                validate={validatePrice}
                onKeyDown={async e => {
                  const allowedChars = /^[0-9]+$/;
                  const inputValue = e.target.value;
                  const isNotBs = e.key !== 'Backspace';
                  if (!allowedChars.test(e.key) && isNotBs) {
                    e.preventDefault();
                  } else if (inputValue.length > 9 && isNotBs) {
                    e.preventDefault();
                  }
                }}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('price', value);
                }}
              />
              <Field
                id='currencyId'
                name='currencyId'
                as='select'
                value={values.currencyId}
                validate={validateCurrencyId}
                onChange={async e => {
                  const { value } = e.target;
                  setFieldValue('currencyId', value);
                }}
              >
                {currencies.map(option => (
                  <option key={'curr_' + option.id} value={option.id}>{option.isoName}</option>
                ))}
              </Field>
              {errors.price && touched.price && <div className={styles.error}>{errors.price}</div>}
              <FileUploader images={images} setImages={setImages} />

              <div>tgUser {tgUser}</div>


              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type={'submit'} disabled={!(isValid && dirty && images.length > 0 && !isSubmitting)}>
                Submit
              </button>
            </Form>
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