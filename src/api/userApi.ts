import {apiURL} from 'api';
import {UpdateUser} from 'types';

const getUsers = () => apiURL.get('/api/users');
const getUser = (id: number) => apiURL.get('/api/users/' + id);
const updateUser = (id: number, user: UpdateUser) =>
  apiURL.put('/api/users/' + id, user);
const deleteUser = (id: number) => apiURL.delete('/api/users/' + id);

export default {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
