import React, {useCallback, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

const SearchBox = () => {
    const navigate = useNavigate(); 
    const [keyword, setKeyword] = useState('');

    const submitHandler = useCallback(
        (e) => {
            e.preventDefault();
            if(keyword.trim()){
                navigate(`/search/${keyword}`)
            }else{
                navigate('/')
            }
            
        },
        [keyword, navigate],
    )

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} placeholder='Search Products'>
        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
      </Form>
    </div>
  )
}

export default SearchBox
