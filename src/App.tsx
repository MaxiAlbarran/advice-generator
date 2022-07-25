import { useState, useEffect } from "react";

import { Button, Container, Stack, Text, Spinner } from "@chakra-ui/react";

import Advice_icon from './icons/Advice_icon';
import Divider_icon from './icons/Divider_icon';

interface ADVICE {
  id : number,
  advice: string
}

const App:React.FC = () =>  {

  const [phrase, setPhrase] = useState<ADVICE>();

  const [flag, setFlag] = useState<boolean>(false);
  const [newAdvice, setNewAdvice] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getAdvice = async () =>{
    try{
      setLoading(true);
  
      const response = await fetch("https://api.adviceslip.com/advice");
      const document = await response.json();
  
      setPhrase(document.slip);
      setLoading(false);

    }catch(e){
      console.log(e);
    }
  }
  
  useEffect(() => {
    getAdvice();
  }, [flag]) 

  const handleClick = () =>{

    setNewAdvice(true);
    setFlag(flag ? false : true);

    setTimeout(() => {
      setNewAdvice(false);
    }, 2000);   //Se deshabilita el boton durante dos segundos, que es lo que tarda la api en generar un nuevo consejo


  }
  
  return (
    <Container maxW="container.xl" minH="100vh" bgColor="hsl(218, 23%, 16%)" padding="10px" display="flex" justifyContent="center" alignItems="center">

        <Stack padding="30px" spacing={8} bgColor="hsl(217, 19%, 24%)" maxW={["100%", "80%", "40%", "40%"]}  borderRadius="xl">
        
        {
          loading ?
            <Spinner color="hsl(150, 100%, 66%)" size="xl" padding="5px" margin="0 auto"/>
          :
            <>
            <Stack align="center" justify="center" >
              <Text color="hsl(150, 100%, 66%)" fontFamily="'Work Sans', sans-serif">           
              
              ADVICE #{' '}{phrase?.id} </Text>            
            </Stack> 

            <Stack display="flex" justifyContent="center" alignItems="center" textAlign="center">            
                <Text color="hsl(193, 38%, 86%)" fontFamily="'Manrope', Arial" fontSize="28px"> {phrase?.advice} </Text>                                   
            </Stack> 
            </>
        }

          <Stack display="flex" justify="center" align="center" width="100%" overflow="hidden">
            <Divider_icon />
          </Stack>        

          <Stack display="flex" align="center" justify="center">
            <Button borderRadius="xl" size="sm" bg="hsl(150, 100%, 66%)" _hover={{bgColor: 'hsl(150, 100%, 72%)'}}
                    onClick={handleClick} disabled={newAdvice}
            >
              <Advice_icon/>
            </Button>
          </Stack>
        </Stack>

    </Container>
  )
}

export default App
