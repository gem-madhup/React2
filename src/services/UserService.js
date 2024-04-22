
export const fetchUserRecordsFromService = () => {
  return new Promise((resolve, reject) => {
    try {
      const userData = JSON.parse(localStorage.getItem('usersData')) || [];
      resolve({ data: userData });
    } catch (error) {
      reject(error);
    }
  });
};

// Function to save user record to local storage
export const saveUserRecordToService = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      const storedData = JSON.parse(localStorage.getItem('usersData')) || [];
      const newData = [...storedData, userData];
      localStorage.setItem('usersData', JSON.stringify(newData));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
