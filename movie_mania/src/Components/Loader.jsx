import { Spinner, Center } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Center height="70vh">
      <Spinner size="xl" thickness="4px" color="blue.500" />
    </Center>
  );
};

export default Loader;
