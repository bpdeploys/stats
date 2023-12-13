import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Header from '../../components/Layout/Header';
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';

// Data
import constants from '../../utils/data/constants';

// Icons & Images
import BpLogo from '../../public/assets/imgs/svgs/homeLogo.svg';

// Styles
import styles from './register.module.scss';
import { useFormData } from '../../services/context';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().required('Gender is required'),
});

export default function Register() {
  const router = useRouter();
  const { setFormValues } = useFormData();
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register } = useForm({
    resolver,
  });

  const onSubmit = async (data) => {
    // Set the form values in the context
    setFormValues(data);

    // Navigate to the next page
    router.push('/select_profile');
  };

  const onError = (errors) => {
    if (Object.values(errors).length >= 2) {
      toast.error('Please fill the required fields');
    } else {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Create your BallerProfile" logo />
        <form
          className={styles.register}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.register__inputs}>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              {...register('firstName')}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              {...register('lastName')}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              {...register('email')}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              {...register('password')}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            <Dropdown
              name="gender"
              placeholder="Gender"
              {...register('gender')}
              items={constants.GENDERS}
            />
          </div>
          <div className={styles.register__button}>
            <Button type="submit" text="SIGN ME UP!" color="blue" uppercase />
            <div>
              <span>Already have an account?</span>
              <Link href="/login">Login</Link>
            </div>
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
