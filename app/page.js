"use client"
import Image from 'next/image'
import ProfilePic from "../public/assets/images/profile.jpg"

import axios from 'axios';

import PlusIcon from '@/public/assets/icons/PlusIcon'
import ChevronIcon from '@/public/assets/icons/ChevronIcon'
import CheckCircleIcon from '@/public/assets/icons/CheckCircleIcon'
import ListIcon from '@/public/assets/icons/ListIcon'
import DotIcon from '@/public/assets/icons/DotIcon'
import HamburgerIcon from '@/public/assets/icons/hamburgerIcon'


import TodoItem from '@/components/todo-item'
import { React, useEffect, useState } from 'react'
import InputModal from '@/components/edit-todo-modal';
import useFormattedDate from '@/hooks/useFormattedDate';


export default function Home() {

  const [todoData, setTodoData] = useState(null);
  const [refetchTodos, setReFetchTodos] = useState(false);
  const [userInput, setUserInput] = useState("");


  // Modal logic
  const [modalItemId, setModalItemId] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setReFetchTodos(true)

  }
  const toggleModal = (id) => {
    console.log(id);
    setIsModalOpen(true);
    setModalItemId(id)
  }
  // -------------

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    axios
      .post(process.env.BACKEND_URL + "/todo", { title: userInput })
      .then((response) => {
        console.log('POST request successful', response);
        setUserInput("");

      })
      .catch((error) => {
        console.error('Error making POST request', error);
        alert("Error adding todo, try again!")
      });
    setReFetchTodos(true);
  }

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      setTodoData(response.data?.data)
    } catch (error) {
      console.error('An error occurred:', error);
    }
    setReFetchTodos(false);
  }

  useEffect(() => {
    fetchData(process.env.BACKEND_URL + "/todo")
  }, [refetchTodos])

  console.log(todoData);


  function MessageBanner({ message }) {
    return (
      <div className='w-[450px]'>
        <div className='flex items-center justify-between px-3 py-3 bg-[#d7ccb8] border-[2px] border-white text-black' style={{ backdropFilter: 'blur(3px)' }}>
          {message}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='first-one flex flex-col gap-4 items-center justify-center h-screen'>
        <div className='w-[120px] h-[120px] overflow-hidden'>

          <Image className='object-cover w-full h-full rounded-full border-[3px] border-white' src={ProfilePic} alt='profile' />
        </div>


        <div className="w-[450px] relative focus-within:text-gray-400">
          <input
            type="search"
            name="q"
            className="w-[450px] py-4 text-sm text-white rounded-md pl-[15px] pr-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Add new task"
            autocomplete="off"
            onChange={handleInputChange}
            value={userInput}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button onClick={handleAddNewTodo} className="rounded-md w-[30px] p-1 focus:outline-none focus:shadow-outline bg-[#d2c49a]">
              <PlusIcon />
            </button>
          </span>
        </div>

        <div className='w-[450px] flex items-center justify-between px-3 py-3 bg-transparent border-[2px] border-white' style={{ backdropFilter: "blur(3px)" }}>
          <div className='flex items-center gap-2 '>
            <ListIcon width={30} height={30} />
            <p className='font-semibold'>Your todos</p>
          </div>
          <div>
            <ChevronIcon width={30} height={30} />
          </div>
        </div>


        <div className="todos-container flex flex-col">
          {todoData === null && <MessageBanner message="Loading..." />}
          {todoData?.length === 0 && <MessageBanner message="No Todos for Today." />}
          {
            todoData?.map((item, index) => (
              <TodoItem key={index} id={item._id} title={item.title} status={item.status} createdAt={item.createdAt} updatedAt={item.updatedAt} setReFetchTodos={setReFetchTodos} toggleModal={toggleModal} />
            ))
          }
        </div>
      </div>
      {
        isModalOpen && (<InputModal modalItemId={modalItemId} isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} />)
      }
    </>
  )
}
