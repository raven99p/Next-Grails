export async function createDepartment(props){
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/postDepartment.json`, {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
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
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/verify.json`, {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          username:props.username,
          password:props.password
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
  }


export async function deleteDepartment(props){
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/verify.json`, {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          username:props.username,
          password:props.password
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
  }
/*
        post "/departmentResponder/postDepartment(.$format)"(controller: 'departmentResponder', action:'postDepartment')
        put "/departmentResponder/updateDepartment(.$format)"(controller: 'departmentResponder', action: 'updateDepartment')
        delete "/departmentResponder/deleteDepartment(.$format)"(controller: 'departmentResponder', action: 'deleteDepartment')*/
