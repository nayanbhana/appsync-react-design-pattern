import React, { useState } from 'react';
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/react-hooks';
import LogDesktopForm from '../../components/LogDesktopForm/LogDesktopForm';
import LogList from '../../components/LogList/LogList';
import SAVE_QUICK_LOG_ACTIVITY from '../../graphql/saveQuickLogActivity.mutation.gql';
import GET_LOGS from '../../graphql/queryLogs.query.gql';
import SUBSCRIBE_LOGS from '../../graphql/subscribeLogs.subscription.gql';

const Log = () => {
  const [logName, setLogName] = useState('');
  const [date, setDate] = useState(moment());
  const [hours, setHours] = useState(0.5);
  const [points, setPoints] = useState(1);
  const [notes, setNotes] = useState('');
  const minDate = moment('2020-01-01');
  const maxDate = moment();

  const { subscribeToMore, ...result } = useQuery(GET_LOGS, {
      variables: { type: 'log' }
  });

  //  useSubscription(SUBSCRIBE_LOGS, {
  //     onSubscriptionData: async ({ client }) => {
  //         const result = await client.query({
  //             query: GET_LOGS,
  //             fetchPolicy: 'network-only'
  //         });
  //         const { data, loading } = result;
  //         if (!loading && data.getMemberActivity.length > 0) {

  //         }
  //     }
  //   });

  const [saveQuickLogActivity, saveQuickLogResponse] = useMutation(
    SAVE_QUICK_LOG_ACTIVITY,
    {
      fetchPolicy: 'no-cache'
    }
  );

  const handleHoursLogged = e => {
    let { min, max, step, value } = e.target;
    value = parseFloat(value);
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }
    if (value % step !== 0) {
      value = (Math.round(value * 2) / 2).toFixed(1);
    }
    setHours(value);
    setPoints(value * 2);
  };

  const handleSubmitQuickLog = () => {
    saveQuickLogActivity({
      variables: {
        date: date.format('YYYY-MM-DD'),
        hours: hours,
        title: logName,
        notes: notes
      }
    });
  };

  return (
    <React.Fragment>
      <LogDesktopForm
        date={date}
        handleHoursLogged={handleHoursLogged}
        handleSubmitQuickLog={handleSubmitQuickLog}
        hours={hours}
        logName={logName}
        maxDate={maxDate}
        minDate={minDate}
        notes={notes}
        points={points}
        setDate={setDate}
        setHours={setHours}
        setLogName={setLogName}
        setNotes={setNotes}
        setPoints={setPoints}
      />
      <LogList 
        {...result}
        subscribeToNewLogs={() => 
          subscribeToMore({
            document: SUBSCRIBE_LOGS,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newLogItem = subscriptionData.data.saveQuickLogActivity;
  
              return Object.assign({}, prev, {
                getMemberActivity: {
                  items: [newLogItem, ...prev.getMemberActivity.items]
                }
              });
            }
          })
        }
      />
    </React.Fragment>
  );
};

export default Log;
