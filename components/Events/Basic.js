import React from 'react';
import styled from 'styled-components';

/**
 * Renders a basic event component with a title, detail, and styling.
 *
 * @param {string} name - The name of the event
 * @param {string} [detail='Duration'] - The detail of the event
 * @param {string} value - The value associated with the event
 * @param {function} onClick - The function to call on click
 * @return {JSX.Element} React component representing the BasicEvent
 */
const BasicEvent = ({ name, detail = 'Duration', value, onClick }) => (
  <EventWrapper onClick={onClick}>
    <div className="title">
      <h4>{name}</h4>
    </div>
    <div className="detail">
      <small>{detail}</small>
      <span>{value}</span>
    </div>
  </EventWrapper>
);

const EventWrapper = styled.div`
  height: 60px;
  background-color: #262626;
  border: none;
  margin: none;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;

  h4,
  span {
    font-size: 25px;
    color: #fff;
    font-weight: 500;
  }

  small {
    font-size: 12px;
    color: #bfbebe;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100px;
  }
`;

export default BasicEvent;
