import { Text, Box, Divider, Image, HStack, Center, Stack, Button, useDisclosure,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,   } from "@chakra-ui/react"
import { Component, ReactElement, useEffect, useState } from "react";
import API from "../util/api";
import { ResponceCompany } from '../util/interfaces'
import { DeleteIcon } from '@chakra-ui/icons'
import { AiOutlineFileAdd } from "react-icons/ai";
import CSS from 'csstype';
import BranchesAdd from "./branchesAdd";
import { BiNetworkChart, BiMapAlt } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import BranchesMap from "./branchesMap";
import VacancyAdd from "./vacancyAdd";

type Result = {
    data: ResponceCompany[],
    status: number
}

const textStyle1:CSS.Properties = {
    fontSize: "22px",
    fontWeight: 600
}

function ModalWindow({company_id, company_name, type, title}:{company_id:number, company_name:string, type:string, title:string}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [headerText, setHeaderText] = useState<string>();
    const [icon, setIcon] = useState<ReactElement>(<AiOutlineFileAdd/>);

    useEffect(() => {
        switch(type){
            case "addBranches":                
                setHeaderText(`Добавить филиалы в "${company_name}"`);
                break
            case "showOnMap":
                setHeaderText(`Показаны все филиалы "${company_name}"`);
                setIcon(<BiMapAlt/>)
                break
            case "addVacancy":
                setHeaderText(`Добавить вакансию в "${company_name}"`);
                setIcon(<IoPersonAdd/>)
                break
            default:
                break
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ShowModule = () => {
        switch(type){
            case "addBranches":                
                return <BranchesAdd company_id={company_id} />
            case "showOnMap":
                return <BranchesMap company_id={company_id}/>
            case "addVacancy":
                return <VacancyAdd company_id={company_id}/>
            default:
                return null;
        }
    }

    return (
      <>
        <Button leftIcon={icon} colorScheme="gray" variant="outline" onClick={onOpen}>
            {title}
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{headerText}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <ShowModule/>
            </ModalBody>
              <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Отмена
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
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
                                    <Box h="60px" w="400px">
                                        <Text style={textStyle1} mt={5} ml={8}> {item.company_name} </Text>
                                    </Box>
                                    <Box h="60px" w="750px" pt={3}>
                                        <Stack direction="row" spacing={4}>
                                            <ModalWindow company_id={item.id} company_name={item.company_name} type={"addBranches"} title={"Добавить"}/>
                                            <ModalWindow company_id={item.id} company_name={item.company_name} type={"showOnMap"} title={"Карта"}/>
                                            <Button leftIcon={<BiNetworkChart />} colorScheme="gray" variant="outline">
                                                Список филиалов
                                            </Button>
                                            <ModalWindow company_id={item.id} company_name={item.company_name} type={"addVacancy"} title={"Добавить вакансию"}/>
                                            <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="outline">
                                                удалить
                                            </Button>
                                        </Stack>
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