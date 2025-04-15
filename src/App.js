import React, { useState, useEffect } from 'react';
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
  FilterList as FilterIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import animalsData from './data/animals.json';
import { alpha } from '@mui/material/styles';

// Custom Camera Icon
const CameraIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 15.2c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3zm0-9.5c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8zm0 14.1c-3.4 0-6.1-2.7-6.1-6.1s2.7-6.1 6.1-6.1s6.1 2.7 6.1 6.1s-2.7 6.1-6.1 6.1zm7.5-10.3h-2.1c-.5-2.1-2.4-3.7-4.7-3.7s-4.2 1.6-4.7 3.7H4c-.6 0-1 .4-1 1v7.6c0 .6.4 1 1 1h15.9c.6 0 1-.4 1-1V9.5c0-.6-.4-1-1-1zM12 17c-2.6 0-4.8-2.1-4.8-4.8S9.4 7.5 12 7.5s4.8 2.1 4.8 4.8S14.6 17 12 17z"/>
  </SvgIcon>
);

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  transition: 'all 0.5s ease-in-out',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  aspectRatio: '1/1',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
    opacity: 0,
    transform: 'translate(-100%, -100%)',
    transition: 'all 0.3s ease-in-out',
    pointerEvents: 'none',
    zIndex: 5
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    opacity: 0,
    transition: 'all 0.5s ease-in-out',
    pointerEvents: 'none',
    zIndex: 2
  },
  '&.spotted': {
    background: `
      linear-gradient(145deg, 
        #FFD700 0%, 
        #FDB931 15%, 
        #FFD700 30%, 
        #FDB931 45%,
        #FFD700 60%,
        #FDB931 75%,
        #FFD700 90%,
        #FDB931 100%
      )
    `,
    boxShadow: `
      0 8px 24px rgba(0, 0, 0, 0.15),
      inset 0 2px 6px rgba(255, 255, 255, 0.8),
      inset 0 -2px 6px rgba(139, 104, 0, 0.3)
    `,
    '& .InfoLabel': {
      backgroundColor: 'rgba(139, 104, 0, 0.2)',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      color: '#8B6B00',
      textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
      '& .MuiSvgIcon-root': {
        color: '#8B6B00'
      }
    },
    '&::before': {
      opacity: 1,
      animation: 'shimmer 24s ease-in-out infinite',
      animationDelay: 'calc(Math.random() * -24s)',
      background: `
        linear-gradient(
          135deg,
          transparent 0%,
          transparent 35%,
          rgba(255, 255, 255, 0.4) 45%,
          rgba(255, 255, 255, 0.7) 50%,
          rgba(255, 255, 255, 0.4) 55%,
          transparent 65%,
          transparent 100%
        )
      `,
      filter: 'blur(2px)',
      transform: 'translateX(-200%) translateY(-200%) rotate(-45deg)',
      width: '250%',
      height: '500%'
    },
    '&::after': {
      opacity: 1,
      background: `
        radial-gradient(circle at 50% 0%,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(255, 215, 0, 0.2) 40%,
          rgba(255, 215, 0, 0.1) 60%,
          rgba(255, 215, 0, 0.05) 80%,
          transparent 100%
        )
      `,
      filter: 'blur(2px)',
      mixBlendMode: 'soft-light'
    },
    '& .sparkles': {
      animation: 'sparklesBurst 1s ease-out forwards'
    },
    '& .MuiCardMedia-root': {
      filter: 'contrast(0.9) opacity(0.3)',
      borderRadius: '12px',
      mixBlendMode: 'multiply',
      '&::after': {
        opacity: 0.7
      }
    },
    '& .MuiCardContent-root': {
      background: 'none',
      backdropFilter: 'none',
      '& .MuiTypography-h6': {
        color: '#8B6B00',
        textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)'
      },
      '& .MuiTypography-body2': {
        color: '#9E7B00',
        textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)'
      }
    }
  },
  '@keyframes shimmer': {
    '0%': {
      transform: 'translateX(-200%) translateY(-200%) rotate(-45deg)',
      opacity: 0
    },
    '2%': {
      opacity: 1
    },
    '8%': {
      transform: 'translateX(200%) translateY(200%) rotate(-45deg)',
      opacity: 0
    },
    '100%': {
      transform: 'translateX(200%) translateY(200%) rotate(-45deg)',
      opacity: 0
    }
  },
  '@keyframes sparklesBurst': {
    '0%': {
      opacity: 1,
      transform: 'scale(0)'
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1)'
    },
    '100%': {
      opacity: 0,
      transform: 'scale(1.5)'
    }
  },
  '& .sparkles': {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 6,
    opacity: 0,
    background: `
      radial-gradient(circle at 20% 20%, white 0%, transparent 3%),
      radial-gradient(circle at 80% 20%, white 0%, transparent 3%),
      radial-gradient(circle at 50% 30%, white 0%, transparent 4%),
      radial-gradient(circle at 30% 50%, white 0%, transparent 3%),
      radial-gradient(circle at 70% 50%, white 0%, transparent 3%),
      radial-gradient(circle at 20% 80%, white 0%, transparent 3%),
      radial-gradient(circle at 80% 80%, white 0%, transparent 3%),
      radial-gradient(circle at 50% 70%, white 0%, transparent 4%)
    `
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
    transition: 'all 0.3s ease-in-out',
    transform: 'translateY(0)',
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
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          },
          '&.MuiChip-filled': {
            backgroundColor: 'white',
            color: '#1b5e20',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)'
            }
          },
          '&.MuiChip-outlined': {
            borderColor: 'rgba(255,255,255,0.3)',
            color: 'rgba(255,255,255,0.9)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.4)'
            }
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

