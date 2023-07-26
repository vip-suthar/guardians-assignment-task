import React, { useState } from 'react';

import Card from '../Commons/Card';
import BasicInfo from './basicInfo';
import MedicalInfo from './medicalInfo';
import EmergencyContact from './emergencyContact';
import Validate from '../../utils/validations';
import { register } from '../../store/actions/userDataAction';
import { useDispatch } from 'react-redux';

const initialData = {
  basicInfo: {
    email: '',
    password: '',
    name: '',
    phoneNumber: ''
  },
  medicalInfo: {
    allergies: '',
    currMedications: '',
    medicalCondtns: ''
  },
  emergencyContact: {
    name: '',
    phoneNumber: '',
    address: ''
  }
}

export default function Signup() {

  const [formData, setFormData] = useState(initialData);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const validateFormData = () => {
    // console.log(formData);
    let data = {};
    if (step === 1) data = formData.basicInfo;
    else if (step === 3) data = formData.emergencyContact;

    let isValid = true;
    for (let key in data) {
      let { valid, msg } = Validate(key, data[key]);
      if (!valid) {
        alert(msg);
        isValid = false;
        break;
      }
    }

    return isValid;
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      dispatch(await register(formData));
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  }

  const onBackClick = (e) => {
    setStep(state => state - 1);
  }

  const onNextClick = (e) => {
    if (validateFormData()) {
      if (step < 3) setStep(state => state + 1);
      else {
        handleSubmit();
      }
    }
  }

  const handleInputChange = (fieldName, key, val) => {
    setFormData(state => ({
      ...state,
      [fieldName]: {
        ...state[fieldName],
        [key]: val
      }
    }))
  }

  function getInputComponent() {
    let component = null;
    switch (step) {
      case 1:
        component = <BasicInfo handleChange={handleInputChange.bind(null, "basicInfo")} />
        break;
      case 2:
        component = <MedicalInfo handleChange={handleInputChange.bind(null, "medicalInfo")} />
        break;
      case 3:
        component = <EmergencyContact handleChange={handleInputChange.bind(null, "emergencyContact")} />
        break;
    }
    return component;
  }

  return (
    <div className="flex items-center justify-center" >
      <Card title="Welcome!">
        <p className="block font-sans text-xl text-center font-normal leading-relaxed text-inherit antialiased mb-3 -mt-6">
          {step === 1 ? "Basic Information" :
            step === 2 ? "Medical Information" :
              "Emergency Contact"
          } (step {step} of 3)
        </p>
        <div>
          {getInputComponent()}
          <div className='w-full flex justify-between mt-3 px-4'>
            <button
              className="rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              disabled={step === 1}
              onClick={onBackClick}
            >
              Back
            </button>
            <button
              className="rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={onNextClick}
              disabled={step === 3 && isLoading}
            >
              {step < 3 ? "Next" :
                isLoading ?
                  <p className='w-full h-max inline-flex justify-center text-center align-middle font-sans text-xs font-bold uppercase -mt-1'>
                    <svg className="animate-spin h-4 w-4 mr-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up
                  </p> : "Sign Up"
              }
            </button>
          </div>
          <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Already have an account?
            <a
              href="/login"
              className="ml-1 block font-sans text-sm font-bold leading-normal text-indigo-500 antialiased"
            >
              Sign in
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}