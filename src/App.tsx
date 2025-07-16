import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Container, Heading, Tab, TabList, Tabs } from '@chakra-ui/react';

// Pages
import Browse from './pages/Browse';
import Create from './pages/Create';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Box 
        minH="100vh" 
        w="100%"
        bg="darkBg.900"
        position="relative"
        bgGradient="linear(to-b, darkBg.900, darkBg.800)"
      >
        <Box 
          position="absolute"
          top={0}
          left={0}
          right={0}
          bg="darkBg.800"
          py={4} 
          shadow="lg" 
          mb={8}
          borderBottom="1px"
          borderColor="darkBg.700"
          bgGradient="linear(to-r, darkBg.800, darkBg.700)"
        >
          <Container maxW="container.xl">
            <Heading 
              fontSize={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, accent.500, accent.400)"
              bgClip="text"
              letterSpacing="tight"
              textAlign="center"
            >
              RizzCards
            </Heading>
          </Container>
        </Box>

        <Container maxW="container.xl" px={{ base: 4, md: 8 }} pt="100px">
          <Tabs 
            isFitted 
            variant="soft-rounded" 
            colorScheme="pink" 
            mb={8}
            bg="darkBg.800"
            p={3}
            borderRadius="xl"
            shadow="lg"
            borderWidth="1px"
            borderColor="darkBg.700"
            bgGradient="linear(to-r, darkBg.800, darkBg.700)"
          >
            <TabList gap={4}>
              <Tab 
                as={Link} 
                to="/"
                _selected={{ 
                  bg: 'accent.500',
                  color: 'white',
                }}
                color="gray.100"
                _hover={{ bg: 'darkBg.700' }}
              >
                Browse
              </Tab>
              <Tab 
                as={Link} 
                to="/create"
                _selected={{ 
                  bg: 'accent.500',
                  color: 'white',
                }}
                color="gray.100"
                _hover={{ bg: 'darkBg.700' }}
              >
                Create
              </Tab>
              <Tab 
                as={Link} 
                to="/profile"
                _selected={{ 
                  bg: 'accent.500',
                  color: 'white',
                }}
                color="gray.100"
                _hover={{ bg: 'darkBg.700' }}
              >
                Profile
              </Tab>
            </TabList>
          </Tabs>

          <Box 
            bg="darkBg.800"
            borderRadius="xl" 
            p={{ base: 4, md: 6 }} 
            shadow="lg"
            borderWidth="1px"
            borderColor="darkBg.700"
            bgGradient="linear(to-r, darkBg.800, darkBg.700)"
          >
            <Routes>
              <Route path="/" element={<Browse />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 