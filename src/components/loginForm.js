// Formik x React Native example
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_LOGIN, API_GET_TOKEN } from 'react-native-dotenv';
import Auth from '../utils/auth';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
});

const LoginForm = (props) => {
  const handleLogin = async ({ username, password }) => {
    try {
      Auth.login(username, password);
    } catch (error) {
      console.log(error.request._response);
    }
  }
  return (
    <Formik
      initialValues={{ username: 'lorem', password: '3113b0de452383fe36bed86321ad0c60' }}
      onSubmit={values => handleLogin(values)}
      validationSchema={LoginSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, width: '60%' }}>
            <TextInput
              style={{ borderColor: 'blue', borderRadius: 8, borderWidth: 1, flex: 1 }}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
          </View>
          {errors.username && touched.username ? (
            <Text>{errors.username}</Text>
          ) : null}
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', width: '60%' }}>
            <TextInput
              secureTextEntry={true}
              style={{ borderColor: 'blue', borderRadius: 8, borderWidth: 1, flex: 1 }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          </View>
          {errors.password && touched.password ? (
            <Text>{errors.password}</Text>
          ) : null}
          <Button onPress={handleSubmit} title="Logins" style={{ flex: 1, marginTop: 10 }} />
        </View>
      )}
    </Formik>
  );
}

export default LoginForm;