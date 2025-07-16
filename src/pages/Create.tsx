import React from 'react';
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Card,
  CardBody,
  Text,
  Badge,
  useToast,
  Heading,
} from '@chakra-ui/react';

const categories = ["Cheesy", "Classic", "Cute", "Funny", "Smooth"];

export default function Create() {
  const [pickupLine, setPickupLine] = React.useState('');
  const [category, setCategory] = React.useState('Cheesy');
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Card Created!",
      description: "Your pickup line has been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setPickupLine('');
  };

  return (
    <HStack align="flex-start" spacing={8}>
      {/* Form Section */}
      <Box flex="1">
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Heading size="md" color="accent.400">Create New Card</Heading>
            
            <FormControl isRequired>
              <FormLabel>Your Pickup Line</FormLabel>
              <Input
                value={pickupLine}
                onChange={(e) => setPickupLine(e.target.value)}
                placeholder="Are you a magician? Because..."
                size="lg"
                bg="darkBg.700"
                border="none"
                _focus={{
                  bg: "darkBg.800",
                  boxShadow: "0 0 0 1px accent.500",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                size="lg"
                bg="darkBg.700"
                border="none"
                _focus={{
                  bg: "darkBg.800",
                  boxShadow: "0 0 0 1px accent.500",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              size="lg"
              bgGradient="linear(to-r, accent.500, accent.400)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, accent.400, accent.500)",
                transform: "translateY(-2px)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
            >
              Create Card
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Preview Section */}
      <Box flex="1">
        <Heading size="md" mb={6} color="accent.400">Preview</Heading>
        <Card
          bg="darkBg.800"
          borderRadius="2xl"
          overflow="hidden"
          borderWidth="1px"
          borderColor="darkBg.700"
          bgGradient="linear(to-br, darkBg.800, darkBg.700)"
          p={6}
        >
          <CardBody>
            <Text
              fontSize="lg"
              mb={4}
              color="white"
              fontWeight="medium"
              lineHeight="tall"
            >
              {pickupLine || "Your pickup line will appear here..."}
            </Text>
            <Badge
              mb={4}
              px={3}
              py={1}
              borderRadius="full"
              textTransform="capitalize"
              bgGradient="linear(to-r, accent.500, accent.400)"
              color="white"
            >
              {category}
            </Badge>
          </CardBody>
        </Card>
      </Box>
    </HStack>
  );
} 