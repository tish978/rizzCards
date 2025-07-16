import React from 'react';
import { Box, Grid, Text, Badge, IconButton, Flex, Tooltip, Card, CardBody, Select, Container, Spinner, useToast, HStack } from '@chakra-ui/react';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { categories } from '../data/pickupLines';
import { pickupLineService } from '../services/pickupLineService';
import type { Database } from '../lib/database.types';

type PickupLine = Database['public']['Tables']['pickup_lines']['Row'];

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 62, 137, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 62, 137, 0.4); }
  100% { box-shadow: 0 0 10px rgba(255, 62, 137, 0.2); }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.4); }
  50% { transform: scale(1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const ripple = keyframes`
  0% { 
    box-shadow: 0 0 0 0 rgba(255, 62, 137, 0.4),
                0 0 0 0 rgba(255, 62, 137, 0.2);
  }
  50% { 
    box-shadow: 0 0 0 15px rgba(255, 62, 137, 0),
                0 0 0 30px rgba(255, 62, 137, 0);
  }
  100% { 
    box-shadow: 0 0 0 0 rgba(255, 62, 137, 0),
                0 0 0 0 rgba(255, 62, 137, 0);
  }
`;

const confettiAnimation = keyframes`
  0% {
    transform: translate(-50%, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -100vh) rotate(360deg);
    opacity: 0;
  }
`;

interface ConfettiParticleProps {
  color: string;
  delay: number;
  left: string;
}

const ConfettiParticle = ({ color, delay, left }: ConfettiParticleProps) => (
  <Box
    position="absolute"
    left={left}
    bottom="0"
    width="10px"
    height="10px"
    backgroundColor={color}
    borderRadius="50%"
    animation={`${confettiAnimation} 1s ease-out forwards`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const ConfettiExplosion = ({ active }: { active: boolean }) => {
  if (!active) return null;

  const colors = ['accent.500', 'accent.400', 'purple.400', 'pink.400'];
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    color: colors[i % colors.length],
    delay: Math.random() * 0.5,
    left: `${Math.random() * 100}%`
  }));

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
      pointerEvents="none"
    >
      {particles.map((particle, i) => (
        <ConfettiParticle key={i} {...particle} />
      ))}
    </Box>
  );
};

export default function Browse() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [likedCards, setLikedCards] = useState<string[]>([]);
  const [animatingCards, setAnimatingCards] = useState<{[key: string]: string}>({});
  const [showConfetti, setShowConfetti] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pickupLines, setPickupLines] = useState<PickupLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Fetch pickup lines on mount and when category changes
  useEffect(() => {
    async function fetchPickupLines() {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = selectedCategory === 'all'
          ? await pickupLineService.getAll()
          : await pickupLineService.getByCategory(selectedCategory);
        
        setPickupLines(data);
      } catch (err) {
        setError('Failed to load pickup lines');
        toast({
          title: 'Error',
          description: 'Failed to load pickup lines',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPickupLines();
  }, [selectedCategory, toast]);

  // Fetch user's liked cards on mount
  useEffect(() => {
    async function fetchUserLikes() {
      try {
        // TODO: Replace with actual user ID from auth
        const userId = 'temp-user-id';
        const likedIds = await pickupLineService.getUserLikes(userId);
        setLikedCards(likedIds);
      } catch (err) {
        console.error('Failed to fetch user likes:', err);
      }
    }

    fetchUserLikes();
  }, []);

  const handleLike = async (id: string) => {
    try {
      // TODO: Replace with actual user ID from auth
      const userId = 'temp-user-id';
      
      setShowConfetti(id);
      const isNowLiked = await pickupLineService.toggleLike(id, userId);
      
      if (isNowLiked) {
        setLikedCards([...likedCards, id]);
        setAnimatingCards({ ...animatingCards, [id]: 'heartBeat' });
      } else {
        setLikedCards(likedCards.filter(cardId => cardId !== id));
      }
      
      // Update the pickup lines list to reflect the new likes count
      setPickupLines(prevLines =>
        prevLines.map(line =>
          line.id === id
            ? { ...line, likes_count: line.likes_count + (isNowLiked ? 1 : -1) }
            : line
        )
      );

      setTimeout(() => {
        setShowConfetti(null);
      }, 3000);
      
      setTimeout(() => {
        setAnimatingCards(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }, 2000);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update like status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleShare = async (line: PickupLine) => {
    setAnimatingCards({ ...animatingCards, [line.id]: 'ripple' });
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this pickup line!',
          text: line.text,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(line.text);
      toast({
        title: 'Copied!',
        description: 'Pickup line copied to clipboard',
        status: 'success',
        duration: 2000,
      });
    }

    setTimeout(() => {
      setAnimatingCards(prev => {
        const newState = { ...prev };
        delete newState[line.id];
        return newState;
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" color="accent.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Text color="red.400">{error}</Text>
      </Flex>
    );
  }

  return (
    <>
      {showConfetti && <ConfettiExplosion active={showConfetti !== null} />}
      
      <Container maxW="container.xl" mb={6}>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          bg="darkBg.700"
          borderColor="darkBg.600"
          _hover={{ borderColor: 'accent.400' }}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </Select>
      </Container>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {pickupLines.map((line) => (
          <Card
            key={line.id}
            bg="darkBg.800"
            borderWidth="1px"
            borderColor={hoveredCard === line.id ? 'accent.500' : 'darkBg.700'}
            borderRadius="xl"
            overflow="hidden"
            transition="all 0.2s"
            _hover={{
              transform: 'translateY(-4px)',
              borderColor: 'accent.500',
              boxShadow: '0 4px 20px rgba(255, 62, 137, 0.2)',
            }}
            onMouseEnter={() => setHoveredCard(line.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardBody>
              <Text fontSize="lg" mb={4} color="gray.100">
                {line.text}
              </Text>
              <Flex justify="space-between" align="center">
                <Badge
                  colorScheme="pink"
                  bg="accent.500"
                  color="white"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {line.category}
                </Badge>
                <HStack spacing={2}>
                  <Tooltip label={likedCards.includes(line.id) ? 'Unlike' : 'Like'}>
                    <IconButton
                      aria-label="Like"
                      icon={likedCards.includes(line.id) ? <HeartSolidIcon /> : <HeartIcon />}
                      onClick={() => handleLike(line.id)}
                      variant="ghost"
                      color={likedCards.includes(line.id) ? 'accent.500' : 'gray.400'}
                      _hover={{ color: 'accent.500' }}
                      animation={
                        animatingCards[line.id] === 'heartBeat'
                          ? `${heartBeat} 1s ease-in-out`
                          : undefined
                      }
                    />
                  </Tooltip>
                  <Tooltip label="Share">
                    <IconButton
                      aria-label="Share"
                      icon={<ShareIcon />}
                      onClick={() => handleShare(line)}
                      variant="ghost"
                      color="gray.400"
                      _hover={{ color: 'accent.500' }}
                      animation={
                        animatingCards[line.id] === 'ripple'
                          ? `${ripple} 1s cubic-bezier(0, 0, 0.2, 1)`
                          : undefined
                      }
                    />
                  </Tooltip>
                </HStack>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </>
  );
} 