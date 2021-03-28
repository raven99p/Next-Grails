export async function createEmployee(props){
  console.log('Creating department..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/postEmployee.json`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
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
  console.log('Creating department..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/updateEmployee.json`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
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
  console.log('Creating department..')
  try{
    const res = await fetch(`http://localhost:8080/employeeResponder/deleteEmployee.json`, {
      method: 'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
          employeeId: employeeId
      })
    });
    return res;
  }catch(e){
    console.log(e)
  }
}


/*
        get "/employeeResponder/getEmployees/(.$format)"(controller: 'employeeResponder', action: 'getEmployees')
        post "/employeeResponder/postEmployee(.$format)"(controller: 'employeeResponder', action: 'postEmployees')
        put "/employeeResponder/updateEmployee(.$format)"(controller: 'employeeResponder', action: 'updateEmployee')
        delete "/employeeResponder/deleteEmployee(.$format)"(controller: 'employeeResponder', action: 'deleteEmployee')
        get "/employeeResponder/updateEmployeeForm(.$format)"(controller: 'employeeResponder', action: 'updateEmployeeForm')
*/