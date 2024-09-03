import React from 'react';
import {
  Stepper,
  Step,
  StepIndicator,
  useSteps,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import SlideLayout from '../Shared/SlideLayout';

const steps = [
  { title: '01 - Alpha Charlie Echo ', description: '(Q1 2024)' },
  { title: '01 - Alpha Charlie Echo ', description: '(Q1 2024)' },
  { title: '01 - Alpha Charlie Echo ', description: '(Q1 2024)s' },
  { title: 'TBA ', description: '' },
];

function RoadmapSteps() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator></StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>
              <Text as='i' color='white'>
                {step.description}
              </Text>
            </StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

const Roadmap = () => {
  return (
    <SlideLayout>
      <Flex
        p={['30px 20px 0px 20px', '8vh 15vw']}
        align={'center'}
        justify={'center'}
        w='100vw'
        h={['fit-content', 'fit-content', 'fit-content', '100vh']}
      >
        <Flex
          direction={['column', 'column', 'column', 'row']}
          gap={'3%'}
          h='fit-content'
          w='fit-content'
        >
          <Text
            mb={['10vh', '10vh', '10vh', 0]}
            fontWeight={'normal'}
            fontSize={['sm', 'md']}
            w={['100%', '100%', '100%', '65%']}
          >
            As esteemed guests for HASHTANK&apos;s inaugural testing, you will
            receive SHELL Tokens to participate in the fish auction. Every fish
            boasts a range of stats influencing the ultimate sauce quality:
            Size, Umami, Fertility, and Radiation.
            <br style={{ marginTop: '3vh' }} />
            These characteristics are predominantly determined by the
            fish&apos;s species and mutations. In their capitalist wisdom,
            auctioneers will only provide subtle hints about each fish&apos;s
            species and the extent of its mutation. It falls upon you to assess
            the risks and rewards for an optimal bid. To assist you, we’ve
            listed some impending batches.
            <br style={{ marginTop: '3vh' }} />
            See you on the auction floor, collector.
          </Text>
          <Box mb={['10vh', 0]} w={['100%', '32%']}>
            <RoadmapSteps />
          </Box>
        </Flex>
      </Flex>
    </SlideLayout>
  );
};

export default Roadmap;
