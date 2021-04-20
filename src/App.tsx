import React from 'react';
import './App.css';
import { ChakraProvider,
  Icon,
  Box,
  SimpleGrid,
  GridItem,
  Text,
  Center, Grid, HStack, Flex, Spacer, Heading, Button,  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton } from "@chakra-ui/react"
import theme from './theme';
import CSS from 'csstype';
import { Logo } from './util/icons'
import Search from './component/search';
import Company from './component/company';
import { FaSearchLocation, FaPuzzlePiece } from 'react-icons/fa';
import { IoIosPeople } from "react-icons/io";
import { MdWork, MdBuild, MdSearch } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import Branches from './component/branches';
import Vacancy from './component/vacancy';
import { RiDashboard3Fill  } from "react-icons/ri";
import { SettingsIcon,  HamburgerIcon } from '@chakra-ui/icons'

const boxStyle1:CSS.Properties = {
  background: "#f7f9fa"
}


const gridStyle2:CSS.Properties = {
  background: "#FFF",
  zIndex: 0
}

const textStyle2:CSS.Properties = {
  fontWeight: 800,
  fontSize: "22px"
}

const textStyle3:CSS.Properties = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#2a4365"
}

const textStyle4:CSS.Properties = {
  background: "#e0f3ff", 
  color: "#3f6ad8",
  cursor: "pointer"
}


const textStyle5:CSS.Properties = {
  cursor: "pointer"
}




function App() {

  const [id, setId] = React.useState<number>(1);

  const ChangeMainView = () => {
      
    switch(id){
      case 1:
        return <Search/>
      case 2:
        return <Company/>
      case 3: 
        return <Branches/>
      case 4:
        return <Vacancy/>
      default:
        break;
    }

    return <Search/>
  }



  return (
    
    <ChakraProvider theme={theme}>
      <Flex bg="#fff" boxShadow="base">
        <Box p="4">
          <HStack>
            <Logo/>
            <Text>Giro </Text>
          </HStack>
        </Box>
        <Spacer />
        <Box p="4">
          <Button leftIcon={<MdSearch />} colorScheme="gray" variant="outline" onClick={() => setId(1)} >Поиск</Button>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              ml={5}
            />
            <MenuList>
              <MenuItem icon={<IoIosPeople />} command="T">
                Табель
              </MenuItem>
              <MenuItem icon={<MdWork />} command="N" onClick={() => setId(4)}>
                Вакансии
              </MenuItem>
              <MenuItem icon={<CgOrganisation />} command="⌘⇧N" onClick={() => setId(2)}>
                Компании
              </MenuItem>
              <MenuItem icon={<FaPuzzlePiece />} command="⌘O" onClick={() => setId(3)}>
                Карта
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box>
        {ChangeMainView()}
      </Box>
    </ChakraProvider>
  );
}

export default App;
