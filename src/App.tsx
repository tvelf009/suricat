import React from 'react';
import './App.css';
import { ChakraProvider,
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
  color: "#3f6adf"
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
              <GridItem colSpan={2}>
                <Center height="60px">
                <Logo/> 
                <Text style={textStyle2}>Kiro Admin</Text>
              </Center>
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem rowSpan={23} colSpan={2} style={gridStyle2}>
            <Box p={8}>
              <Text style={textStyle3} mt={2}>
                Инструменты
              </Text>
              <Box mt={2} ml={2} p={2} style={id === 1 ? textStyle4:textStyle5} onClick={() => setId(1)}>
                <HStack>
                  <FaSearchLocation/>
                  <Text  >  Поиск</Text>
                </HStack>
              </Box>
              
              <Box mt={2} ml={2} p={2} >
                <HStack>
                  <IoIosPeople/>
                  <Text>  Кандидаты</Text>
                </HStack>
              </Box>
              <Box mt={2} ml={2} p={2} >
                <HStack>
                  <MdWork/>
                  <Text>  Вакансии</Text>
                </HStack>
              </Box>
              <Text style={textStyle3} mt={2}>Администрирование</Text>
              <Box style={id === 2 ? textStyle4:textStyle5} onClick={() => setId(2)} p={2}   mt={1} ml={2} >
                <HStack>
                  <CgOrganisation/>
                  <Text>  Компании</Text>
                </HStack>
              </Box>
              <Box style={id === 3 ? textStyle4:textStyle5} onClick={() => setId(3)}  p={2}   mt={1} ml={2} >
                <HStack>
                  <FaPuzzlePiece/>
                  <Text>  Филиалы</Text>
                </HStack>
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={10} >
            <Box p={5} style={boxStyle1}>
              <Text fontSize="2xl">
                Панель поиска подходящей вакансии для соискателей
              </Text>
            </Box>
            {ChangeMainView()}
          </GridItem> 
        </Grid>

      
    </ChakraProvider>
  );
}

export default App;
