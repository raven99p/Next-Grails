import {getDepartments} from '../utilitieFunctions/departmentFetchingFunctions';
import {useEffect} from 'react';


export default function test() {
    
    async function testing() {
        const response = await getDepartments();
        
        if(response){
            console.log('data is ready.')
            console.log(response.status);
        } else {
            console.log('data is empty');
        }
    }

    useEffect(()=> {
        testing();
      },[]);



    return (
        <div>

        </div>
    )
}