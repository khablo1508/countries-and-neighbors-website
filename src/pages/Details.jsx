import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import {
  selectCurrentCountry,
  selectDetails,
} from '../store/details/details-selectors';
import {
  clearDetails,
  loadCountryByName,
} from '../store/details/details-actions';

import { Button } from '../components/Button';
import { Info } from '../components/Info';

export const Details = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const navigate = useNavigate();

  const { currentCountry, error, status } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
