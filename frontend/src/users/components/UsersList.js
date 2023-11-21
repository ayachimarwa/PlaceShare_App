import React from 'react';


import UsersItem from './UsersItem';
import Card from '../../shared/UIElements/Card';
import './UsersList.css';

const UsersList = props => {
    if(props.items.length === 0){
        return (
            <Card>
                <div className='center'>
                    <h2>No users found.</h2>
                </div>
            </Card>
        );
    }

    return (
        <ul className='user-list'>
            {props.items.map(user => 
             <UsersItem 
             key={user.id} 
             id={user.id} 
             image={user.image}  
             name={user.name} 
            placeCount={user.places}
             />
            ) }
        </ul>
    );
};

export default UsersList;