export async function createDepartment(props){
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/postDepartment`, {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json',
        },
        credentials:'include',
        body: JSON.stringify({
          departmentName:props.departmentName
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
}

export async function updateDepartment(props){
    console.log('Updating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/updateDepartment`, {
        method: 'PUT',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify({
          departmentId: props.departmentId,
          departmentName: props.departmentName
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
}

export async function deleteDepartment(departmentId){
    console.log('Deleting department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/deleteDepartment`, {
        method: 'DELETE',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify({
            departmentId: departmentId
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
}

export async function getDepartments(){
  console.log('Getting departments..')
  try{
    const res = await fetch(`http://localhost:8080/departmentResponder/getDepartments`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json',
      },
      credentials:'include'        
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function getDepartmentInformation(departmentId){
  try{
    const res = await fetch(`http://localhost:8080/departmentResponder/updateDepartmentForm/${departmentId}`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json',
      },
      credentials:'include'        
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

