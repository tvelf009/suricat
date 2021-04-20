import { Text, Box, Divider, Image, HStack, Center, Stack, Button, useDisclosure,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
    GridItem, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,  } from "@chakra-ui/react"
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
import { BsPeopleFill } from "react-icons/bs";




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
        {/* <Button leftIcon={icon} colorScheme="gray" variant="outline" onClick={onOpen}>
            {title}
        </Button> */}

        <MenuItem onClick={onOpen}>{title}</MenuItem>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior={"inside"} isCentered>
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
                            <>
                                <SimpleGrid columns={[2, null, 12]} mt={2} mb={2} key={index}>
                                    <GridItem colSpan={2}>
                                        <Image src={item.company_logo} alt="image" h="80px" />
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <Text style={textStyle1} mt={3} ml={8}> {item.company_name} </Text>
                                    </GridItem>
                                    <GridItem colSpan={7}>
                                        <Stack direction="row" spacing={4} mt={2}>
                                            <Menu>
                                                <MenuButton as={Button} leftIcon={<BiMapAlt />}  variant="outline" >
                                                    Филиалы
                                                </MenuButton>
                                                    <MenuList>
                                                        <MenuGroup title="Филиалы">
                                                            <ModalWindow company_id={item.id} company_name={item.company_name} type={"addBranches"} title={"Добавить"}/>
                                                            <ModalWindow company_id={item.id} company_name={item.company_name} type={"showOnMap"} title={"Карта"}/>
                                                        </MenuGroup>
                                                    </MenuList>
                                            </Menu>
                                            <Menu>
                                                <MenuButton as={Button} leftIcon={<BsPeopleFill />}  variant="outline" >
                                                    Вакансии
                                                </MenuButton>
                                                    <MenuList>
                                                        <MenuGroup title="Филиалы">
                                                            <ModalWindow company_id={item.id} company_name={item.company_name} type={"addVacancy"} title={"Добавить"}/>
                                                        </MenuGroup>
                                                    </MenuList>
                                            </Menu>
                                            <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="outline">
                                                удалить
                                            </Button>
                                        </Stack>
                                    </GridItem>
                                </SimpleGrid>
                                <Divider/>
                            </>
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