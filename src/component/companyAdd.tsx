import { Box, FormControl,
    FormLabel,
    Input, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { Component } from "react";
import API from '../util/api';
import ImageUploader from 'react-images-upload';
import { ResponceCompany } from "../util/interfaces";




export class CompanyAdd extends Component<{}, {}>{

    state = {
        pictures: [],
        isAdded: false
    }

    
    constructor(props:any) {
        super(props);
         this.state = { 
             pictures: [],
             isAdded: false
            };
         this.onDrop = this.onDrop.bind(this);
    }

    submitForm = async(event:React.FormEvent) => {
        event.preventDefault();
        const { company_name  } = event.target as any;
        let formData = new FormData();
        formData.append("image", this.state.pictures[0])

        const {data, status} = await API.imgUpload(formData);

        if(status === 200){
            let req:ResponceCompany = {
                company_logo: data.data.url,
                company_name: company_name.value
            }

            const {status} = await API.addCompany(req);
            if(status === 200){
                this.setState({
                    isAdded: true
                })
            }
        }
                
    }

    onDrop(picture:any) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

    }


    render(){

        return (
            
            <Box >
                 <form encType="multipart/form-data" onSubmit={this.submitForm}>
                    {
                        this.state.isAdded ? (
                            <Alert status="success">
                                <AlertIcon />
                                Data uploaded to the server. Fire on!
                            </Alert>
                        ):(
                            null
                        )
                    }
                    <FormControl id="company" isRequired>
                        <FormLabel>Название компании</FormLabel>
                        <Input name="company_name" placeholder="Пример: Globus" />
                    </FormControl>
                    <FormControl id="company" isRequired mt={5}>
                        <FormLabel>Логотип</FormLabel>
                         <ImageUploader
                            withIcon={true}
                            buttonText='Загрузите логотип'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            withPreview={true}
                            singleImage={true}
                     />

                    </FormControl>
                    <Button mt={5} colorScheme="blue" type="submit">
                        Добавить
                    </Button>
                 </form>
            </Box>
        )
    }

}

export default CompanyAdd;