export default {
  getEmployeeDetails: async(id) =>{
    return fetch(`https://reqres.in/api/users/${id}`).then(res => res.json());
  }
};
