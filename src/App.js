
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
  if (!value) {
    return 'Укажите год выпуска';
  }
  else if (!/^(19|20)\d{2}$/i.test(value)) {
    return "Неверно указан год выпуска";
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

function App() {
  return (

    <div className="App">
      <Formik
        initialValues={{
          Year: "",
          email: "",
          password: "",
        }}
        onSubmit={values => {
          console.log('submit', values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <p className='link'>Автомобиль</p>
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Year && touched.Year })}>
              Год выпуска
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Year && touched.Year })}
              name="Year"
              validate={validateYear}
            />
            {errors.Year && touched.Year && <div className={styles.error}>{errors.Year}</div>}
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Mark && touched.Mark })}>
              Марка
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Mark && touched.Mark })}
              name="Mark"
              validate={validateMark}
            />
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Model && touched.Model })}>
              Модель
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Model && touched.Model })}
              name="Model"
              validate={validateModel}
            />
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.State && touched.State })}>
              Состояние
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.State && touched.State })}
              name="State"
              validate={validateState}
            />
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Mileage && touched.Mileage })}>
              Пробег
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Mileage && touched.Mileage })}
              name="Mileage"
              validate={validateMileage}
            />
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.SellingMethod && touched.SellingMethod })}>
              Способ продажи
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.SellingMethod && touched.SellingMethod })}
              name="SellingMethod"
              validate={validateSellingMethod}
            />
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Info && touched.Info })}>
              Дополнительная информация
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Info && touched.Info })}
              name="Info"
              validate={validateInfo}
            />
            <br />
            Местонахождение
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Country && touched.Country })}>
              Страна
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Country && touched.Country })}
              name="Country"
              validate={validateCountry}
            />
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.City && touched.City })}>
              Город
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.City && touched.City })}
              name="City"
              validate={validateCity}
            />
            <br />
            Контакты
            <br />
            <label className={classnames(styles.label, { [styles.errorLabel]: errors.Phone && touched.Phone })}>
              Телефон
            </label>
            <Field className={classnames(styles.field, { [styles.errorInput]: errors.Phone && touched.Phone })}
              name="Phone"
              validate={validatePhone}
            />
            {errors.Year && touched.Year ||
              errors.Mark && touched.Mark ||
              errors.Model && touched.Model ||
              errors.State && touched.State ||
              errors.Mileage && touched.Mileage ||
              errors.SellingMethod && touched.SellingMethod ||
              errors.Info && touched.Info ||
              errors.Country && touched.Country ||
              errors.City && touched.City ||
              errors.Phone && touched.Phone(
                <div className={styles.error}>
                  {errors.Year}
                  {errors.Mark}
                  {errors.Model}
                  {errors.State}
                  {errors.Mileage}
                  {errors.SellingMethod}
                  {errors.Info}
                  {errors.Country}
                  {errors.City}
                  {errors.Phone}
                </div>
              )}
            <br />

            <button type='submit'>Submit</button>
          </Form>
        )}

      </Formik>
    </div>)
}
export default App;
