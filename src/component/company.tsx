import { Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react"
import { Component } from "react";
import MainBlock1 from "./mainBlock1";
import CompanyList from "./companyList";
import CompanyAdd from "./companyAdd";


export class Company extends Component<{}, {}>{

    render(){
        return (
            <MainBlock1 title="Компании">
                <Tabs>
                <TabList>
                    <Tab>Список компании</Tab>
                    <Tab>Добавить компанию</Tab>
                </TabList>
    
                <TabPanels>
                    <TabPanel>
                        <CompanyList/>
                    </TabPanel>
                    <TabPanel>
                        <CompanyAdd/>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </MainBlock1>
        )
    }

}

export default Company;