import { React, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { getCountries, getCities } from './api/geoApi';
import { getCurrencies } from './api/currencyApi';
import FileUploader from './Components/FileUploader';
import { dataURLtoFile } from './utils/base64toFile';
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';

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
          state: {},
          mileage: '',
          sellingMethod: {},
          info: '',
          country: {},
          city: {},
          price: '',
          currencyId: 0,
          currency: {},
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
            <div className="card flex justify-content-center ">
              
              <Form onSubmit={handleSubmit}>
              <p className='agreement'>Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
              anim id est laborum.</p>
              <select>
                <option>AAA</option>
                <option>BBB</option>
                <option>CCC</option>
                <option>DDD</option>
              </select>
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                    <b>Автомобиль</b>
                  </div>
                </Divider>
                <Dropdown
                  emptyFilterMessage="Такой марки нет"
                  className="w-full"
                  placeholder="Выберите марку"
                  id='mark'
                  name='mark'
                  value={values.mark}
                  //filter
                  //showFilterClear
                  // showOnFocus
                  //validate={validateMark}
                  filterInputAutoFocus={false}
                  optionLabel="name"
                  valueTemplate={(option, props) => {
                    if (option) {
                      return (
                        <div className="flex align-items-center">
                          <div>{option.name}</div>
                        </div>
                      );
                    }

                    return <span>{props.placeholder}</span>;
                  }}
                  itemTemplate={(option) => {
                    return (
                      <div className="flex align-items-center">
                        <div>{option.name}</div>
                      </div>
                    );
                  }}
                  onChange={async e => {
                    const { value } = e.target;
                    const models = await getModels(value.id);
                    setFieldValue('mark', value);
                    setFieldValue('markText', value.name);
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
                  options={marks}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={values.models.length === 0}
                  className="w-full "
                  id='model'
                  name='model'
                  value={values.model}
                  onChange={async e => {
                    const { value } = e.target;
                    const generations = await getGenerations(values.mark.id, value.id);
                    setFieldValue('model', value);
                    setFieldValue('modelText', value.id);
                    setFieldValue('generations', generations);

                    setFieldValue('generation', '');
                    setFieldValue('configuration', '');
                    setFieldValue('modification', '');
                    setFieldValue('year', '');

                    setFieldValue('configurations', []);
                    setFieldValue('modifications', []);
                    setFieldValue('years', []);
                  }}
                  placeholder='Выберите модель'
                  optionLabel="name"
                  options={values.models}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={values.generations.length === 0}
                  className="w-full "
                  id='generation'
                  name='generation'
                  value={values.generation}
                  onChange={async e => {
                    const { value } = e.target;
                    const configurations = await getConfigurations(values.mark.id, values.model.id, value.id);
                    setFieldValue('generation', value);
                    setFieldValue('generationText', value.id);
                    setFieldValue('configurations', configurations);

                    setFieldValue('configuration', '');
                    setFieldValue('modification', '');
                    setFieldValue('year', '');

                    setFieldValue('modifications', []);
                    setFieldValue('years', []);
                  }}
                  placeholder='Выберите поколение'
                  optionLabel="fullName"
                  options={values.generations.map(option => ({ ...option, fullName: getGenerationName(option) }))}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={values.configurations.length === 0}
                  className="w-full "
                  id='configuration'
                  name='configuration'
                  value={values.configuration}
                  onChange={async e => {
                    const { value } = e.target;
                    const modifications = getModifications(values.configurations, value.id);
                    setFieldValue('configuration', value);
                    setFieldValue('configurationText', value.id);
                    setFieldValue('modifications', modifications);

                    setFieldValue('modification', '');
                    setFieldValue('year', '');

                    setFieldValue('years', []);
                  }}
                  placeholder='Выберите конфигурацию'
                  optionLabel="fullName"
                  options={values.configurations.map(option => ({ ...option, fullName: getConfigurationName(option) }))}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={values.modifications.length === 0}
                  className="w-full "
                  id='modification'
                  name='modification'
                  value={values.modification}
                  onChange={async e => {
                    const { value } = e.target;
                    const years = getGenerationYears(values.generations, values.generation.id);
                    setFieldValue('modification', value);
                    setFieldValue('modificationText', value.id);
                    setFieldValue('years', years);

                    setFieldValue('year', '');
                  }}
                  placeholder='Выберите модификацию'
                  optionLabel="fullName"
                  options={values.modifications.map(option => ({ ...option, fullName: getModificationName(option) }))}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={values.years.length === 0}
                  className="w-full "
                  id='year'
                  name='year'
                  value={values.year}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('year', value);
                  }}
                  placeholder='Выберите год выпуска'
                  options={values.years}
                />
                <div className='row-divider' />
                <InputNumber
                  className="w-full "
                  id='mileage'
                  name='mileage'
                  placeholder='Пробег'
                  suffix=' км.'
                  locale="ru-RU"
                  minFractionDigits={0}
                  max={99_999_999}
                  value={values.mileage}
                  onChange={async e => {
                    const { value } = e;
                    setFieldValue('mileage', value);
                  }}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={conditions.length === 0}
                  className="w-full "
                  id='condition'
                  name='condition'
                  value={values.condition}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('condition', value);
                  }}
                  placeholder='Состояние'
                  optionLabel="name"
                  options={conditions}
                />
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                    <b>Параметры предложения</b>
                  </div>
                </Divider>
                <Dropdown
                  disabled={sellingTypes.length === 0}
                  className="w-full "
                  id='sellingtype'
                  name='sellingtype'
                  value={values.sellingType}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('sellingType', value);
                  }}
                  placeholder='Тип продажи'
                  optionLabel="name"
                  options={sellingTypes}
                />
                <div className='row-divider' />
                <InputTextarea
                  autoResize
                  className="w-full "
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
                <div className='row-divider' />
                <div className="inoneline">
                  <InputNumber
                    id='price'
                    name='price'
                    locale="jp-JP"
                    placeholder='Цена'
                    onChange={async e => {
                      const { value } = e;
                      setFieldValue('price', value);
                    }}
                  />
                  <Dropdown
                    disabled={currencies.length === 0}
                    id='currencyId'
                    name='currencyId'
                    as='select'
                    value={isObjectEmpty(values.currency) ? currencies[0] : values.currency}
                    onChange={async e => {
                      const { value } = e.target;
                      setFieldValue('currency', value);
                    }}
                    optionLabel="isoName"
                    options={currencies}
                  />
                </div>
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                    <b>Фотографии</b>
                  </div>
                </Divider>
                <FileUploader images={images} setImages={setImages} />
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                    <b>Место продажи</b>
                  </div>
                </Divider>
                <Dropdown
                  disabled={countries.length === 0}
                  className="w-full "
                  id='country'
                  name='country'
                  value={values.country}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('country', value);
                    const cities = await getCities(value.id);
                    setFieldValue('cities', cities);
                    setFieldValue('city', '');
                  }}
                  placeholder='Страна'
                  optionLabel="name"
                  options={countries}
                />
                <div className='row-divider' />
                <Dropdown
                  disabled={values.cities.length === 0}
                  id='city'
                  className="w-full "
                  name='city'
                  value={values.city}
                  onChange={async e => {
                    const { value } = e.target;
                    setFieldValue('city', value);
                  }}
                  placeholder='Город'
                  optionLabel="name"
                  options={values.cities}
                />
                <Divider align="left">
                  <div className="inline-flex align-items-center">
                    <b>Контактная информация</b>
                  </div>
                </Divider>
                <InputNumber
                  useGrouping={false}
                  id='phone'
                  className="w-full "
                  name='phone'
                  placeholder='Телефон'
                  prefix='+'
                  value={values.phone}
                  locale="ru-RU"
                  onChange={async e => {
                    const { value } = e;
                    setFieldValue('phone', value);
                  }}
                />
                <div className='row-divider' />
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
                <div className="flex justify-content-center ">
                  <Button
                    className='marginLeft'
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