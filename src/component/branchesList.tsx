import { Text, Box, Divider, IconButton, HStack, Center   } from "@chakra-ui/react"
import { Component } from "react";
import API from "../util/api";
import { ResponceBranches } from '../util/interfaces'
import { EditIcon } from '@chakra-ui/icons'

type Result = {
    data: ResponceBranches[],
    status: number
}

export class BranchesList extends Component<{}, Result>{

    readonly state = {
        status: 100,
        data: [{
            id: 0,
            address: "",
            id_company: 0,
            lat: 0,
            lon: 0
        }]
    }

    async componentDidMount(){
        const {data, status}:{data:ResponceBranches[], status:number} = await API.getBranches();
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
                                            
                                        </Center>
                                    </Box>
                                    <Box h="60px" w="200px">
                                        <Center>
                                            <Text mt={5}> {item.address} </Text>
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

export default BranchesList;