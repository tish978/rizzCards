import React from 'react';
import { Box, Grid, Text, Badge, IconButton, Flex, Tooltip, Card, CardBody } from '@chakra-ui/react';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { keyframes } from '@emotion/react';

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

const pickupLines = [
  { id: 1, text: "Are you a magician? Because whenever I look at you, everyone else disappears.", category: "Cheesy" },
  { id: 2, text: "Do you have a map? I keep getting lost in your eyes.", category: "Classic" },
  { id: 3, text: "Are you a camera? Because every time I look at you, I smile.", category: "Cute" },
];

export default function Browse() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const [animatingCards, setAnimatingCards] = useState<{[key: number]: string}>({});
  const [showConfetti, setShowConfetti] = useState<number | null>(null);

  const handleLike = (id: number) => {
    if (likedCards.includes(id)) {
      setLikedCards(likedCards.filter(cardId => cardId !== id));
    } else {
      setShowConfetti(id);
      setLikedCards([...likedCards, id]);
      setAnimatingCards({ ...animatingCards, [id]: 'heartBeat' });
      
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
    }
  };

  const handleShare = async (id: number) => {
    const card = pickupLines.find(line => line.id === id);
    if (!card) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this pickup line!',
          text: card.text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(card.text);
      }
      
      setAnimatingCards({ ...animatingCards, [id]: 'ripple' });
      setTimeout(() => {
        setAnimatingCards(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }, 1000);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      <ConfettiExplosion active={showConfetti !== null} />
      <Grid 
        templateColumns={{ 
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)" 
        }} 
        gap={8}
        py={4}
      >
        {pickupLines.map((line) => (
          <Card 
            key={line.id} 
            bg="darkBg.800"
            borderRadius="2xl"
            overflow="visible"
            transition="all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1)"
            animation={`${float} 6s ease-in-out infinite`}
            position="relative"
            borderWidth="1px"
            borderColor="darkBg.700"
            bgGradient="linear(to-br, darkBg.800, darkBg.700)"
            style={{
              animation: animatingCards[line.id] === 'heartBeat'
                ? `${heartBeat} 1s ease-in-out`
                : animatingCards[line.id] === 'ripple'
                ? `${ripple} 1s ease-in-out`
                : `${float} 6s ease-in-out infinite`
            }}
            _hover={{
              transform: 'scale(1.05) translateY(-10px)',
              animation: `${glow} 2s ease-in-out infinite`,
              borderColor: 'accent.500',
            }}
            onMouseEnter={() => setHoveredCard(line.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardBody>
              <Text 
                fontSize="lg" 
                mb={4} 
                color="white"
                fontWeight="medium"
                lineHeight="tall"
                style={{
                  transform: hoveredCard === line.id ? 'translateZ(20px)' : 'none',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {line.text}
              </Text>
              <Badge 
                mb={4}
                px={3}
                py={1}
                borderRadius="full"
                textTransform="capitalize"
                bgGradient="linear(to-r, accent.500, accent.400)"
                color="white"
                style={{
                  transform: hoveredCard === line.id ? 'translateZ(30px)' : 'none',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {line.category}
              </Badge>
              <Flex 
                justify="space-between" 
                mt={4}
                style={{
                  transform: hoveredCard === line.id ? 'translateZ(40px)' : 'none',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <Tooltip label={likedCards.includes(line.id) ? "Unlike" : "Like this card"} placement="top">
                  <IconButton
                    aria-label="Like"
                    icon={likedCards.includes(line.id) 
                      ? <HeartSolidIcon className="w-5 h-5" /> 
                      : <HeartIcon className="w-5 h-5" />
                    }
                    variant="ghost"
                    colorScheme="pink"
                    color={likedCards.includes(line.id) ? "accent.400" : "gray.400"}
                    onClick={() => handleLike(line.id)}
                    _hover={{ 
                      transform: 'scale(1.2)',
                      color: 'accent.400',
                      bg: 'darkBg.700' 
                    }}
                    transition="all 0.2s"
                    style={{
                      animation: likedCards.includes(line.id) ? `${heartBeat} 0.5s ease-in-out` : 'none'
                    }}
                  />
                </Tooltip>
                <Tooltip label="Share this card" placement="top">
                  <IconButton
                    aria-label="Share"
                    icon={<ShareIcon className="w-5 h-5" />}
                    variant="ghost"
                    colorScheme="pink"
                    color="gray.400"
                    onClick={() => handleShare(line.id)}
                    _hover={{ 
                      transform: 'scale(1.2)',
                      color: 'accent.400',
                      bg: 'darkBg.700' 
                    }}
                    transition="all 0.2s"
                  />
                </Tooltip>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </>
  );
} 