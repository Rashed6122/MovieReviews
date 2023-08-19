import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function Login({log_in}){
    const [name , setName] = useState("")
    const [id , setId]= useState("")
    
    const onChangeName = e =>{
        const name = e.target.value
        setName(name);
    };
    const onChangeId= e =>{
        const id = e.target.value
        setId(id);
    };
    const loggin =  () =>{
        console.log(name, id)
        log_in({name:name,id:id})    
    };
    return (
        <div>
            <Form>
                <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={name}
                    onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant="primary" onClick={loggin}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}
export default Login;