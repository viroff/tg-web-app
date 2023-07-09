import { React, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { getCountries, getCities } from './api/geoApi';
import { getCurrencies } from './api/currencyApi';
import FileUploader from './Components/FileUploader';
import { dataURLtoFile } from './utils/base64toFile';
import { Button, Textarea, Divider, Select, Input } from '@fluentui/react-components';


import {
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
  isObjectEmpty,
  getOptionText
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
  const [tgApp, setTg] = useState(window.Telegram.WebApp);  // tg init


  useEffect(() => {
    console.info('Tg init');
    if (tgApp) {
      tgApp.expand();
      console.info('bot screen expanded');
    }
  }, []);

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
      currency,
      modelText,
      generationText,
      configurationText,
      modificationText } = values;

    // tgApp.initDataUnsafe
    const mockinitDataUnsafe = {
      query_id: "AAH8WfcvAgAAAPxZ9y-cSGVW",
      user: {
        id: 5099706876,
        first_name: "Michael",
        last_name: "Newman",
        username: "Michaelnman",
        language_code: "ru"
      },
      auth_date: "1687722413",
      hash: "7cdfb7a3b7235d77e2628ceb8abf32562a9a9bff33e941674de4dc68b82d29f7"
    };

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
    formData.append('currencyId', currency.id);
    formData.append('userId', mockinitDataUnsafe.user.id);
    images.forEach((image) => {
      formData.append('files', dataURLtoFile(image.data, image.file.name));
    });
    console.log(tgApp);
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
          mark: {},
          markText: '',
          model: {},
          modelText: '',
          generation: {},
          generationText: '',
          configuration: {},
          configurationText: '',
          modification: {},
          modificationText: '',
          state: '',
          mileage: '',
          sellingMethod: '',
          info: ' ',
          country: '',
          city: '',
          price: '',
          currencyId: 0,
          currency: '',
          phone: '',
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
            <div className="panel">
              <Form onSubmit={handleSubmit}
                encType='multipart/form-data'>
                <p className='agreement bottompadded'>Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                  anim id est laborum.</p>
                <Divider align="left" className='bottompadded'><b>Автомобиль</b></Divider>
                <Select
                  id='mark'
                  name='mark'
                  value={values.mark}
                  //filter
                  //showFilterClear
                  // showOnFocus
                  //validate={validateMark}
                  filterInputAutoFocus={false}
                  optionLabel="name"
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
                  <option value='' hidden>Выберите марку</option>
                  {marks.map((mark) => (<option key={'mark_' + mark.id} value={mark.id}>{mark.name}</option>))}
                </Select>
                <div className='bottompadded' />
                <Select
                  disabled={values.models.length === 0}
                  id='model'
                  name='model'
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
                  <option value='' hidden>Выберите модель</option>
                  {values.models.map((model) => (<option key={'model_' + model.id} value={model.id}>{model.name}</option>))}
                </Select>
                <div className='bottompadded' />
                <Select
                  disabled={values.generations.length === 0}
                  id='generation'
                  name='generation'
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
                  }}>
                  <option value='' hidden>Выберите поколение</option>
                  {values.generations.map(generation => (<option key={'gen_' + generation.id} value={generation.id}>{getGenerationName(generation)}</option>))}
                </Select>
                <div className='bottompadded' />
                <Select
                  disabled={values.configurations.length === 0}
                  id='configuration'
                  name='configuration'
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
                  }}>
                  <option value='' hidden>Выберите конфигурацию</option>
                  {values.configurations.map(configuration => (<option key={'con_' + configuration.id} value={configuration.id}>{getConfigurationName(configuration)}</option>))}
                </Select>
                <div className='bottompadded' />
                <Select
                  disabled={values.modifications.length === 0}
                  id='modification'
                  name='modification'
                  value={values.modification}
                  onChange={async e => {
                    const { value } = e.target;
                    const years = getGenerationYears(values.generations, values.generation);
                    setFieldValue('modification', value);
                    setFieldValue('modificationText', getOptionText(e.target));
                    setFieldValue('years', years);

                    setFieldValue('year', '');
                  }}>
                  <option value='' hidden>Выберите модификацию</option>
                  {values.modifications.map(modification => (<option key={'mod_' + modification['complectation-id']} value={modification}>{getModificationName(modification)}</option>))}
                </Select>
                <div className='bottompadded' />
                <Select
                  disabled={values.years.length === 0}
                  id='year'
                  name='year'
                  value={values.year}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('year', value);
                  }}>
                  <option value='' hidden>Выберите год выпуска</option>
                  {values.years.map(year => (<option key={'years_' + year} value={year}>{year}</option>))}
                </Select>
                <div className='bottompadded' />
                <Input
                  className='fullwidth'
                  disabled={values.year === ''}
                  id='mileage'
                  name='mileage'
                  placeholder='Пробег'
                  contentAfter={'км.'}
                  value={values.mileage}
                  onKeyDown={async (e, data) => {
                    const allowedChars = /^[0-9]+$/;
                    const inputValue = e.target.value;
                    const isNotBs = e.key !== 'Backspace';
                    if (!allowedChars.test(e.key) && isNotBs) {
                      e.preventDefault();
                    } else if (inputValue.length > 9 && isNotBs) {
                      e.preventDefault();
                    }
                  }}
                  onChange={async (e, data) => {
                    const { value } = data;
                    const noBsValue = value.replace(/[^0-9]/g, '').slice(0, 8);
                    const dividedValue = noBsValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    setFieldValue('mileage', dividedValue);
                  }}
                />
                <div className='bottompadded' />
                <Select
                  disabled={conditions.length === 0 || values.mileage === ''}
                  id='condition'
                  name='condition'
                  value={values.condition}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('condition', value);
                  }}>
                  <option value='' hidden>Состояние</option>
                  {conditions.map(condition => (<option key={'condition_' + condition.id} value={condition.id}>{condition.name}</option>))}
                </Select>
                <div className='bottompadded' />
                <Divider align="left" className='bottompadded'><b>Параметры предложения</b></Divider>
                <Select
                  disabled={sellingTypes.length === 0 || values.condition === ''}
                  id='sellingtype'
                  name='sellingtype'
                  value={values.sellingType}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('sellingType', value);
                  }}>
                  <option value='' hidden>Тип продажи</option>
                  {sellingTypes.map(st => (<option key={'st_' + st.id} value={st.id}>{st.name}</option>))}
                </Select>
                <div className='bottompadded' />
                <Textarea
                  className='fullwidth'
                  disabled={values.sellingType === ''}
                  id='info'
                  name='info'
                  rows={5} cols={30}
                  maxLength='256'
                  placeholder='Дополнительная информация'
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('info', value);
                  }}
                  value={values.info}
                />
                <div className='bottompadded' />
                <div className="inoneline">
                  <Input
                    disabled={currencies.length === 0 || values.sellingType === ''}
                    id='price'
                    name='price'
                    value={values.price}
                    placeholder='Цена'
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
                    onChange={async (e, data) => {
                      const { value } = data;
                      const noBsValue = value.replace(/[^0-9]/g, '').slice(0, 8);
                      const dividedValue = noBsValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                      setFieldValue('price', dividedValue);
                    }}
                  />
                  <div className='bottompadded' />
                  <Select
                    disabled={currencies.length === 0 || values.sellingType === ''}
                    id='currencyId'
                    name='currencyId'
                    as='select'
                    value={isObjectEmpty(values.currency) ? currencies[0] : values.currency}
                    onChange={async e => {
                      const { value } = e.target;
                      setFieldValue('currency', value);
                    }}>
                    {currencies.map(curr => (<option key={'curr_' + curr.id} value={curr.id}>{curr.isoName}</option>))}
                  </Select>
                </div>
                <div className='bottompadded' />

                <div className='bottompadded' />
                <Divider align="left" className='bottompadded'><b>Фотографии</b></Divider>
                <FileUploader images={images} setImages={setImages} />
                <div className='bottompadded' />
                <Divider align="left" className='bottompadded'><b>Место продажи</b></Divider>
                <Select
                  disabled={countries.length === 0 || values.price === ''}
                  id='country'
                  name='country'
                  value={values.country}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('country', value);
                    const cities = await getCities(value);
                    setFieldValue('cities', cities);
                    setFieldValue('city', '');
                  }}>
                  <option value='' hidden>Страна</option>
                  {countries.map(cntr => (<option key={'cntr_' + cntr.id} value={cntr.id}>{cntr.name}</option>))}
                </Select>
                <div className='bottompadded' />
                <Select
                  disabled={values.cities.length === 0 || values.country === ''}
                  id='city'
                  name='city'
                  value={values.city}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('city', value);
                  }}>
                  <option value='' hidden>Город</option>
                  {values.cities.map(city => (<option key={'city_' + city.id} value={city.id}>{city.name}</option>))}
                </Select>
                <div className='bottompadded' />
                <Divider align="left" className='bottompadded'><b>Контактная информация</b></Divider>
                <Input
                  className='fullwidth'
                  disabled={values.city === ''}
                  id='phone'
                  name='phone'
                  value={values.phone}
                  placeholder='Телефон в международном формате'
                  onKeyDown={async e => {
                    const allowedChars = /^[0-9]+$/;
                    const inputValue = e.target.value;
                    const isNotBs = e.key !== 'Backspace';
                    if (!allowedChars.test(e.key) && isNotBs) {
                      e.preventDefault();
                    } else if (inputValue.length > 16 && isNotBs) {
                      e.preventDefault();
                    }
                  }}
                  onChange={async (e, data) => {
                    const { value } = data;
                    const allowedValue = value.replace(/[^0-9]/g, '');
                    const noPlusValue = allowedValue.replace('+', '').slice(0, 14);
                    const plusedValue = '+' + noPlusValue;
                    setFieldValue('phone', plusedValue);
                  }}
                />
                <div className='bottompadded' />
                {/* <Button
                  size="small"
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button> */}
                <Divider />
                <div className='bottompadded' />
                <div className="centerpanel">
                  <Button
                    size="normal"
                    severity="success"
                    type={'submit'} disabled={!(isValid && dirty && images.length > 0 && !isSubmitting)}>
                    Добавить объявление
                  </Button></div>

              </Form>
            </div>
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