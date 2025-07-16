import React from 'react';
import {
  Box,
  Stack,
  Text,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

export default function Profile() {
  return (
    <Box>
      <Stack spacing="8" align="stretch">
        <Box 
          bg="darkBg.800" 
          p={6} 
          borderRadius="lg" 
          shadow="sm"
          borderWidth="1px"
          borderColor="darkBg.700"
          bgGradient="linear(to-br, darkBg.800, darkBg.700)"
        >
          <Heading size="md" mb={6} color="accent.400">Your Stats</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <Box 
              p={4} 
              borderRadius="md" 
              bg="darkBg.700"
              borderWidth="1px"
              borderColor="darkBg.700"
              _hover={{
                borderColor: 'accent.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Text fontWeight="bold" color="gray.100">Cards Created</Text>
              <Text fontSize="2xl" color="accent.400">12</Text>
            </Box>
            <Box 
              p={4} 
              borderRadius="md" 
              bg="darkBg.700"
              borderWidth="1px"
              borderColor="darkBg.700"
              _hover={{
                borderColor: 'accent.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Text fontWeight="bold" color="gray.100">Total Likes</Text>
              <Text fontSize="2xl" color="accent.400">48</Text>
            </Box>
            <Box 
              p={4} 
              borderRadius="md" 
              bg="darkBg.700"
              borderWidth="1px"
              borderColor="darkBg.700"
              _hover={{
                borderColor: 'accent.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Text fontWeight="bold" color="gray.100">Cards Shared</Text>
              <Text fontSize="2xl" color="accent.400">24</Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box 
          bg="darkBg.800" 
          p={6} 
          borderRadius="lg" 
          shadow="sm"
          borderWidth="1px"
          borderColor="darkBg.700"
          bgGradient="linear(to-br, darkBg.800, darkBg.700)"
        >
          <Heading size="md" mb={6} color="accent.400">Recent Activity</Heading>
          <Stack spacing={4}>
            <Box 
              p={4} 
              bg="darkBg.700" 
              borderRadius="md"
              borderWidth="1px"
              borderColor="darkBg.700"
              _hover={{
                borderColor: 'accent.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Text color="gray.100">Created "Are you a star? Because you light up my world" card</Text>
            </Box>
            <Box 
              p={4} 
              bg="darkBg.700" 
              borderRadius="md"
              borderWidth="1px"
              borderColor="darkBg.700"
              _hover={{
                borderColor: 'accent.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Text color="gray.100">Received 5 likes on "Do you have a map?" card</Text>
            </Box>
            <Box 
              p={4} 
              bg="darkBg.700" 
              borderRadius="md"
              borderWidth="1px"
              borderColor="darkBg.700"
              _hover={{
                borderColor: 'accent.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Text color="gray.100">Shared "Are you a camera?" card</Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
} 