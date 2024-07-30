import React, { useContext, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Header from '../components/Header';
import { MATCH_ACTIVE_KEY, Context } from '../provider';
import { fetchMatchCode } from '../services';
import styled from 'styled-components';

/**
 * EnterMatchCode component
 *
 * @param {object} query - The query object from Next.js router
 * @param {string} query.code - The match code from the query
 * @param {boolean} query.noCode - Indicates if there is no match code
 */
const EnterMatchCode = ({ query }) => {
  const numInputs = 4;
  const inputRefs = useRef(
    Array(numInputs)
      .fill()
      .map(() => React.createRef())
  );
  const [inputs, setInputs] = useState(Array(numInputs).fill(''));
  const [incorrect, setIncorrect] = useState(false);

  const {
    [MATCH_ACTIVE_KEY]: { code, team_1_name, team_2_name },
    showToast,
  } = useContext(Context);

  useEffect(() => {
    if (!query.noCode && code) {
      setInputs(
        String(code)
          .split('')
          .concat(Array(numInputs - String(code).length).fill(''))
      );
    }
  }, [code, query.noCode]);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value && index < numInputs - 1) {
      inputRefs.current[index + 1].current.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const isCorrectCode = (successMessage) =>
    successMessage === 'Match code is correct!!';

  const handleSubmit = async () => {
    try {
      const codeToFetch = inputs.join('');
      const { success } = await fetchMatchCode(codeToFetch);
      if (isCorrectCode(success)) {
        // Perform desired actions here
        return Router.push('/lineup');
      } else {
        setIncorrect(true);
        showToast('Please enter a valid match code');
      }
    } catch (error) {
      setIncorrect(true);
    }
  };

  console.log(incorrect);

  const isValid = inputs.every((input) => input);
  const aMatchIsActive = team_1_name && team_2_name && !query.noCode;

  return (
    <div className="EnterMatchCode">
      <Header name="Enter match code" />
      {aMatchIsActive && (
        <div className="match-info">
          <div>
            <p>{team_1_name}</p>
            <p>VS</p>
            <p>{team_2_name}</p>
          </div>
        </div>
      )}

      <div className={`content-wrapper ${!aMatchIsActive ? '--full' : ''}`}>
        <ContentWrapper>
          <InputsWrapper>
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                ref={inputRefs.current[index]}
                onChange={(event) => handleChange(index, event.target.value)}
              />
            ))}
          </InputsWrapper>
          <div>
            <SubmitButton
              handleSubmit={handleSubmit}
              isValid={isValid}
              incorrect={incorrect}
            />
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: calc(100vh - 45px);
`;

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 15px;

  input {
    height: 60px;
    width: 55px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const StyledSubmitButton = styled.button`
  text-align: center;
  background-color: black;
  color: white;
  font-size: 20px;
  font-weight: 200;
  display: block;
  width: 300px;
  height: 40px;
  margin: 30px auto;
  border-radius: 4px;
  text-decoration: none;
  padding: 6px 0 1px;
  transition: all 0.3s ease-out;

  &:disabled {
    background-color: lightgray;
    color: black;
  }
`;

const SubmitButton = ({ handleSubmit, isValid, incorrect }) => (
  <StyledSubmitButton
    className="button"
    onClick={handleSubmit}
    type="button"
    disabled={!isValid}
  >
    {!isValid ? 'Enter code' : 'Go to Lineups'}
  </StyledSubmitButton>
);

EnterMatchCode.getInitialProps = ({ query }) => {
  return { query };
};

export default EnterMatchCode;
