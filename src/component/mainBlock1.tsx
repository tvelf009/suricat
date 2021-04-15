import { Box,
    Divider,
    Text,
    Center } from "@chakra-ui/react";
    import CSS from 'csstype';


const boxStyle2:CSS.Properties = {
    background: "#fff"
}
    

export const MainBlock1 = ({children, title}:{children:any, title:string}) => {

    return (
            <Box boxShadow="xl" m={5} style={boxStyle2} p={2}>
              <Box >
                <Text fontSize="xl">{title}</Text>
              </Box>
              <Divider mt={3} mb={3} />
                {children}
              <Divider mt={3} mb={3} />
              <Box>
                <Center>

                </Center>
              </Box>
              
            </Box>
    )
}

export default MainBlock1;