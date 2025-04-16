import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Slider,
  Button,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  SvgIcon
} from '@mui/material';
import {
  Pets as PetsIcon,
  Straighten as SizeIcon,
  Palette as ColorIcon,
  Info as InfoIcon,
  RestartAlt as ResetIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Restaurant as FoodIcon,
  Psychology as BehaviorIcon,
  Groups as SocialIcon,
  Palette as AppearanceIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import animalsData from './data/animals.json';
import funfactsData from './data/funfacts.json';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  transition: 'all 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  aspectRatio: '1/1',
  cursor: 'pointer',

  '& .spot-button': {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 3,
    minWidth: 'auto',
    minHeight: '24px',
    padding: '4px 8px',
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      transform: 'none'
    },
    '&.spotted': {
      background: 'linear-gradient(45deg, #ffd700, #ffed4a)',
      color: '#000',
      border: 'none',
      boxShadow: `
        0 2px 4px rgba(0,0,0,0.2),
        inset 0 -1px 2px rgba(0,0,0,0.1),
        inset 0 1px 2px rgba(255,255,255,0.5),
        0 0 6px rgba(255,215,0,0.4)
      `,
      '&:hover': {
        background: 'linear-gradient(45deg, #ffd700, #ffed4a)',
        boxShadow: `
          0 2px 4px rgba(0,0,0,0.2),
          inset 0 -1px 2px rgba(0,0,0,0.1),
          inset 0 1px 2px rgba(255,255,255,0.5),
          0 0 8px rgba(255,215,0,0.5)
        `
      }
    }
  },

  '&.flipped': {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '97vw',
    height: '97vw',
    maxWidth: 'min(97vw, 600px)',
    maxHeight: 'min(97vw, 600px)',
    aspectRatio: '1/1',
    zIndex: 1001,
    cursor: 'auto',
    '@media (orientation: landscape) and (max-height: 600px)': {
      width: '97vh',
      height: '97vh',
      maxWidth: 'min(97vh, 600px)',
      maxHeight: 'min(97vh, 600px)',
    },
    '& ~ .overlay': {
      opacity: 1,
      visibility: 'visible',
    }
  },

  '& .card-front': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 1,
    visibility: 'visible',
    transform: 'translateZ(0)',
    transition: 'all 0.3s ease-in-out',
  },

  '& .card-back': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateZ(0) scale(0.95)',
    transition: 'all 0.3s ease-in-out',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    cursor: 'pointer',
    '& .back-content': {
      transform: 'translateZ(0)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(46,125,50,0.03) 0%, rgba(46,125,50,0.08) 100%)',
      zIndex: 0
    }
  },

  '&.flipped .card-front': {
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateZ(0) scale(1.05)',
  },

  '&.flipped .card-back': {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateZ(0) scale(1)',
  },

  '& .MuiCardMedia-root': {
    height: '100%',
    width: '100%',
    transition: 'all 0.5s ease-in-out',
    position: 'relative',
    objectFit: 'cover',
    backgroundColor: 'grey.100',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
      opacity: 0.5,
      pointerEvents: 'none',
      mixBlendMode: 'screen'
    }
  },

  '& .MuiCardContent-root': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
    color: 'white',
    padding: 0,
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateY(0)',
    opacity: 1,
    visibility: 'visible',
    '&:last-child': {
      paddingBottom: 0
    }
  }
}));

const InfoLabel = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '1px 6px',
  borderRadius: '10px',
  fontSize: '0.55rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  backdropFilter: 'blur(8px)',
  zIndex: 2,
  width: 'auto',
  alignSelf: 'flex-end',
  letterSpacing: '0.2px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 1,
  visibility: 'visible',
  '& .MuiSvgIcon-root': {
    fontSize: '0.65rem'
  }
}));

const FilterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  '& .MuiDivider-root': {
    margin: theme.spacing(3, 0)
  }
}));