function App() {
  const minSize = Math.floor(Math.min(...animalsData.animals.map(animal => animal.size)) * 0.8);
  const maxSize = Math.ceil(Math.max(...animalsData.animals.map(animal => animal.size)) * 1.2);
  
  const [animals, setAnimals] = useState(animalsData.animals);
  const [filters, setFilters] = useState({
    type: [],
    color: []
  });
  const [sizeRange, setSizeRange] = useState([minSize, maxSize]);
  const [spottedAnimals, setSpottedAnimals] = useState(() => {
    const saved = localStorage.getItem('spottedAnimals');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState(0);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    localStorage.setItem('spottedAnimals', JSON.stringify(spottedAnimals));
  }, [spottedAnimals]);

  const handleSpottedToggle = (id) => {
    setSpottedAnimals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  useEffect(() => {
    const filteredAnimals = animalsData.animals.filter(animal => {
      if (activeTab === 1 && !spottedAnimals[animal.id]) {
        return false;
      }

      const typeColorMatch = Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        if (Array.isArray(animal[key])) {
          return values.some(value => animal[key].includes(value));
        }
        return values.includes(animal[key]);
      });

      const sizeMargin = animal.size * 0.2;
      const minSizeWithMargin = animal.size - sizeMargin;
      const maxSizeWithMargin = animal.size + sizeMargin;
      
      const sizeMatch = 
        (minSizeWithMargin <= sizeRange[1]) && 
        (maxSizeWithMargin >= sizeRange[0]);

      return typeColorMatch && sizeMatch;
    });
    setAnimals(filteredAnimals);
  }, [filters, sizeRange, activeTab, spottedAnimals]);

  const handleImageError = (e) => {
    e.target.src = '/images/animal-placeholder.jpg';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth="lg" 
        sx={{
          px: { xs: 0, sm: 3 }
        }}
      >
        <Box sx={{ 
          mt: 0,
          mb: 4
        }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: 2,
              px: { xs: 2, sm: 4 },
              pt: 2,
              background: 'linear-gradient(180deg, rgba(46,125,50,0.12) 0%, rgba(46,125,50,0) 100%)',
              borderRadius: { xs: 0, sm: '16px' }
            }}
          >
            <img 
              src="/images/pocketspot-logo.png" 
              alt="PocketSpot Logo" 
              style={{
                height: '120px',
                width: 'auto',
                marginTop: '12px'
              }}
            />
            <Box sx={{ mt: 4, pb: 2 }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 0.25,
                  letterSpacing: '0.5px',
                  fontSize: { xs: '2rem', sm: '2.5rem' }
                }}
              >
                PocketSpot
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  letterSpacing: '0.5px',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                by Benjamin Murck
              </Typography>
            </Box>
          </Box>

          <Box sx={{ px: { xs: 2, sm: 0 } }}>
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              mb: 2.5
            }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>Alle dieren</span>
                      <Chip 
                        label={animalsData.animals.length} 
                        size="small" 
                        color={activeTab === 0 ? "primary" : "default"}
                      />
                    </Box>
                  } 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>Gespot</span>
                      <Chip 
                        label={Object.values(spottedAnimals).filter(Boolean).length} 
                        size="small"
                        color={activeTab === 1 ? "primary" : "default"}
                      />
                    </Box>
                  } 
                />
              </Tabs>
            </Box>
            
            <Paper 
              sx={{ 
                mb: 3,
                p: 2,
                backgroundColor: '#1b5e20',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                background: `linear-gradient(165deg, 
                  #2e7d32 0%, 
                  #1b5e20 100%)`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
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

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: 0.5
                }}>
                  <Button
                    variant="outlined"
                    startIcon={<ResetIcon />}
                    onClick={resetFilters}
                    size="small"
                    sx={{
                      borderRadius: '6px',
                      textTransform: 'none',
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderColor: 'rgba(255,255,255,0.3)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Reset filters
                  </Button>
                </Box>
              </Stack>
            </Paper>

            {animals.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  {activeTab === 1 ? 
                    "Je hebt nog geen dieren gespot die aan de filters voldoen." :
                    "Geen dieren gevonden die aan de filters voldoen."
                  }
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={1.5}>
                {animals.map(animal => (
                  <Grid item xs={6} sm={4} md={3} key={animal.id}>
                    <StyledCard className={spottedAnimals[animal.id] ? 'spotted' : ''}>
                      <div className="sparkles" />
                      <CardMedia
                        component="img"
                        image={animal.image}
                        alt={animal.name}
                        onError={handleImageError}
                        sx={{
                          height: '200px',
                          objectFit: 'cover',
                          backgroundColor: 'grey.100'
                        }}
                      />
                      <Box sx={{ 
                        position: 'absolute', 
                        top: theme.spacing(1), 
                        left: theme.spacing(1),
                        zIndex: 3
                      }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpottedToggle(animal.id);
                          }}
                          sx={{ 
                            color: 'white',
                            backgroundColor: spottedAnimals[animal.id] ? 'rgba(255, 215, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s ease-in-out',
                            padding: '6px',
                            border: '1px solid',
                            borderColor: spottedAnimals[animal.id] ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              backgroundColor: spottedAnimals[animal.id] ? 'rgba(255, 215, 0, 0.95)' : 'rgba(0, 0, 0, 0.6)',
                              transform: 'scale(1.05)'
                            }
                          }}
                        >
                          <CameraIcon 
                            sx={{
                              fontSize: '1.25rem'
                            }}
                          />
                        </IconButton>
                      </Box>
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
                                sx={{
                                  fontFamily: '"Inter", sans-serif',
                                  fontWeight: 500,
                                  letterSpacing: '0.5px',
                                  fontSize: '0.9rem',
                                  mb: 0.25,
                                  lineHeight: 1.2,
                                  textShadow: '0 1px 1px rgba(0,0,0,0.2)'
                                }}
                              >
                                {animal.name}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                noWrap
                                sx={{
                                  fontFamily: '"Playfair Display", serif',
                                  fontStyle: 'italic',
                                  fontSize: '0.75rem',
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  letterSpacing: '0.5px',
                                  lineHeight: 1.2,
                                  textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                  fontWeight: 300
                                }}
                              >
                                {animal.scientificName}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 