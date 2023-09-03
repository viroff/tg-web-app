import { React, useState, useEffect } from 'react';
import classnames from 'classnames';
import * as yup from 'yup';
import { Formik, useFormik, Field } from 'formik';
import { getCountries, getCities } from './api/geoApi';
import { getCurrencies } from './api/currencyApi';
import FileUploaderMultiple from './Components/FileUploaderMultiple';
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
    //fetch('https://cars-base.ru/api/cars')
    fetch('https://localhost:7007/api/v1.0/vehicles/marks')
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
    formData.append('mileage', mileage.replace(/\s/g, ''));
    formData.append('model', model);
    formData.append('modification', modification);
    formData.append('phone', phone);
    formData.append('sellingType', sellingType);
    formData.append('year', year);
    formData.append('price', price.replace(/\s/g, ''));
    formData.append('currencyId', currencyId);
    formData.append('userId', mockinitDataUnsafe.user.id);
    images.forEach((image) => {
      formData.append('files', dataURLtoFile(image.url, image.id));
    });
    //await fetch('https://5fbb-94-19-146-12.ngrok-free.app/api/poster', {
    await fetch('https://localhost:7007/api/v1.0/posters', {
      method: 'POST',
      body: formData,
      headers: {
        'ngrok-skip-browser-warning': true,
        'Access-Control-Allow-Origin': '*',
      },
    });
  };

  const validationSchema = yup.object({
    phone: yup.string().min(8, 'Укажите телефон в международном формате')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
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
      modification: '',
      modificationText: '',
      state: '',
      mileage: '',
      sellingMethod: '',
      info: ' ',
      country: '',
      city: '',
      price: '',
      currencyId: 0,
      phone: '',
    },
    validationSchema: validationSchema,
  });
  return (
    <div className='App'>
      <form onSubmit={e => { e.preventDefault(); }}>
        <div className="panel">
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
            value={formik.values.mark}
            //filter
            //showFilterClear
            // showOnFocus
            //validate={validateMark}
            filterInputAutoFocus={false}
            optionLabel="name"
            onChange={async e => {
              const { value } = e.target;
              const models = await getModels(value);
              formik.setFieldValue('mark', value);
              formik.setFieldValue('markText', getOptionText(e.target));
              formik.setFieldValue('models', models);

              formik.setFieldValue('model', '');
              formik.setFieldValue('generation', '');
              formik.setFieldValue('configuration', '');
              formik.setFieldValue('modification', '');
              formik.setFieldValue('year', '');

              formik.setFieldValue('generations', []);
              formik.setFieldValue('configurations', []);
              formik.setFieldValue('modifications', []);
              formik.setFieldValue('years', []);
            }}
          >
            <option value='' hidden>Выберите марку</option>
            {marks.map((mark) => (<option key={'mark_' + mark.id} value={mark.id}>{mark.name}</option>))}
          </Select>
          <div className='bottompadded' />
          <Select
            disabled={formik.values.models.length === 0}
            id='model'
            name='model'
            value={formik.values.model}
            onChange={async e => {
              const { value } = e.target;
              const generations = await getGenerations(formik.values.mark, value);
              formik.setFieldValue('model', value);
              formik.setFieldValue('modelText', getOptionText(e.target));
              formik.setFieldValue('generations', generations);

              formik.setFieldValue('generation', '');
              formik.setFieldValue('configuration', '');
              formik.setFieldValue('modification', '');
              formik.setFieldValue('year', '');

              formik.setFieldValue('configurations', []);
              formik.setFieldValue('modifications', []);
              formik.setFieldValue('years', []);
            }}
          >
            <option value='' hidden>Выберите модель</option>
            {formik.values.models.map((model) => (<option key={'model_' + model.id} value={model.id}>{model.name}</option>))}
          </Select>
          <div className='bottompadded' />
          <Select
            disabled={formik.values.generations.length === 0}
            id='generation'
            name='generation'
            value={formik.values.generation}
            onChange={async e => {
              const { value } = e.target;
              const configurations = await getConfigurations(formik.values.mark, formik.values.model, value);
              formik.setFieldValue('generation', value);
              formik.setFieldValue('generationText', getOptionText(e.target));
              formik.setFieldValue('configurations', configurations);

              formik.setFieldValue('configuration', '');
              formik.setFieldValue('modification', '');
              formik.setFieldValue('year', '');

              formik.setFieldValue('modifications', []);
              formik.setFieldValue('years', []);
            }}>
            <option value='' hidden>Выберите поколение</option>
            {formik.values.generations.map(generation => (<option key={'gen_' + generation.id} value={generation.id}>{getGenerationName(generation)}</option>))}
          </Select>
          <div className='bottompadded' />
          <Select
            disabled={formik.values.configurations.length === 0}
            id='configuration'
            name='configuration'
            value={formik.values.configuration}
            onChange={async e => {
              const { value } = e.target;
              const modifications = getModifications(formik.values.configurations, value);
              formik.setFieldValue('configuration', value);
              formik.setFieldValue('configurationText', getOptionText(e.target));
              formik.setFieldValue('modifications', modifications);

              formik.setFieldValue('modification', '');
              formik.setFieldValue('year', '');

              formik.setFieldValue('years', []);
            }}>
            <option value='' hidden>Выберите конфигурацию</option>
            {formik.values.configurations.map(configuration => (<option key={'con_' + configuration.id} value={configuration.id}>{getConfigurationName(configuration)}</option>))}
          </Select>
          <div className='bottompadded' />
          <Select
            disabled={formik.values.modifications.length === 0}
            id='modification'
            name='modification'
            value={formik.values.modification}
            onChange={async e => {
              const { value } = e.target;
              const years = getGenerationYears(formik.values.generations, formik.values.generation);
              formik.setFieldValue('modification', value);
              formik.setFieldValue('modificationText', getOptionText(e.target));
              formik.setFieldValue('years', years);

              formik.setFieldValue('year', '');
            }}>
            <option value='' hidden>Выберите модификацию</option>
            {formik.values.modifications.map(modification => (<option key={'mod_' + modification['complectation-id']} value={modification['complectation-id']}>{getModificationName(modification)}</option>))}
          </Select>
          <div className='bottompadded' />
          <Select
            disabled={formik.values.years.length === 0}
            id='year'
            name='year'
            value={formik.values.year}
            onChange={async e => {
              const { value } = e.target;
              formik.setFieldValue('year', value);
            }}>
            <option value='' hidden>Выберите год выпуска</option>
            {formik.values.years.map(year => (<option key={'years_' + year} value={year}>{year}</option>))}
          </Select>
          <div className='bottompadded' />
          <Input
            className='fullwidth'
            disabled={formik.values.year === ''}
            id='mileage'
            name='mileage'
            placeholder='Пробег'
            contentAfter={'км.'}
            value={formik.values.mileage}
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
              formik.setFieldValue('mileage', dividedValue);
            }}
          />
          <div className='bottompadded' />
          <Select
            disabled={conditions.length === 0 || formik.values.mileage === ''}
            id='condition'
            name='condition'
            value={formik.values.condition}
            onChange={async e => {
              const { value } = e.target;
              formik.setFieldValue('condition', value);
            }}>
            <option value='' hidden>Состояние</option>
            {conditions.map(condition => (<option key={'condition_' + condition.id} value={condition.id}>{condition.name}</option>))}
          </Select>
          <div className='bottompadded' />
          <Divider align="left" className='bottompadded'><b>Параметры предложения</b></Divider>
          <Select
            disabled={sellingTypes.length === 0 || formik.values.condition === ''}
            id='sellingtype'
            name='sellingtype'
            value={formik.values.sellingType}
            onChange={async e => {
              const { value } = e.target;
              formik.setFieldValue('sellingType', value);
            }}>
            <option value='' hidden>Тип продажи</option>
            {sellingTypes.map(st => (<option key={'st_' + st.id} value={st.id}>{st.name}</option>))}
          </Select>
          <div className='bottompadded' />
          <Textarea
            className='fullwidth'
            disabled={formik.values.sellingType === ''}
            id='info'
            name='info'
            rows={5} cols={30}
            maxLength='256'
            placeholder='Дополнительная информация'
            onChange={async e => {
              const { value } = e.target;
              formik.setFieldValue('info', value);
            }}
            value={formik.values.info}
          />
          <div className='bottompadded' />
          <div className="inoneline">
            <Input
              disabled={currencies.length === 0 || formik.values.sellingType === ''}
              id='price'
              name='price'
              value={formik.values.price}
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
                formik.setFieldValue('price', dividedValue);
              }}
            />
            <div className='bottompadded' />
            <Select
              disabled={currencies.length === 0 || formik.values.sellingType === ''}
              id='currencyId'
              name='currencyId'
              as='select'
              value={formik.values.currencyId}
              onChange={async e => {
                const { value } = e.target;
                formik.setFieldValue('currencyId', value);
              }}>
              {currencies.map(curr => (<option key={'curr_' + curr.id} value={curr.id}>{curr.isoName}</option>))}
            </Select>
          </div>
          <div className='bottompadded' />

          <div className='bottompadded' />
          <Divider align="left" className='bottompadded'><b>Фотографии</b></Divider>
          <FileUploaderMultiple images={images} setImages={setImages} />
          <div className='bottompadded' />
          <Divider align="left" className='bottompadded'><b>Место продажи</b></Divider>
          <Select
            disabled={countries.length === 0 || formik.values.price === ''}
            id='country'
            name='country'
            value={formik.values.country}
            onChange={async e => {
              const { value } = e.target;
              formik.setFieldValue('country', value);
              const cities = await getCities(value);
              formik.setFieldValue('cities', cities);
              formik.setFieldValue('city', '');
            }}>
            <option value='' hidden>Страна</option>
            {countries.map(cntr => (<option key={'cntr_' + cntr.id} value={cntr.id}>{cntr.name}</option>))}
          </Select>
          <div className='bottompadded' />
          <Select
            disabled={formik.values.cities.length === 0 || formik.values.country === ''}
            id='city'
            name='city'
            value={formik.values.city}
            onChange={async e => {
              const { value } = e.target;
              formik.setFieldValue('city', value);
            }}>
            <option value='' hidden>Город</option>
            {formik.values.cities.map(city => (<option key={'city_' + city.id} value={city.id}>{city.name}</option>))}
          </Select>
          <div className='bottompadded' />
          <Divider align="left" className='bottompadded'><b>Контактная информация</b></Divider>
          <Input
            className='fullwidth'
            disabled={formik.values.city === ''}
            id='phone'
            name='phone'
            value={formik.values.phone}
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
              formik.setFieldValue('phone', plusedValue);
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
              onClick={() => submitPoster(formik.values)}
              type={'submit'} disabled={!(formik.isValid && formik.dirty && images.length > 0 && !formik.isSubmitting)}>
              Добавить объявление
            </Button></div>
          {/* {'isValid dirty  images.length  isSubmitting'}
          <br/>
          {formik.isValid + ' ' + formik.dirty + ' ' + images.length + ' ' + formik.isSubmitting} */}
        </div>
      </form>
    </div>)
}
export default App;