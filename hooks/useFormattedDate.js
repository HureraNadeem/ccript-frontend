import { useState, useEffect } from 'react';

function useFormattedDate(initialTimestamp) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is zero-based
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format

      const formattedDay = day < 10 ? `0${day}` : day;
      
      const formattedMonth = month < 10 ? `0${month}` : month;

      const formattedDate = `${formattedDay}/${formattedMonth}/${year}, ${formattedHours}:${minutes}${ampm}`;

      return formattedDate;
    }

    if (initialTimestamp) {
      const formatted = formatDate(initialTimestamp);
      setFormattedDate(formatted);
    }
  }, [initialTimestamp]);

  return formattedDate;
}

export default useFormattedDate;
