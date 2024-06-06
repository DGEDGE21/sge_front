import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
});
const getAuthTokenFromCookie = () => {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split(';');

  // Loop through each cookie to find the one with the name 'token'
  for (let cookie of cookies) {
    // Remove any leading or trailing whitespace
    cookie = cookie.trim();

    // Check if the cookie starts with 'token='
    if (cookie.startsWith('token=')) {
      // Extract the token value and return it
      return cookie.substring(6); // 'token='.length = 6
    }
  }

  // Return null if the 'token' cookie is not found
  return null;
};
// Add headers to be sent with every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config.headers as needed, e.g., for authentication
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define your API functions...

export const login = (credentials) => {
  return axiosInstance.post('utente/login/', credentials, {
    headers: { 'Content-Type': 'application/json' }, // Add the Content-Type header
  });
};


// Export the functions...
export const registerUserAndCar = (userData, usuarioData, veiculoData) => {
  return axiosInstance.post('utente/register_user_and_car/', {
    user: userData,
    usuario: usuarioData,
    veiculo: veiculoData
  });
};

export const fetchUserVehicles = async (matricula) => {
  try {
    const authToken = getAuthTokenFromCookie();
    console.log(authToken)

    const config = {
      headers: {
        'Authorization': `token ${authToken}`,
        'Content-Type':'application/json'
      },
      params: {
        matricula: matricula, // Pass the plate number as a query parameter
      },
    };

    // Make a GET request to retrieve user's vehicles with the provided plate number
    const response = await axiosInstance.get('utente/veiculo/', config);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors here, such as network errors or server errors
    console.error('Error fetching user vehicles:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};