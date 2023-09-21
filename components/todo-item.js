import React, { useState } from 'react';

import CheckCircleIcon from '@/public/assets/icons/CheckCircleIcon';
import DotIcon from '@/public/assets/icons/DotIcon';
import EditIcon from '@/public/assets/icons/editIcon'

import axios from 'axios';
import useFormattedDate from '@/hooks/useFormattedDate';

function TodoItem({ id, title, status, createdAt, updatedAt, key, setReFetchTodos, toggleModal }) {

  const formattedCreatedAt= useFormattedDate(createdAt);
  const formattedUpdatedAt= useFormattedDate(updatedAt);

  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails((prev) => !prev);
  };

  const handleEdit = () => {
    console.log("edit");
    toggleModal(id)
  }

  const handleDeleteTodo = async () => {
    await axios
      .delete(process.env.BACKEND_URL + `/todo/${id}`)
      .then((response) => {
        console.log('Delete successful', response);
        setReFetchTodos(true)
        alert("Successfully deleted!")
      })
      .catch((error) => {
        console.error('Error deleting', error);
      });
  };
  
  return (
    <>
      <div
        key={key}
        className='todo-card w-[450px] '
        
      >
        <div
          className='flex items-center justify-between px-3 py-3 bg-[#d7ccb8] border-[2px] border-white'
          style={{ backdropFilter: 'blur(3px)' }} 
        >
          <div className='flex items-center gap-2 cursor-pointer' onClick={handleClick}>
            <CheckCircleIcon
              width={30}
              height={30}
              fill={'#d7ccb8'}
              className='bg-[#6f6759]'
              borderColor='#6f6759'
             
            />
            <p className='font-semibold text-black'>{title}</p>
            
          </div>
          <div className='flex items-center gap-2' onClick={handleEdit} >
            <EditIcon />
            <DotIcon width={30} height={30} />
          </div>
        </div>
        {showDetails && (
          <div className='extension px-3 py-3 bg-[#fff4f1] border-[2px] bt-[0] border-white'>
            <p className='text-black'>
              <span className='font-medium'>Status: </span>{' '}
              <span className='font-normal'>{status}</span>
            </p>
            <p className='text-black'>
              <span className='font-medium'>Created At: </span>{' '}
              <span className='font-normal'>{formattedCreatedAt}</span>
            </p>
            <p className='text-black'>
              <span className='font-medium'>Updated At: </span>{' '}
              <span className='font-normal'>{formattedUpdatedAt}</span>
            </p>

            <button
              onClick={handleDeleteTodo}
              class='bg-pink-200 text-red-500 w-full mt-5 mb-2 py-2 px-4 rounded-full hover:transform hover:scale-105 transition duration-300 ease-in-out hover:text-red-600'
            >
              Delete
            </button>
          </div>
        )}
      </div>
      
    </>
  );
}

export default TodoItem;
