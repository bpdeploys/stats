import { useState } from 'react';
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

const validationSchema = yup.object().shape({
  playingPosition: yup.string().required('Playing Position is required'),
  motive: yup.string().required('Motive is required'),
  postcode: yup.string().required('Postcode is required'),
});

export default function KeyDetails() {
  const router = useRouter();
  const { data, setFormValues } = useFormData();
  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit } = useForm({
    resolver,
  });

  const [date, setDate] = useState(null);

  // Format date to YYYY-MM-DD
  const formattedDate = date ? date.toISOString().split('T')[0] : '';

  const onSubmit = async (values) => {};

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
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
              <h1>Your Squad Number</h1>
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
            <FakeInput placeholder="Gender" />
          </div>
          <div className={styles.keyDetails__button}>
            <Button text="Done" color="blue" uppercase type="submit" />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
