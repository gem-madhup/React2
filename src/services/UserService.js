// UserService.js

const dummyUserData = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      email: 'john@example.com',
      mobile: '9876543210',
      category: 'General',
      technologies: ['JavaScript', 'React'],
      profilePicture: 'abc.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'Female',
      email: 'jane@example.com',
      mobile: '9876543211',
      category: 'SC/ST',
      technologies: ['Python', 'Django'],
      profilePicture: 'def.jpg',

    },
  ];
  
  // Function to fetch user records
  export const fetchUserRecordsFromService = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: dummyUserData }); 
      }, 1000); 
    });
  };
  
  export const saveUserRecordToService = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dummyUserData.push(userData);
        resolve(); 
      }, 1000); 
    });
  };
  