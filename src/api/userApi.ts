import {apiURL} from 'api';

interface User {
  id: string;
  name: string;
}

const getUsers = () => apiURL.get('/api/users');
const getUser = (id: number) => apiURL.get('/api/users/' + id);
const updateUser = (id: number, user: User) =>
  apiURL.post('/api/users/' + id, user);
const deleteUser = (id: number) => apiURL.delete('/api/users/' + id);

export default {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
