
import { React, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import styles from './App.css';
const tg = window.Telegram.WebApp;

const App = () => {
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [configurations, setConfigurations] = useState([]);

  const [selectedMark, setSelectedMark] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedConfiguration, setSelectedConfiguration] = useState('');


  const getGenerationName = (option) => {
    let yTo = option['year-stop'] === null ? 'н.в.' : option['year-stop'];
    let yFrom = option['year-start'];
    let name = option['name'];
    return `${yFrom} - ${yTo} ${name}`;
  }
  const safeSetData = (data, setMethod, defaultValue) => {
    if (data.error) {
      console.log(data.error);
      setMethod(defaultValue);
    }
    else {
      setMethod(data);
    }
  }
  useEffect(() => {

    setMarks([]);
    setModels([]);
    setGenerations([]);

    setSelectedMark('');
    setSelectedModel('');
    setSelectedGeneration('');

    fetch('https://cars-base.ru/api/cars')
      .then(response => response.json())
      .then(data => safeSetData(data, setMarks, []))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    setModels([]);
    if (selectedMark !== '') {

      setSelectedModel('');
      setSelectedGeneration('');

      fetch(`https://cars-base.ru/api/cars/${selectedMark}`)
        .then(response => response.json())
        .then(data => safeSetData(data, setModels, []))
        .catch(error => console.log(error));
    } else {
      setGenerations([]);
    }
  }, [selectedMark]);

  useEffect(() => {
    setGenerations([]);
    if (selectedModel !== '' && selectedMark !== '') {
      fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}`)
        .then(response => response.json())
        .then(data => safeSetData(data, setGenerations, []))
        .catch(error => console.log(error));
    } else {

    }
  }, [selectedModel]);

  const getRegions = country => {
    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (country) {
        case "United States":
          resolve([
            { value: "Washington", label: "Washington" },
            { value: "California", label: "California" }
          ]);
          break;
        case "Canada":
          resolve([
            { value: "Alberta", label: "Alberta" },
            { value: "NovaScotia", label: "Nova Scotia" }
          ]);
          break;
        default:
          resolve([]);
      }
    });
  };
  return (

    <div className='App'>
      <Formik
        initialValues={{
          year: '',
          mark: '',
          model: '',
          generation: '',
          configuration: '',
          modification: '',
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
                  setSelectedMark(value);
                  setFieldValue('mark', value);
                  setFieldValue('models', models);
                }}
              >
                <option value=''>Выберите марку</option>
                {marks.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <Field
                id='model'
                name='model'
                as='select'
                value={values.model}
                onChange={async e => {
                  const { value } = e.target;
                  setSelectedModel(value);
                  setFieldValue('model', value);
                  setFieldValue('generations', generations);
                }}
              >
                <option value=''>Выберите модель</option>
                {models.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </Field>
              <Field
                id='generation'
                name='generation'
                as='select'
                value={values.generation}
                onChange={async e => {
                  const { value } = e.target;
                  setSelectedGeneration(value);
                  console.log(value);
                  setFieldValue('generation', value);
                  // setFieldValue('models', models);
                }}
              >
                <option value=''>Выберите поколение</option>
                {generations.map(option => (
                  <option key={option.id} value={option.id}>{getGenerationName(option)}</option>
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