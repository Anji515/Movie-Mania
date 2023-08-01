import { useEffect, useState } from 'react';
import useDebouncer from './Components/useDebouncer';
import { Box, Input, Grid, Heading, Center, Image } from '@chakra-ui/react';
import Loader from './Components/Loader';
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [loading, setLaoding] = useState(false)

  function searchMovie(search) {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&query=${search}`
    )
      .then((r) => r.json())
      .then((r) => r.results)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  const debounceSearchValue = useDebouncer(search, 2000);

  useEffect(() => {
    if (debounceSearchValue) {
      setLaoding(true);
      searchMovie(debounceSearchValue)
        .then((res) => {
          setLaoding(false);
          console.log(res)
          setData(res)
        })
    }
  }, [debounceSearchValue])


  return (
    <Box width="50%" margin="auto" height="5vh" >
      <Heading as="h1" textAlign="center" mb={4}>Welcome to Movie Mania</Heading>
      <Input
        type="text"
        placeholder='Search Movies'
        width="100%"
        height="100%"
        focusBorderColor='teal.400'
        color='white'
        background={'gray'}
        mb={'10px'}
        _placeholder={{ color: 'inherit' }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? <Loader /> : 
            <Grid 
            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={4}
            mt={8}
            >
              {data.length > 0 ? (data.map((el) => (
                <Box
                key={el.id}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                p={4}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  alt={el.title}
                  borderRadius="lg"
                  w={'100%'}
                  height={'250px'}
                  mb={4}
                />
                <Heading as="h4" textAlign="center" color={'teal'} fontSize="18px">
                  {el.title}
                </Heading>
              </Box>
              )))
                :
                (<iframe
                  style={{ border: "none", width: "50vw", height: "70vh"}}
                  src='https://embed.lottiefiles.com/animation/109247'
                ></iframe>
                )}
            </Grid>
      }

    </Box>
  );
}

export default App;