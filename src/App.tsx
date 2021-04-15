import React from 'react';
import './App.css';
import { ChakraProvider,
  Icon,
  Box,
  SimpleGrid,
  GridItem,
  Text,
  Center, Grid, HStack } from "@chakra-ui/react"
import theme from './theme';
import CSS from 'csstype';
import { Logo } from './util/icons'
import Search from './component/search';
import Company from './component/company';
import { FaSearchLocation, FaPuzzlePiece } from 'react-icons/fa';
import { IoIosPeople } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import Branches from './component/branches';
import Vacancy from './component/vacancy';
import { RiDashboard3Fill  } from "react-icons/ri";

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
        <Grid h="100vh" templateRows="repeat(24, 1fr)" templateColumns="repeat(12, 1fr)" >
          <GridItem rowSpan={1} colSpan={12}  bg="white" boxShadow="lg" style={{zIndex:5}}>
            <SimpleGrid columns={[2, null, 12]}>
              <GridItem colSpan={1}>
                <Center height="60px">
                <Logo/> 
                <Text style={textStyle2} ml={5}>Giro Admin</Text>
              </Center>
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem rowSpan={23} colSpan={1} style={gridStyle2}>
            <Box p={8}>
              <Text style={textStyle3} mt={2}>
                Инструменты
              </Text>
              <Box mt={2} ml={2} p={2} style={id === 1 ? textStyle4:textStyle5} onClick={() => setId(1)}>
                <HStack>
                  <Icon as={FaSearchLocation} h={6} w={6} color="blue.800"/>
                  <Text  > Поиск</Text>
                </HStack>
              </Box>
              
              <Box mt={2} ml={2} p={2} >
                <HStack>
                  <Icon as={IoIosPeople} h={6} w={6} color="blue.800"/>
                  <Text>  Кандидаты</Text>
                </HStack>
              </Box>
              <Box style={id === 4 ? textStyle4:textStyle5} onClick={() => setId(4)} mt={2} ml={2} p={2} >
                <HStack>
                  <Icon as={MdWork} h={6} w={6} color="blue.800" />
                  <Text>  Вакансии</Text>
                </HStack>
              </Box>
              <Text style={textStyle3} mt={2}>Администрирование</Text>
              <Box style={id === 2 ? textStyle4:textStyle5} onClick={() => setId(2)} p={2}   mt={1} ml={2} >
                <HStack>
                  <Icon as={CgOrganisation} h={6} w={6} color="blue.800"/>
                  <Text>  Компании</Text>
                </HStack>
              </Box>
              <Box style={id === 3 ? textStyle4:textStyle5} onClick={() => setId(3)}  p={2}   mt={1} ml={2} >
                <HStack>
                  <Icon as={FaPuzzlePiece} h={6} w={6} color="blue.800"/>
                  <Text>  Филиалы</Text>
                </HStack>
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={11} >
            <Box p={5} style={boxStyle1}>
              <HStack>
                <Icon as={RiDashboard3Fill} h={8} w={8} color="blue.600" />
                <Text fontSize="2xl" style={{fontWeight: 600}}>
                  Dashboard
                </Text>
              </HStack>

            </Box>
            {ChangeMainView()}
          </GridItem> 
        </Grid>

      
    </ChakraProvider>
  );
}

export default App;