const FilterSection = ({ icon: Icon, category, values, selectedValues, onValueClick }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <Icon 
      sx={{ 
        fontSize: 20,
        color: 'rgba(255,255,255,0.9)',
        width: 20
      }}
    />
    <Stack 
      direction="row" 
      spacing={0.75} 
      useFlexGap 
      flexWrap="wrap"
      sx={{
        '& .MuiChip-root': {
          borderRadius: '6px',
          height: '24px',
          fontSize: '0.8125rem',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&.MuiChip-filled': {
            backgroundColor: 'white',
            color: '#1b5e20'
          },
          '&.MuiChip-outlined': {
            borderColor: 'rgba(255,255,255,0.3)',
            color: 'rgba(255,255,255,0.9)',
            backgroundColor: 'rgba(255,255,255,0.05)'
          }
        }
      }}
    >
      {values.map(value => (
        <Chip
          key={value}
          label={value}
          onClick={() => onValueClick(category, value)}
          variant={selectedValues.includes(value) ? "filled" : "outlined"}
          size="small"
        />
      ))}
    </Stack>
  </Box>
);

const CardBack = ({ animal, onClose }) => {
  const facts = funfactsData.funfacts[animal.id]?.facts || [];

  const handleClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Box className="card-back" onClick={handleClick}>
      <Box className="back-content" sx={{ 
        textAlign: 'center',
        mb: 1
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: 'text.primary',
            letterSpacing: '0.5px',
            fontSize: '1.1rem'
          }}
        >
          Funfacts
        </Typography>
        <Divider sx={{ maxWidth: '80px', mx: 'auto', my: 1, borderColor: 'rgba(0,0,0,0.1)' }} />
      </Box>
      {facts.length > 0 ? (
        <Box className="back-content" sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          px: 1.5,
          position: 'relative',
          maxHeight: 'calc(100% - 60px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          }
        }}>
          {facts.map((fact, index) => (
            <Box key={index} sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              '&:not(:last-child)': {
                pb: 1
              }
            }}>
              <Typography 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: '0.85rem',
                  color: 'text.primary',
                  lineHeight: 1.5,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {fact.fact}
              </Typography>
              {index < facts.length - 1 && (
                <Divider sx={{ 
                  borderColor: 'rgba(0,0,0,0.1)',
                  '&::before, &::after': {
                    borderColor: 'rgba(0,0,0,0.1)',
                  }
                }} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography 
          className="back-content"
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            color: 'text.secondary',
            textAlign: 'center',
            px: 1.5,
            fontSize: '0.85rem'
          }}
        >
          Binnenkort meer interessante weetjes over {animal.name}...
        </Typography>
      )}
    </Box>
  );
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontFamily: '"Righteous", cursive',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Righteous", cursive',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Righteous", cursive',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Righteous", cursive',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Righteous", cursive',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Righteous", cursive',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
    },
    caption: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 300,
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
});

