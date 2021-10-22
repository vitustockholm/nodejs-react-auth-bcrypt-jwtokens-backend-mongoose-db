const HOST = 'http://localhost:5000';

// change 4{HOST} to deployment url to interaction

const useEndpont = (type) => {
  switch (type) {
    case 'signup':
      return `${HOST}/api/users`;
    case 'login':
      return `${HOST}/api/users/login`;
    case 'profile':
      return `${HOST}/api/users/profile`;
    default:
      return HOST;
  }
};

export default useEndpont;
