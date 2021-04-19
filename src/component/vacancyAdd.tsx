import { Box, FormControl,
    FormLabel,
    Button, Alert, AlertIcon, Select,   NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    Input, 
    NumberDecrementStepper, } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import API from '../util/api';
import { ResponceBranches, ResponceVacancy } from "../util/interfaces";

const position = [
    {
      id: 11,
      name: "Комплектовщик"
    },
    {
      id: 12,
      name: "Уборщик"
    },
    {
      id: 13,
      name: "Грузчик"
    },
    {
      id: 14,
      name: "Разнорабочие"
    },
    {
      id: 15,
      name: "Работник склада"
    },
    {
      id: 16,
      name: "Автокурьер"
    },
    {
      id: 17,
      name: "Велокурьер"
    },
    {
      id: 13,
      name: "Пеший курьер"
    }
  ]
  


const VacancyAdd = ({company_id}:{company_id:number}) => {

    const [isAdded, setIsAdded] = useState<Boolean>(false);
    // const [companys, setCompanys] = useState<ResponceCompany[]>();
    const [branches, setBranches] = useState<ResponceBranches[]>([{
        id: 0,
        address: "",
        id_company: company_id,
        lat: 0,
        lon: 0
    }]);


    

    useEffect(() => {
        const loadBranches = async() => {
            const {data} = await API.getCompanyBranches(company_id);
            setBranches(data);
        }
        loadBranches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitForm = async(event:React.FormEvent) => {
        event.preventDefault();
        const { id_position, id_branch, count   } = event.target as any;

        let req:ResponceVacancy = {
            id_position: id_position.options[id_position.selectedIndex].value,
            id_branch: id_branch.options[id_branch.selectedIndex].value,
            count: count.value
        }


        const {data, status} = await API.addVacancy(req);
        console.log(data,  status);
        


        if(status === 200){
            setIsAdded(true);
        }
                
    }

    return (
        
        <Box >
                <form encType="multipart/form-data" onSubmit={submitForm}>
                {
                    isAdded ? (
                        <Alert status="success">
                            <AlertIcon />
                            Data uploaded to the server. Fire on!
                        </Alert>
                    ):(
                        null
                    )
                }
                <FormControl isRequired>
                    <FormLabel>Тип вакансии</FormLabel>
                    <Select name="id_position" >
                        {
                            position.map((item, index) => (
                                <option value={item.id} key={index}>{item.name}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl isRequired mt={5}>
                    <FormLabel>Выберите филиал</FormLabel>
                    <Select name="id_branch" >
                        {
                            branches.map((item, index) => (
                                <option value={item.id} key={index}>{item.address}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl isRequired mt={5}>
                    <FormLabel>Количество </FormLabel>
                    <NumberInput>
                        <NumberInputField name="count"/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired mt={5}>
                    <FormLabel>Оплата </FormLabel>
                     <Input name="salary"/>
                </FormControl>
                <Button mt={5} colorScheme="blue" type="submit">
                    Добавить
                </Button>
                </form>
        </Box>
    )
    

}

export default VacancyAdd;