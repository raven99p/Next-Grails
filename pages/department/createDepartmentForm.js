import { 
    Form, 
    Input,
    Button, 
    Row,Col
  } from 'antd';
import LayoutCustom from '../../components/layout'
import {useRouter} from 'next/router'
import { createDepartment } from '../../utilitieFunctions/departmentFetchingFunctions'
export default function createDepartmentForm() {

    const router = useRouter();

    async function handleCreateDepartment (values) {
        const grailsResponse = await createDepartment(values);
        const data = await grailsResponse.json();
        console.log(data);
        if (data.status==200) {
          router.push('/department/showDepartments');
        }
    }
    return (
      <LayoutCustom>
            <Row>
                <Col span={8}></Col>
                <Col span={8}><br/></Col>
                <Col span={8}></Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Form labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            onFinish={handleCreateDepartment}
                    >
                        <Form.Item name="departmentName" label="departmentName" rules={[{ required: true }]}>
                            <Input name = "departmentName" id="departmentName" />
                        </Form.Item>
                        
                        <Form.Item style={{ textAlign: 'center' }} >
                            <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
                                Δημιουργία
                            </Button>
                        </Form.Item> 
                    </Form>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Row>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
            </Row>                
        </LayoutCustom>
    )
}