const AnimalCard = React.memo(({ animal, spottedAnimals, onSpottedToggle, onFlip }) => {
  const [showFlash, setShowFlash] = useState(false);

  const handleSpottedClick = (e) => {
    e.stopPropagation();
    if (!spottedAnimals[animal.id]) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);
    }
    onSpottedToggle(animal.id);
  };

  const handleCardClick = (e) => {
    if (e && !e.target.closest('.MuiButton-root')) {
      const card = e.currentTarget;
      const shouldFlip = !card.classList.contains('flipped');
      card.classList.toggle('flipped');
      onFlip(shouldFlip);
      document.body.style.overflow = shouldFlip ? 'hidden' : 'auto';
    } else {
      const card = document.querySelector('.MuiCard-root.flipped');
      if (card) {
        card.classList.remove('flipped');
        onFlip(false);
        document.body.style.overflow = 'auto';
      }
    }
  };

  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/images/animals/placeholder.webp`;
  };

  return (
    <StyledCard onClick={handleCardClick}>
      {showFlash && <div className="camera-flash" />}
      <Box className={`card-front ${spottedAnimals[animal.id] ? 'spotted' : ''}`}>
        <Button
          className={`spot-button ${spottedAnimals[animal.id] ? 'spotted' : ''}`}
          onClick={handleSpottedClick}
          size="small"
        >
          {spottedAnimals[animal.id] ? 'Gespot!' : 'Niet gespot'}
        </Button>
        <Box sx={{ 
          position: 'absolute', 
          top: theme.spacing(1), 
          right: theme.spacing(1),
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          zIndex: 3,
          alignItems: 'flex-end'
        }}>
          <InfoLabel>
            <PetsIcon />
            {animal.type}
          </InfoLabel>
          <InfoLabel>
            <SizeIcon />
            {animal.size} cm
          </InfoLabel>
        </Box>
        <div className="sparkles" />
        <CardMedia
          component="img"
          image={`${process.env.PUBLIC_URL}/${animal.image}`}
          alt={animal.name}
          onError={handleImageError}
          loading="lazy"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            backgroundColor: 'grey.100'
          }}
        />
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            minHeight: '100%',
            px: 1.5,
            pb: 1.5
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-end',
              width: '100%',
              position: 'relative',
              zIndex: 1,
              mt: 'auto'
            }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  noWrap
                  className="animal-name"
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    fontSize: '0.9rem',
                    mb: 0.25,
                    lineHeight: 1.2,
                    textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 1,
                    visibility: 'visible'
                  }}
                >
                  {animal.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  noWrap
                  className="scientific-name"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.5px',
                    lineHeight: 1.2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                    fontWeight: 300,
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 1,
                    visibility: 'visible'
                  }}
                >
                  {animal.scientificName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <CardBack animal={animal} onClose={handleCardClick} />
    </StyledCard>
  );
});

function App() {
  const minSize = Math.floor(Math.min(...animalsData.animals.map(animal => animal.size)) * 0.8);
  const maxSize = Math.ceil(Math.max(...animalsData.animals.map(animal => animal.size)) * 1.2);
  
  const [sizeRange, setSizeRange] = useState([minSize, maxSize]);
  const [spottedAnimals, setSpottedAnimals] = useState(() => {
    const saved = localStorage.getItem('spottedAnimals');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState(0);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isAnyCardFlipped, setIsAnyCardFlipped] = useState(false);
  const [filters, setFilters] = useState({
    type: [],
    color: []
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    localStorage.setItem('spottedAnimals', JSON.stringify(spottedAnimals));
  }, [spottedAnimals]);

  const handleSpottedToggle = useCallback((id) => {
    setSpottedAnimals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const uniqueValues = (key) => {
    const values = new Set();
    animalsData.animals.forEach(animal => {
      if (Array.isArray(animal[key])) {
        animal[key].forEach(value => values.add(value));
      } else {
        values.add(animal[key]);
      }
    });
    return Array.from(values).sort();
  };

  const handleFilterClick = (category, value) => {
    setFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const handleSizeChange = (event, newValue) => {
    setSizeRange(newValue);
  };

  // Memoize filtered animals
  const filteredAnimals = useMemo(() => {
    return animalsData.animals.filter(animal => {
      if (activeTab === 1 && !spottedAnimals[animal.id]) {
        return false;
      }

      // Then check type filter
      if (filters.type.length > 0 && !filters.type.includes(animal.type)) {
        return false;
      }

      // Then check color filter
      if (filters.color.length > 0) {
        const hasMatchingColor = filters.color.some(color => 
          Array.isArray(animal.color) 
            ? animal.color.includes(color)
            : animal.color === color
        );
        if (!hasMatchingColor) return false;
      }

      // Finally check size filter
      const size = Number(animal.size);
      if (isNaN(size)) return false;
      
      return size >= sizeRange[0] && size <= sizeRange[1];
    });
  }, [filters, sizeRange, activeTab, spottedAnimals]);

  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/images/animals/placeholder.webp`;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const resetFilters = () => {
    setFilters({
      type: [],
      color: []
    });
    setSizeRange([minSize, maxSize]);
  };

  const handleCardFlip = useCallback((shouldFlip) => {
    setIsAnyCardFlipped(shouldFlip);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(0,0,0,0.2)'
            }
          }
        }}
      >
        <Box
          className="overlay"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.3s ease-in-out',
            pointerEvents: 'none',
            zIndex: 998,
          }}
          onClick={() => {
            const flippedCard = document.querySelector('.MuiCard-root.flipped');
            if (flippedCard) {
              flippedCard.classList.remove('flipped');
              document.body.style.overflow = 'auto';
            }
          }}
        />
        <Container 
          maxWidth="lg" 
          sx={{
            px: { xs: 0, sm: 3 },
            position: 'relative',
            zIndex: isAnyCardFlipped ? 997 : 'auto'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              px: { xs: 1, sm: 4 },
              pt: 2,
              pb: 2,
              background: 'linear-gradient(180deg, rgba(46,125,50,0.15) 0%, rgba(46,125,50,0) 100%)',
              borderRadius: { xs: 0, sm: '16px' },
              position: 'relative',
              overflow: 'hidden',
              mb: -1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                borderRadius: 'inherit'
              }
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              position: 'relative'
            }}>
              <Box
                component="img"
                src="/images/pocketspot-logo.png"
                alt="PocketSpot Logo"
                sx={{
                  height: { xs: '80px', sm: '100px' },
                  width: 'auto',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5
              }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 700,
                    color: 'primary.main',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '1.75rem', sm: '2.2rem' },
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))'
                  }}
                >
                  PocketSpotter
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    opacity: 0.8
                  }}
                >
                  by Benjamin Murck
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ 
            borderBottom: 'none',
            mb: 2.5,
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: { xs: 0, sm: '16px' }
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                minHeight: '56px',
                '& .MuiTabs-indicator': {
                  height: '3px',
                  borderRadius: 0,
                  background: 'linear-gradient(90deg, #43a047 0%, #2e7d32 100%)'
                },
                '& .MuiTab-root': {
                  minHeight: '56px',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  color: 'text.secondary',
                  opacity: 0.7,
                  '&.Mui-selected': {
                    color: '#2e7d32',
                    opacity: 1
                  }
                }
              }}
            >
              <Tab 
                label={
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    py: 0.5
                  }}>
                    <span>Alle dieren</span>
                    <Chip 
                      label={animalsData.animals.length} 
                      size="small" 
                      color={activeTab === 0 ? "primary" : "default"}
                      sx={{
                        height: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: activeTab === 0 ? 'primary.main' : 'rgba(0,0,0,0.08)',
                        color: activeTab === 0 ? 'white' : 'text.secondary',
                        '.MuiChip-label': {
                          px: 1
                        }
                      }}
                    />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    py: 0.5
                  }}>
                    <span>Gespot</span>
                    <Chip 
                      label={Object.values(spottedAnimals).filter(Boolean).length} 
                      size="small"
                      color={activeTab === 1 ? "primary" : "default"}
                      sx={{
                        height: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: activeTab === 1 ? 'primary.main' : 'rgba(0,0,0,0.08)',
                        color: activeTab === 1 ? 'white' : 'text.secondary',
                        '.MuiChip-label': {
                          px: 1
                        }
                      }}
                    />
                  </Box>
                } 
              />
            </Tabs>
          </Box>
          
          <Box sx={{ px: { xs: 1.25, sm: 0 } }}>
            <Box 
              sx={{ 
                mb: 2.5
              }}
            >
              <Box sx={{ 
                height: '20px',
                borderRadius: '10px',
                bgcolor: 'rgba(255,255,255,0.9)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: `
                  inset 0 4px 6px rgba(0,0,0,0.2),
                  inset 0 -2px 2px rgba(255,255,255,0.8)
                `,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                  borderRadius: 'inherit'
                }
              }}>
                <Box 
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${(Object.values(spottedAnimals).filter(Boolean).length / animalsData.animals.length) * 100}%`,
                    background: `linear-gradient(90deg, 
                      #66bb6a 0%,
                      #43a047 40%,
                      #388e3c 70%,
                      #2e7d32 100%)`,
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '2px 0 10px rgba(76,175,80,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
                      borderRadius: 'inherit'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
                      borderRadius: 'inherit'
                    }
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'white',
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: 'italic',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      zIndex: 1,
                      lineHeight: 1,
                      padding: '4px 0',
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '1px',
                      height: '20px',
                      '& .number, & .percentage': {
                        display: 'inline-flex',
                        alignItems: 'center',
                        height: '1em',
                        lineHeight: 1,
                        fontStyle: 'italic'
                      }
                    }}
                  >
                    <span className="number">
                      {Math.round((Object.values(spottedAnimals).filter(Boolean).length / animalsData.animals.length) * 100)}
                    </span>
                    <span className="percentage">%</span>
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Paper 
              sx={{ 
                mb: 0,
                p: 1.5,
                pb: 2,
                backgroundColor: '#1b5e20',
                borderRadius: '8px 8px 0 0',
                border: '1px solid',
                borderBottom: 'none',
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                background: `linear-gradient(165deg, 
                  #2e7d32 0%, 
                  #1b5e20 100%)`,
                boxShadow: 'none'
              }}
              elevation={0}
            >
              <Stack spacing={2.5}>
                <FilterSection
                  icon={PetsIcon}
                  category="type"
                  values={uniqueValues('type')}
                  selectedValues={filters.type}
                  onValueClick={handleFilterClick}
                />

                <FilterSection
                  icon={ColorIcon}
                  category="color"
                  values={uniqueValues('color')}
                  selectedValues={filters.color}
                  onValueClick={handleFilterClick}
                />

                <Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1.5
                  }}>
                    <SizeIcon 
                      sx={{ 
                        fontSize: 20,
                        color: 'rgba(255,255,255,0.9)',
                        width: 20
                      }}
                    />
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      flexGrow: 1,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: 1.5,
                      py: 0.75,
                      px: 1,
                      border: '1px solid',
                      borderColor: 'rgba(255,255,255,0.1)'
                    }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500,
                          minWidth: '20px',
                          textAlign: 'right'
                        }}
                      >
                        {sizeRange[0]}
                      </Typography>
                      <Slider
                        value={sizeRange}
                        onChange={handleSizeChange}
                        valueLabelDisplay="auto"
                        min={minSize}
                        max={maxSize}
                        size="small"
                        sx={{ 
                          mx: 0.5,
                          '& .MuiSlider-rail': {
                            opacity: 0.32,
                            backgroundColor: 'rgba(0,0,0,0.3)'
                          },
                          '& .MuiSlider-track': {
                            border: 'none',
                            backgroundColor: 'white'
                          },
                          '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                            backgroundColor: 'white',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: `0 0 0 6px rgba(255,255,255,0.16)`
                            },
                            '&.Mui-active': {
                              boxShadow: `0 0 0 8px rgba(255,255,255,0.16)`
                            }
                          },
                          '& .MuiSlider-valueLabel': {
                            backgroundColor: '#1b5e20'
                          }
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500,
                          minWidth: '20px'
                        }}
                      >
                        {sizeRange[1]}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Paper>
            <Button
              variant="outlined"
              startIcon={<ResetIcon />}
              onClick={resetFilters}
              size="small"
              sx={{
                width: '100%',
                borderRadius: '0 0 8px 8px',
                textTransform: 'none',
                color: 'white',
                background: `linear-gradient(165deg, 
                  #ff7043 0%,
                  #f4511e 100%)`,
                fontSize: '0.8125rem',
                fontWeight: 500,
                py: 1.5,
                border: '1px solid rgba(255,87,34,0.3)',
                borderTop: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                mb: 3,
                '&:hover': {
                  background: `linear-gradient(165deg, 
                    #ff7043 0%,
                    #f4511e 100%)`,
                  border: '1px solid rgba(255,87,34,0.3)',
                  borderTop: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                },
                '&:focus': {
                  outline: 'none',
                  background: `linear-gradient(165deg, 
                    #ff7043 0%,
                    #f4511e 100%)`,
                  border: '1px solid rgba(255,87,34,0.3)',
                  borderTop: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                },
                '&:active': {
                  background: `linear-gradient(165deg, 
                    #ff7043 0%,
                    #f4511e 100%)`,
                  border: '1px solid rgba(255,87,34,0.3)',
                  borderTop: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                },
                '& .MuiButton-startIcon': {
                  position: 'relative',
                  zIndex: 1,
                  '& svg': {
                    fontSize: '1.2rem'
                  }
                },
                '& .MuiButton-label': {
                  position: 'relative',
                  zIndex: 1
                }
              }}
            >
              Reset filters
            </Button>

            {filteredAnimals.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  {activeTab === 1 ? 
                    "Je hebt nog geen dieren gespot die aan de filters voldoen." :
                    "Geen dieren gevonden die aan de filters voldoen."
                  }
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={1}>
                {filteredAnimals.map(animal => (
                  <Grid item xs={6} sm={4} md={3} key={animal.id}>
                    <AnimalCard
                      animal={animal}
                      spottedAnimals={spottedAnimals}
                      onSpottedToggle={handleSpottedToggle}
                      onFlip={handleCardFlip}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
        <Box
          sx={{
            mt: 1.25,
            py: 3,
            px: { xs: 1.25, sm: 0 },
            background: 'linear-gradient(180deg, rgba(46,125,50,0.1) 0%, rgba(46,125,50,0) 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '1px',
              background: 'rgba(0,0,0,0.05)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
              borderRadius: 'inherit'
            }
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  letterSpacing: '0.5px',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  opacity: 0.8
                }}
              >
                PocketSpotter
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  opacity: 0.6,
                  fontSize: '0.75rem'
                }}
              >
                © 2025 Benjamin Murck
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default React.memo(App); 