import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/userAuthContext';
import './Friends.styles.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';


const FriendGoals = () => {
  const { user } = useAuthContext()
  const [friendGoals, setFriendGoals] = useState([]);

  useEffect(() => {
    const fetchFriendGoals = async () => {
      try {
        const response = await fetch('api/goal/friend/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        const fetchedFriendGoals = [];

        // Iterate through the data.friends array
        for (let i = 0; i < data.friends.length; i++) {
          const friend = data.friends[i];

          // Check if the friend object has a goals property and it is an array
          if (friend.goals && Array.isArray(friend.goals)) {
            // Loop through the goals array of the friend object
            for (let j = 0; j < friend.goals.length; j++) {


              const goal = friend.goals[j];
              goal.friendUsername = friend.username;
              fetchedFriendGoals.push(goal);
            }
          }

        }

        console.log("Friend Goals:", fetchedFriendGoals);
        setFriendGoals(fetchedFriendGoals);



      } catch (error) {
        console.error('Error fetching friend goals:', error);
      }
    };

    fetchFriendGoals();
  }, [user]);

  return (
    <div className='friend-feed'>
      <h1 className='friend-main'>Friend Goals</h1>
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          {friendGoals.map((goals, index) => (
            <ListGroup.Item key={index}>
              <h3>{goals.friendUsername}</h3>
              <p className='friend-goal-detail'>{goals.title}</p>
              <p  className='friend-goal-detail'>Finish Date: {goals.finishOn}</p>
              <p  className='friend-goal-detail'>Current Progress:{goals.progress}%</p>
              <ProgressBar className="bar" now={goals.progress} label={`${goals.progress}%`} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
     
    </div>
  );
};

export default FriendGoals;
