import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Collector } from "tripetto-collector-rolling";
import Services from "tripetto-services";

const token = process.env.REACT_APP_TRIPETTO_TOKEN

const FormContainer = styled.div`
  height: 80vh;
  max-width: 800px;
  margin: 0 auto;
`

export const QuestionForm = () => {
  const [ formDefinition, setFormDefinition] = useState();
  const [ formStyle, setFormStyle ] = useState();
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  useEffect(() => {
    if (token){
      Services.init({ token });
      Services.style.then((res) => {
        setFormStyle(res);
      });
      Services.definition
        .then((res) => {
          setLoading(false);
          setFormDefinition(res);
        })
        .catch( err => {
          setError(true)
          console.log(err)
          setLoading(false)
        })
    }
    else {
      setLoading(false)
    }
  },[])

  if ( formDefinition && formStyle ){
    return (
      <FormContainer>
        {token && !error ? (
          <Collector
            definition={formDefinition}
            style={formStyle}
            onFinish={(instance) => {
              console.log(instance);
            }}
          />
        ) : (
          <div></div>
        )}
      </FormContainer>
    );
  }
  else {
    return (
      <div>
        {loading && <div>form is loading...</div>}
        {error && !loading && <div>There is a problem with the form</div>}
      </div>
    );
  }
  
}
