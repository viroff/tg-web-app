
import React from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import styles from './App.css';
const tg = window.Telegram.WebApp;
function validateEmail(value) {
  if (!value) {
    return 'Email Required';
  }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'invalid email address';
  }
}
function validatePassword(value) {
  if (!value) { return 'Password Required'; }
}
function validateYear(value) {
  if (!value || value === '-1') {
    return 'Укажите год выпуска';
  }
  else if (!/^(19|20)\d{2}$/i.test(value)) {
    return 'Неверно указан год выпуска';
  }
}
function validateMark(value) { console.log(value); }
function validateModel(value) { console.log(value); }
function validateState(value) { }
function validateMileage(value) { }
function validateSellingMethod(value) { }
function validateInfo(value) { }
function validateCountry(value) { }
function validateCity(value) { }
function validatePhone(value) { }
function validateGeneration(value) { }
function validateModification(value) { }
function validateConfiguration(value) { }

function App() {
  return (

    <div className='App'>
      <Formik
        initialValues={{
          Year: '',
          email: '',
          password: '',
        }}
        onSubmit={values => {
          console.log('submit', values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <p>--------Автомобиль---------</p>
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Year && touched.Year })}
              name='Year'
              validate={validateYear}>
              <option selected value='-1'>Год выпуска</option>
              <option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
            </Field>
            {errors.Year && touched.Year && <div className={styles.error}>{errors.Year}</div>}
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Mark && touched.Mark })}
              name='Mark'
              validate={validateMark}>
              <option selected value='-1'>Марка</option>
              <option value='1'>Audi</option>
              <option value='2'>BMW</option>
              <option value='3'>Mercedes-Benz</option>
            </Field>
            {errors.Mark && touched.Mark && <div className={styles.error}>{errors.Mark}</div>}
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Model && touched.Model })}
              name='Model'
              validate={validateModel}>
              <option selected value='-1'>Модель</option>
              <option value='1'>Ывыводллододл одл100</option>
              <option value='2'>BMW</option>
              <option value='3'>Mercedes-Benz</option>
            </Field>
            {errors.Model && touched.Model && <div className={styles.error}>{errors.Model}</div>}
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Generation && touched.Generation })}
              name='Model'
              validate={validateGeneration}>
              <option selected value='-1'>Поколение</option>
              <option value='1'>Generation 1</option>
              <option value='2'>Generation 2</option>
              <option value='3'>Generation 3</option>
            </Field>
            {errors.Generation && touched.Generation && <div className={styles.error}>{errors.Generation}</div>}
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Configuration && touched.Configuration })}
              name='Model'
              validate={validateConfiguration}>
              <option selected value='-1'>Конфигурация</option>
              <option value='1'>Configuration 1</option>
              <option value='2'>Configuration 2</option>
              <option value='3'>Configuration 3</option>
            </Field>
            {errors.Configuration && touched.Configuration && <div className={styles.error}>{errors.Configuration}</div>}
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Modification && touched.Modification })}
              name='Modification'
              validate={validateModification}>
              <option selected value='-1'>Модификация</option>
              <option value='1'>Modification 1</option>
              <option value='2'>Modification 2</option>
              <option value='3'>Modification 3</option>
            </Field>
            {errors.Modification && touched.Modification && <div className={styles.error}>{errors.Modification}</div>}
            <p>--------Подробности----------</p>
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.State && touched.State })}
              name='State'
              validate={validateState}>
              <option selected value='-1'>Состояние</option>
              <option value='1'>State 1</option>
              <option value='2'>State 2</option>
              <option value='3'>State 3</option>
            </Field>
            {errors.State && touched.State && <div className={styles.error}>{errors.State}</div>}
            <br />
            <Field placeholder='Пробег' className={classnames(styles.field, { [styles.errorInput]: errors.Mileage && touched.Mileage })}
              name='Mileage'
              validate={validateMileage}
            />
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.SellingMethod && touched.SellingMethod })}
              name='SellingMethod'
              validate={validateSellingMethod}>
              <option selected value='-1'>Cпособ продажи</option>
              <option value='1'>SellingMethod 1</option>
              <option value='2'>SellingMethod 2</option>
              <option value='3'>SellingMethod 3</option>
            </Field>
            {errors.SellingMethod && touched.SellingMethod && <div className={styles.error}>{errors.SellingMethod}</div>}
            <br />
            <Field type='textarea' placeholder='Описание' className={classnames(styles.field, { [styles.errorInput]: errors.Info && touched.Info })}
              name='Info'
              validate={validateInfo}
            />
            <p>--------Местонахождение---------</p>
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.Country && touched.Country })}
              name='Country'
              validate={validateCountry}>
              <option selected value='-1'>Страна</option>
              <option value='1'>Country 1</option>
              <option value='2'>Country 2</option>
              <option value='3'>Country 3</option>
            </Field>
            {errors.Country && touched.Country && <div className={styles.error}>{errors.Country}</div>}
            <br />
            <Field as='select' className={classnames(styles.field, { [styles.errorInput]: errors.City && touched.City })}
              name='City'
              validate={validateCity}>
              <option selected value='-1'>Город</option>
              <option value='1'>City 1</option>
              <option value='2'>City 2</option>
              <option value='3'>City 3</option>
            </Field>
            {errors.City && touched.City && <div className={styles.error}>{errors.City}</div>}
            <p>--------Контакты---------</p>
            <Field type='text' placeholder='Телефон' className={classnames(styles.field, { [styles.errorInput]: errors.Phone && touched.Phone })}
              name='Phone'
              validate={validatePhone}
            />
            <br />
            <button type='submit'>Submit</button>
          </Form>
        )}

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