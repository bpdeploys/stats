import React, { useState } from 'react';
import Header from '../components/Header';

import ScreenLoading from '../components/ScreenLoading';
import TeamList from '../components/Lineup/TeamList';
import BasicEvent from '../components/Events/Basic';
import GoalEvent from '../components/Events/Goal';
import SubstitutionEvent from '../components/Events/Substitution';
import FoulEvent from '../components/Events/Foul';
import styled from 'styled-components';

const EditEvents = () => {
  const [loading, setLoading] = useState(false);

  const EventsWrapper = styled.div`
    min-height: 100vh;
    background: #fff;

    .events {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }
  `;

  return (
    <EventsWrapper>
      <Header name="Edit Match Events" />
      {loading ? (
        <ScreenLoading height="90vh" />
      ) : (
        <div className="events">
          <BasicEvent name="Full Time" value="14:17" />
          <BasicEvent
            name="2nd Half Kick Off"
            detail="Kick Off Time"
            value="14:17"
          />
          <BasicEvent name="1st Half End" value="14:17" />
          <GoalEvent
            team={1}
            shirtNumber="10"
            goalTime="2nd"
            goalMinute="14:17"
          />
          <SubstitutionEvent />
          <GoalEvent
            team={2}
            shirtNumber="8"
            goalTime="2nd"
            goalMinute="09:07"
          />
          <FoulEvent team={1} booked="17" drewFoul="8" time="45:07" />
          <GoalEvent
            team={2}
            shirtNumber="8"
            goalTime="2nd"
            goalMinute="48:07"
          />
          <BasicEvent name="Kick Off" detail="Kick Off Time" value="19:46" />
        </div>
      )}
    </EventsWrapper>
  );
};

export default EditEvents;
