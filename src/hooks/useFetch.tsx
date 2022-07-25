import {useState, useEffect} from 'react'

interface ADVICE {
  id : number,
  advice: string
}

const useFetch = (flag:boolean) => {

  const [phrase, setPhrase] = useState<ADVICE>();
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


  return {phrase, loading};

}

export default useFetch