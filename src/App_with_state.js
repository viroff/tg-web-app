
// import { React, useState, useEffect } from 'react';
// import classnames from 'classnames';
// import { Formik, Form, Field } from 'formik';
// import styles from './App.css';
// const tg = window.Telegram.WebApp;

// const App = () => {
//   const [marks, setMarks] = useState([]);
//   const [models, setModels] = useState([]);
//   const [generations, setGenerations] = useState([]);
//   const [configurations, setConfigurations] = useState([]);
//   const [modifications, setModifications] = useState([]);
//   const [years, setYears] = useState([]);

//   const [selectedMark, setSelectedMark] = useState('');
//   const [selectedModel, setSelectedModel] = useState('');
//   const [selectedGeneration, setSelectedGeneration] = useState('');
//   const [selectedConfiguration, setSelectedConfiguration] = useState('');
//   const [selectedModification, setSelectedModification] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');


//   const getYears = (gen) => {
//     try {
//       const date = new Date();
//       let yTo = gen['year-stop'] ? gen['year-stop'] : date.getFullYear();
//       let yFrom = gen['year-start'];
//       let result = [];
//       for (let i = yFrom; i <= yTo; i++) {
//         result.push(i);
//       }
//       return result;

//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   }

//   const getGenerationName = (option) => {
//     let yTo = !option['year-stop'] ? 'н.в.' : option['year-stop'];
//     let yFrom = option['year-start'];
//     let name = option['name'];
//     return `${yFrom} - ${yTo} ${name}`;
//   }

//   const getOptionText = (target) => {
//     try {
//       return target.options[target.selectedIndex].text;
//     } catch (error) {
//       console.log(error);
//       return '';
//     }
//   }

//   const getConfigurationName = (option) => {
//     let body = option['body-type'];
//     let doors = option['doors-count'];
//     let notice = option['notice'];

//     let doorsWord = body.includes('дв.') ? '' : doors + ' дв.';
//     return `${body} ${doorsWord} ${notice}`;
//   }

//   const getModificationName = (option) => {
//     try {
//       let specs = option.specifications;
//       let eVolume = specs['volume-litres'] ? specs['volume-litres'] + ' л.' : '';
//       let eType = specs['engine-type'] ? specs['engine-type'] + ',' : '';
//       let transmission = specs['transmission'] ? specs['transmission'] + ',' : '';
//       let horsePower = specs['horse-power'] ? specs['horse-power'] + ' л.с.,' : '';
//       let drive = specs['drive'];

//       return `${eVolume} ${horsePower} ${eType} ${transmission} ${drive}`;
//     } catch (error) {
//       console.log(error);
//       return '';
//     }
//   }

//   const safeSetData = (data, setMethod, defaultValue) => {
//     try {
//       if (data.error) {
//         console.log(data.error);
//         setMethod(defaultValue);
//       }
//       else {
//         setMethod(data);
//       }
//     } catch (error) {
//       console.log(data.error);
//       setMethod(defaultValue);
//     }
//   }

//   // fill marks
//   useEffect(() => {

//     setMarks([]);
//     setModels([]);
//     setGenerations([]);
//     setConfigurations([]);
//     setModifications([]);
//     setYears([]);

//     setSelectedMark('');
//     setSelectedModel('');
//     setSelectedGeneration('');
//     setSelectedConfiguration('');
//     setSelectedModification({});
//     setSelectedYear('');

//     fetch('https://cars-base.ru/api/cars')
//       .then(response => response.json())
//       .then(data => safeSetData(data, setMarks, []))
//       .catch(error => console.log(error));
//   }, []);

//   // fill models
//   useEffect(() => {
//     setModels([]);
//     if (selectedMark !== '') {

//       setSelectedModel('');
//       setSelectedGeneration('');
//       setSelectedConfiguration('');
//       setSelectedModification('');
//       setSelectedYear('');

