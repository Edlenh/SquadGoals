import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/userAuthContext';
import './Friends.styles.css'
// import Squad from '../components/assets/images/friends.svg'
// import Cheer from '../components/assets/images/cheer.svg'

const FriendGoals = () => {
  const {user} = useAuthContext()
  const [friendGoals, setFriendGoals] = useState([]);

  useEffect(() => {
    const fetchFriendGoals = async () => {
      try {
        const response = await fetch('api/goal/friend/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${user.token}`
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
      <h1>Friend Goals</h1>
      <ul>
      {friendGoals.map((goals, index) => (
      <li key={index}>
      <h3>Friend: {goals.friendUsername}</h3>
      <p>Title: {goals.title}</p>
      <p>Progress: {goals.progress}</p>
      <p>Created At: {goals.createdAt}</p>
  </li>
))}
      </ul>
    
    </div>
  );
};

export default FriendGoals;