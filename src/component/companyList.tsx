import { Text, Box, Divider, Image, IconButton, HStack, Center   } from "@chakra-ui/react"
import { Component } from "react";
import API from "../util/api";
import { ResponceCompany } from '../util/interfaces'
import { EditIcon } from '@chakra-ui/icons'

type Result = {
    data: ResponceCompany[],
    status: number
}

export class CompanyList extends Component<{}, Result>{

    readonly state = {
        status: 100,
        data: [{
            id: 0,
            company_name: "",
            company_logo: ""
        }]
    }

    async componentDidMount(){
        const {data, status}:{data:ResponceCompany[], status:number} = await API.getCompany();
        this.setState({
            data: data,
            status: status
        })
        console.log(this.state.data, status);        
    }
    
    render(){
        return (
            <Box>
                {
                    this.state.status === 200 ? (
                        this.state.data.map((item, index) => (
                            <Box key={index} >
                                <HStack  p={5}>
                                    <Box h="60px" w="200px">
                                        <Center>
                                            <Image src={item.company_logo} alt="image" h="80px" />
                                        </Center>
                                    </Box>
                                    <Box h="60px" w="200px">
                                        <Center>
                                            <Text mt={5}> {item.company_name} </Text>
                                        </Center>                                            
                                    </Box>
                                    <Box h="60px" w="200px" pt={3}>
                                        <Center>
                                        <IconButton
                                        colorScheme="blue"
                                        aria-label="Search database"
                                        icon={<EditIcon/>}
                                        />
                                        </Center>
                                    </Box>
                                </HStack>
                                <Divider/>
                            </Box>

                        ))
                    ):(
                        <Text>
                            Загрузка данных
                        </Text>
                    )

                }
            </Box>
        )
    }

}

export default CompanyList;