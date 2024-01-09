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
import styles from './editredeemedprofile.module.scss';

// Hooks
import { useFormData } from '../../services/context';
import useYupValidationResolver from '../../utils/hooks/useYupValidationResolver';

// Services
import { editRedeemedProfile } from '../../services/api';

// Utils
import { saveUserToken } from '../../utils/functions';
import Header from '../../components/Layout/Header';
import RedeemPlayerShirt from '../../components/RedeemPlayer/RedeemPlayerShirt';
import FakeInput from '../../components/Common/FakeInput';
import { useUserData } from '../../context/UserContext';

const validationSchema = yup.object().shape({
  playingPosition: yup
    .string()
    .required('Playing Position is required')
    .oneOf(
      constants.POSITIONS.map((position) => position.value),
      'Invalid playing position'
    ),
  motive: yup
    .string()
    .required('Motive is required')
    .oneOf(
      constants.MOTIVES.map((motive) => motive.value),
      'Invalid motive'
    ),
  postcode: yup
    .string()
    .required('Postcode is required')
    .matches(/^[A-Za-z0-9 ]+$/, 'Invalid postcode format'), // Adjust regex as per your postcode format
});

export default function EditRedeemedProfile() {
  const router = useRouter();
  const { data, setFormValues } = useFormData();
  const { userData } = useUserData();
  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit } = useForm({
    resolver,
  });

  const [date, setDate] = useState(null);

  // Format date to YYYY-MM-DD
  const formattedDate = date ? date.toISOString().split('T')[0] : '';

  const onSubmit = async (values) => {
    toast.success('Profile updated successfully');
  };

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const shirtData = {
    squadNumber: userData?.squad_number[0]?.number || 10,
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Baller App</title>
        <meta name="description" content="Baller App" key="desc" />
      </Head>
      <ScreenWrapper background="white" image="grayLightningFull">
        <Header text="Edit your profile" textTransform="uppercase" />
        <form
          className={styles.editRedeemedProfile}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.editRedeemedProfile__inputs}>
            <div className={styles.editRedeemedProfile__shirt}>
              <RedeemPlayerShirt data={shirtData} />
            </div>
            <Dropdown
              name="playingPosition"
              placeholder="Playing Position - Forward"
              items={constants.POSITIONS}
              {...register('playingPosition')}
            />
            <Dropdown
              name="motive"
              placeholder="Select a motive!"
              items={constants.MOTIVES}
              {...register('motive')}
            />
            <Input
              name="postcode"
              placeholder="First Half of Postcode"
              tooltipText="First Half of Postcode"
              {...register('postcode')}
            />
            <CustomDatePicker
              name="DOB"
              placeholder="DOB"
              tooltipText="DOB information"
              value={date}
              onChange={(date) => setDate(date)}
            />
            <FakeInput
              placeholder="Squad number"
              staticValue={shirtData?.squadNumber || null}
            />
          </div>
          <div className={styles.editRedeemedProfile__button}>
            <Button text="Go to Player Profile" color="blue" type="submit" />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
