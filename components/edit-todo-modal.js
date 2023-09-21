import axios from 'axios';
import React, { useEffect, useState } from 'react';

function InputModal({ modalItemId, isOpen, onClose, onSave }) {
  const [inputValue, setInputValue] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    let valueToBeSent = {};
    if (isChecked) {
      valueToBeSent = { title: inputValue, status: 'completed' };
    } else {
      valueToBeSent = { title: inputValue, status: 'pending' };
    }
    const response = await axios.patch(
      process.env.BACKEND_URL + `/todo/${modalItemId}`,
      valueToBeSent
    );
    onSave();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  async function fetchData(url) {
    try {
      const response = await axios.get(url);

      setInputValue(response.data?.data.title);

      if (response.data?.data.status === 'pending') {
        setIsChecked(false);
      } else if (response.data?.data.status === 'completed') {
        setIsChecked(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  useEffect(() => {
    fetchData(process.env.BACKEND_URL + `/todo/${modalItemId}`);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='modal-overlay' onClick={onClose}></div>

      <div className='modal-container bg-white w-96 mx-auto rounded shadow-lg z-50'>
        <div className='modal-content p-4'>
          <h2 className='text-2xl font-semibold mb-4 text-black'>Edit:</h2>
          <input
            type='text'
            placeholder='Enter input'
            value={inputValue}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded p-2 mb-4 text-black'
          />

          <input
            type='checkbox'
            id='myCheckbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            class='form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out'
          />
          <label for='myCheckbox' class='ml-2 text-gray-700'>
            Mark if Done
          </label>

          <div className='flex justify-end gap-2'>
            <button
              onClick={handleSave}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Save
            </button>
            <button
              onClick={handleClose}
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