//       fetch(`https://cars-base.ru/api/cars/${selectedMark}`)
//         .then(response => response.json())
//         .then(data => safeSetData(data, setModels, []))
//         .catch(error => console.log(error));
//     } else {
//       setGenerations([]);
//       setConfigurations([]);
//       setModifications([]);
//       setYears([]);
//     }
//   }, [selectedMark]);

//   // fill generations
//   useEffect(() => {
//     setGenerations([]);
//     if (selectedModel !== '' && selectedMark !== '') {

//       setSelectedGeneration('');
//       setSelectedConfiguration('');
//       setSelectedModification('');
//       setSelectedYear('');

//       fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}`)
//         .then(response => response.json())
//         .then(data => safeSetData(data, setGenerations, []))
//         .catch(error => console.log(error));
//     } else {
//       setConfigurations([]);
//       setModifications([]);
//     }
//   }, [selectedModel]);

//   // fill configurations
//   useEffect(() => {
//     setConfigurations([]);
//     if (selectedModel !== '' && selectedMark !== '' && selectedGeneration !== '') {

//       setSelectedConfiguration('');
//       setSelectedModification('');
//       setSelectedYear('');

//       fetch(`https://cars-base.ru/api/cars/${selectedMark}/${selectedModel}/${selectedGeneration}`)
//         .then(response => response.json())
//         .then(data => {
//           safeSetData(data, setConfigurations, []);
//           console.log(data);
//         })
//         .catch(error => console.log(error));
//     } else {
//       setModifications([]);
//     }
//   }, [selectedGeneration]);

//   // fill modifications
//   useEffect(() => {
//     setModifications([]);
//     if (selectedModel !== '' && selectedMark !== '' && selectedGeneration !== '' && selectedConfiguration !== '') {
//       setSelectedModification('');
//       setSelectedYear('');
//       try {
//         let modifications = configurations.find(c => c.id === selectedConfiguration).modifications;
//         safeSetData(modifications, setModifications, []);
//       } catch (error) {
//         console.log(error);
//         setModifications([]);
//       }
//     } else {
//       setYears([]);
//     }
//   }, [selectedConfiguration]);

//   // fill years
//   useEffect(() => {
//     setYears([]);
//     if (selectedModel !== '' && selectedMark !== '' && selectedGeneration !== '' && selectedConfiguration !== '') {
//       setSelectedYear('');
//       try {
//         let gen = generations.find(g => g.id === selectedGeneration);
//         let years = getYears(gen);
//         safeSetData(years, setYears, []);
//       } catch (error) {
//         console.log(error);
//         setYears([]);
//       }
//     } else {

//     }
//   }, [selectedModification]);

//   return (

