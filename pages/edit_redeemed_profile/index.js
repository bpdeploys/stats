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
import FakeSelect from '../../components/Common/FakeSelect';

const validationSchema = yup.object().shape({
  playingPosition: yup.string().required('Playing Position is required'),
  motive: yup.string().required('Motive is required'),
  postcode: yup.string().required('Postcode is required'),
});

export default function EditRedeemedProfile() {
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

  const sampleData = {
    playingPosition: 'F',
    squadNumber: '10',
  };

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
              <RedeemPlayerShirt data={sampleData} />
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
            <FakeInput placeholder="Squad number" />
          </div>
          <div className={styles.editRedeemedProfile__button}>
            <Button
              text="Go to Player Profile"
              color="blue"
              uppercase
              type="submit"
            />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
}
