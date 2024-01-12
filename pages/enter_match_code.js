import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Header from '../components/Header';
import { MATCH_ACTIVE_KEY, Context } from '../provider';
import { fetchMatchCode } from '../services';

const EnterMatchCode = ({ query }) => {
  const refInput1 = React.createRef();
  const refInput2 = React.createRef();
  const refInput3 = React.createRef();
  const refInput4 = React.createRef();

  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [input3, setInput3] = React.useState('');
  const [input4, setInput4] = React.useState('');

  const [incorrect, setIncorrect] = React.useState(false);

  const {
    // eslint-disable-next-line no-unused-vars
    [MATCH_ACTIVE_KEY]: { code, team_1_name, team_2_name, id },
    // eslint-disable-next-line no-unused-vars
    storage,
  } = React.useContext(Context);

  React.useEffect(() => {
    if (!query.noCode && code) {
      const [new1, new2, new3, new4] = String(code).split('');
      setInput1(new1);
      setInput2(new2);
      setInput3(new3);
      setInput4(new4);
    }
  });

  const isCorrectCode = (successMessage) =>
    successMessage === 'Match code is correct!!';

  const handleSubmit = async () => {
    try {
      const codeToFetch = `${input1}${input2}${input3}${input4}`;
      const { success } = await fetchMatchCode(codeToFetch);
      if (isCorrectCode(success)) {
        // DESCOMENTAR ESTO CUANDO TODO SIRVA
        // ESTO OPTIMIZA LA UX PORQUE NO TENES QUE METER EL CODIGO OTRA VEZ SI YA LO METISTE
        // await storage.add("MATCH_WAS_ENTERED_CODE", { idMatch: id });
        return Router.push('/lineup');
      }
      return setIncorrect(true);
    } catch (error) {
      return setIncorrect(true);
    }
  };

  const isValid = input1 && input2 && input3 && input4;
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
            <input
              type="text"
              maxLength={1}
              value={input1}
              ref={refInput1}
              onChange={(event) => {
                const { value } = event.target;
                setInput1(event.target.value);
                if (value) {
                  refInput2.current.focus();
                }
              }}
            />
            <input
              type="text"
              maxLength={1}
              value={input2}
              ref={refInput2}
              onChange={(event) => {
                const { value } = event.target;
                if (value) {
                  setInput2(event.target.value);
                  refInput3.current.focus();
                } else {
                  setInput2('');
                  refInput1.current.focus();
                }
              }}
            />
            <input
              type="text"
              maxLength={1}
              value={input3}
              ref={refInput3}
              onChange={(event) => {
                const { value } = event.target;
                if (value) {
                  setInput3(event.target.value);
                  refInput4.current.focus();
                } else {
                  setInput3('');
                  refInput2.current.focus();
                }
              }}
            />
            <input
              type="text"
              maxLength={1}
              value={input4}
              ref={refInput4}
              onChange={(event) => {
                const { value } = event.target;
                if (value) {
                  setInput4(event.target.value);
                } else {
                  setInput4('');
                  refInput3.current.focus();
                }
              }}
            />
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
      <style jsx>{`
        @keyframes WinJS-opacity-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .EnterMatchCode {
          height: 100vh;
          background-image: url('/static/default_bg.png');
          background-position: center center;
          background-size: cover;

          .write-code {
            font-size: 18px;
            line-height: 22px;
            text-align: center;
            color: #616060;
            text-align: center;
            margin-top: 30px;
            display: block;
          }

          .match-info {
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;

            > div {
              text-align: center;
            }

            p {
              font-style: italic;
              font-weight: normal;
              font-size: 18px;
              line-height: 22px;
              text-align: center;
              color: #616060;
              margin-top: 20px;
            }
          }

          .content-wrapper {
            animation: WinJS-opacity-in 0.7s;
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100% - 300px);

            &.--full {
              height: 90%;
            }

            .code-inputs {
              display: flex;

              input {
                width: 70px;
                height: 60px;
                text-align: center;
                font-size: 48px;
                line-height: 48px;
                color: #434343;
                border: 1px solid #e5e5e5;

                &:focus {
                  border-bottom: 1px solid black;
                }
              }
            }

            a,
            button {
              border: none;
              text-align: center;
              background-color: #1362d9;
              color: white;
              font-size: 28px;
              font-weight: 200;
              display: block;
              width: 100%;
              margin: 30px auto 0;
              border-radius: 4px;
              text-decoration: none;
              font-weight: 500;
              font-style: italic;
              padding: 5px 0;
            }
          }
        }
      `}</style>
    </div>
  );
};

EnterMatchCode.getInitialProps = ({ query }) => {
  return { query };
};

EnterMatchCode.propTypes = {
  query: PropTypes.shape({
    code: PropTypes.string,
    noCode: PropTypes.bool.isRequired,
  }),
};

EnterMatchCode.defaultProps = {
  query: {
    code: '',
  },
};

export default EnterMatchCode;