//     <div className='App'>
//       <Formik
//         initialValues={{
//           year: '',
//           mark: '',
//           markText: '',
//           model: '',
//           modelText: '',
//           generation: '',
//           generationText: '',
//           configuration: '',
//           configurationText: '',
//           modification: '',
//           modificationText: '',
//           state: '',
//           mileage: '',
//           sellingMethod: '',
//           info: '',
//           country: '',
//           city: '',
//           phone: '',
//         }}
//         onSubmit={values => {
//           console.log('submit', values);
//         }}
//       >
//         {props => {
//           const {
//             values,
//             dirty,
//             isSubmitting,
//             handleChange,
//             handleSubmit,
//             handleReset,
//             setFieldValue
//           } = props;
//           return (
//             <form onSubmit={handleSubmit}>
//               <Field
//                 id='mark'
//                 name='mark'
//                 as='select'
//                 value={values.mark}
//                 onChange={async e => {
//                   const { value } = e.target;
//                   setSelectedMark(value);
//                   setFieldValue('mark', value);
//                   setFieldValue('markText', getOptionText(e.target));
//                   setFieldValue('models', models);
//                 }}
//               >
//                 <option value=''>Выберите марку</option>
//                 {marks.map(option => (
//                   <option key={option.id} value={option.id}>{option.name}</option>
//                 ))}
//               </Field>
//               <br />
//               <Field
//                 id='model'
//                 name='model'
//                 as='select'
//                 value={values.model}
//                 onChange={async e => {
//                   const { value } = e.target;
//                   setSelectedModel(value);
//                   setFieldValue('model', value);
//                   setFieldValue('modelText', getOptionText(e.target));
//                   setFieldValue('generations', generations);
//                 }}
//               >
//                 <option value=''>Выберите модель</option>
//                 {models.map(option => (
//                   <option key={option.id} value={option.id}>{option.name}</option>
//                 ))}
//               </Field>
//               <br />
//               <Field
//                 id='generation'
//                 name='generation'
//                 as='select'
//                 value={values.generation}
//                 onChange={async e => {
//                   const { value } = e.target;
//                   setSelectedGeneration(value);
//                   console.log(value);
//                   setFieldValue('generation', value);
//                   setFieldValue('generationText', getOptionText(e.target));
//                   setFieldValue('configurations', configurations);
//                 }}
//               >
//                 <option value=''>Выберите поколение</option>
//                 {generations.map(option => (
//                   <option key={`gen_${option.id}`} value={option.id}>{getGenerationName(option)}</option>
//                 ))}
//               </Field>
//               <br />
//               <Field
//                 id='configuration'
//                 name='configuration'
//                 as='select'
//                 value={values.configuration}
//                 onChange={async e => {
//                   const { value } = e.target;
//                   setSelectedConfiguration(value);
//                   console.log(value);
//                   setFieldValue('configuration', value);
//                   setFieldValue('configurationText', getOptionText(e.target));
//                   setFieldValue('modifications', modifications);
//                 }}
//               >
//                 <option value=''>Выберите конфигурацию</option>
//                 {configurations.map(option => (
//                   <option key={`conf_${option.id}`} value={option.id}>{getConfigurationName(option)}</option>
//                 ))}
//               </Field>
//               <br />
//               <Field
//                 id='modification'
//                 name='modification'
//                 as='select'
//                 value={values.modification}
//                 onChange={async e => {
//                   const { value } = e.target;
//                   setSelectedModification(value);
//                   console.log(value);
//                   setFieldValue('modification', value);
//                   setFieldValue('modificationText', getOptionText(e.target));
//                   setFieldValue('years', years)
//                 }}
//               >
//                 <option value=''>Выберите модификацию</option>
//                 {modifications.map(option => (
//                   <option key={option['complectation-id']} value={option['complectation-id']}>{getModificationName(option)}</option>
//                 ))}
//               </Field>
//               <br />
//               <Field
//                 id='year'
//                 name='year'
//                 as='select'
//                 value={values.year}
//                 onChange={async e => {
//                   const { value } = e.target;
//                   setSelectedYear(value);
//                   setFieldValue('year', value);
//                 }}
//               >
//                 <option value=''>Выберите год выпуска</option>
//                 {years.map(option => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </Field>
//               <button
//                 type="button"
//                 className="outline"
//                 onClick={handleReset}
//                 disabled={!dirty || isSubmitting}
//               >
//                 Reset
//               </button>
//               <button type="submit" disabled={isSubmitting}>
//                 Submit
//               </button>
//             </form>
//           );
//         }}

//       </Formik>
//     </div>)
// }
// export default App;


// /*
// <br />
// <label className={classnames(styles.label, { [styles.errorLabel]: errors.Year && touched.Year })}>
//   Год выпуска
// </label>
// <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Year && touched.Year })}
//   name='Year'
//   validate={validateYear}>
//   <option selected value='-1'>Выберите год выпуска</option>
//   <option value='2023'>2023</option>
//   <option value='2022'>2022</option>
//   <option value='2021'>2021</option>
// </Field>
// {errors.Year && touched.Year && <div className={styles.error}>{errors.Year}</div>}
// <br />
// */