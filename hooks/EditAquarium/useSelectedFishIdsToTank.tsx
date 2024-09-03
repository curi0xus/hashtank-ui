import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

// Set up tank contract config
// estimateAddToTank
// addToTank
// estimate removeFromTank
// removeFromTank
// getTankContents
// getAllTanks
// getDeployedTankId
// getTankMetadata

// TODO: Call for all the fish sent to tank via the event emitted in the smart contract for a particular tank id:
// UI for user to select the tank and smart contract to set the tank that is chosen
// Tank get be toggled to private and public which will hide or show contents of the tank
// Air drop basic tank gift in the redemption center which a link to a page explaining how the tank works
// Air drop basic tank to the user
// Have functionality to create more of other tanks -> ERC1155

export function calculateTotalRadiation(selectedFishIds: any) {
  return 100;
}

const useSelectedFishIdsToTank = () => {
  const [totalSize, setTotalSize] = useState(0);
  const toast = useToast();
  // Get tank contents from smart contract
  const addSelectedFish = (fishId: string) => {
    toast({
      title: `Call smart contract to add fish to tank`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const removeSelectedFish = (fishId: string) => {
    toast({
      title: `Call smart contract to remove fish from tank`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const totalRadiation = calculateTotalRadiation([]);

  return {
    selectedFishIds: [],
    addSelectedFish,
    removeSelectedFish,
    totalRadiation,
  };
};

export default useSelectedFishIdsToTank;
