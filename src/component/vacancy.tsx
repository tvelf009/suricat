import { Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react"
import { Component } from "react";
import MainBlock1 from "./mainBlock1";
import CompanyList from "./companyList";
import CompanyAdd from "./companyAdd";
import VacancyList from "./vacancyList";


export class Vacancy extends Component<{}, {}>{

    render(){
        return (
            <MainBlock1 title="Вакансии">
                <Tabs>
                <TabList>
                    <Tab>Список вакансии</Tab>
                    <Tab>Добавить вакансию</Tab>
                </TabList>
    
                <TabPanels>
                    <TabPanel>
                        <VacancyList/>
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

export default Vacancy;