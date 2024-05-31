import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Header from '../components/Header';
import { MATCH_ACTIVE_KEY, Context } from '../provider';
import { fetchMatchCode } from '../services';

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
  } = React.useContext(Context);

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
      }
      setIncorrect(true);
    } catch (error) {
      setIncorrect(true);
    }
  };

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
        <div>
          <div className="code-inputs">
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
          </div>
          <div>
            {isValid && (
              <button type="button" onClick={handleSubmit}>
                {incorrect ? 'CODE INVALID' : 'GO TO LINE-UPS'}
              </button>
            )}

            {!isValid && <span className="write-code">Write the Code</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

EnterMatchCode.getInitialProps = ({ query }) => {
  return { query };
};

export default EnterMatchCode;
