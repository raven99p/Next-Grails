import { Result, Button } from 'antd';
import {useRouter} from 'next/router';

export default function error() {
    const router = useRouter();

    return(
        <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" onClick={()=> router.push('/department/showDepartments')}>Back Home</Button>}
        />
    )
}