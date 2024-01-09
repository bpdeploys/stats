import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';
import HeaderButtons from '../../components/Layout/HeaderButtons';
import CustomDatePicker from '../../components/Common/CustomDatePicker';

// Data
import constants from '../../utils/data/constants';

// Styles
import styles from './keydetails.module.scss';

// Hooks
import { useFormData } from '../../services/context';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

// Services
import { keyDetails } from '../../services/api';

// Utils
import { saveUserToken } from '../../utils/functions';
import Header from '../../components/Layout/Header';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import FakeInput from '../../components/Common/FakeInput';
import FakeSelect from '../../components/Common/FakeSelect';
import { useUserData } from '../../context/UserContext';

const validationSchema = yup.object().shape({
  playingPosition: yup.string().required('Playing Position is required'),
  motive: yup.string().required('Motive is required'),
  postcode: yup.string().required('Postcode is required'),
});

export default function KeyDetails() {
  const router = useRouter();
  const { data, setFormValues } = useFormData();
  const { userData, updateUserData } = useUserData();
  const resolver = useYupValidationResolver(validationSchema);
  const { register, setValue, handleSubmit } = useForm({
    resolver,
  });

  useEffect(() => {
    if (userData) {
      setValue('name', userData.proxy_name);
      setValue('lastName', userData.proxy_surname);
      setValue('emailAddress', userData.email.toLowerCase());
    }
  }, [userData, setValue]);

  const onSubmit = async (values) => {};

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const shirtData = {
    squadNumber: userData?.squad_number[0]?.number || 10,
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Key details" textTransform="uppercase" />
        <form
          className={styles.keyDetails}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.keyDetails__inputs}>
            <div className={styles.keyDetails__shirt}>
              <RedeemPlayerShirt data={shirtData} />
              <h3>Details needed!</h3>
            </div>
            <Input name="name" placeholder="Name" {...register('name')} />
            <Input
              name="lastName"
              placeholder="Last name"
              {...register('lastName')}
            />
            <Input
              name="emailAddress"
              placeholder="Email address"
              {...register('emailAddress')}
            />
            <Dropdown
              name="gender"
              placeholder="Gender"
              {...register('gender')}
              items={constants.GENDERS}
            />
          </div>
          <div className={styles.keyDetails__button}>
            <Button text="Done" color="blue" uppercase type="submit" />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
