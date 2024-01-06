import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Context
import { useContext } from 'react';
import { SquadContext } from '../../context/SquadContext';

// Components
import ScreenWrapper from '../../components/Layout/ScreenWrapper';
import Input from '../../components/Common/Input';
import Dropdown from '../../components/Common/Dropdown';
import Button from '../../components/Common/Button';

// Icons & Images
import BlueShirtIcon from '../../public/assets/imgs/svgs/blue-shirt.svg';

// Data
import constants from '../../utils/data/constants';

// Styles
import styles from './createteammate.module.scss';
import { useFormData } from '../../services/context';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';
import Image from 'next/image';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string(),
  playingPosition: Yup.string().required('Playing Position is required'),
  squadNumber: Yup.string().required('Squad Number is required'),
});

export default function CreateTeammate() {
  const router = useRouter();
  const { setFormValues } = useFormData();
  const { addTeammate } = useContext(SquadContext);
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, setValue } = useForm({
    resolver,
  });

  const onSubmit = async (data) => {
    setFormValues(data);
    addTeammate(data);
    router.push('/create_squad');
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

  const pickContacts = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const properties = ['name', 'tel'];
        const contacts = await navigator.contacts.select(properties, {
          multiple: false,
        });
        if (contacts && contacts[0]) {
          const contact = contacts[0];
          setValue('firstName', contact.name[0].split(' ')[0]);
          setValue('lastName', contact.name[0].split(' ')[1]);
          setValue('phoneNumber', contact.tel[0]);
        }
      } catch (error) {
        toast.error('Failed to pick contact');
      }
    } else {
      toast.error('We cant use contacts on this device');
    }
  };

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white">
        <div className={styles.heading}>
          <h1>CREATE YOUR TEAMMATE</h1>
          <Image
            src={BlueShirtIcon}
            alt="Player Shirt"
            width={60}
            height={68}
          />
        </div>
        <form
          className={styles.createTeammate}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.createTeammate__inputs}>
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
            <Dropdown
              name="playingPosition"
              placeholder="Playing Position"
              items={constants.POSITIONS}
              {...register('playingPosition')}
            />
            <Dropdown
              name="squadNumber"
              placeholder="Squad Number"
              items={constants.SQUAD_NUMBERS}
              {...register('squadNumber')}
            />
            <div className={styles.createTeammate__phoneWrapper}>
              <Input
                type="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register('phoneNumber')}
              />
              {'contacts' in navigator && 'ContactsManager' in window && (
                <Button
                  type="button"
                  onClick={pickContacts}
                  text="Go to Contacts"
                  color="green"
                  uppercase
                  customClassName={styles.createTeammate__buttonCustom}
                />
              )}
            </div>
          </div>
          <div className={styles.createTeammate__button}>
            <Button
              type="submit"
              text="Create Teammate"
              color="blue"
              uppercase
            />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
