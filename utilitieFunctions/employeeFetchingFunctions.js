export async function createEmployee(props){
  console.log('Creating employee..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/postEmployee.json`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify({
        firstName: props.firstName,
        lastName: props.lastName,
        afm: props.afm,
        dob: props.dob,
        departmentId: props.departmentId
      })
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function updateEmployee(props){
  console.log('Updating employee..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/updateEmployee.json`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify({
        employeeId: props.employeeId,
        firstName: props.firstName,
        lastName: props.lastName,
        afm: props.afm,
        dob: props.dob,
        departmentId: props.departmentId
      })
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function deleteEmployee(employeeId){
  console.log('Deleting employee..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/deleteEmployee.json`, {
      method: 'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify({
          employeeId: employeeId
      })
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function getEmployees(departmentId){
  console.log('Getting employees..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/getEmployees/${departmentId}.json`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include'
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function getEmployeeInformation(employeeId){
  console.log('Getting employee information..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/updateEmployeeForm/${employeeId}.json`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include'
    });
    return res;
  }catch(e){
    console.log(e)
  }
}


