import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthContext";


interface headerRoute {
    type: string,
    label: string,
    path: string
}

export const useHeaderRoutes = () => {
    const {isInRole, user} = useContext(AuthContext);
    const [headerRoutesArr, setHeaderRoutesArr] = useState(genHeaderRoutesArr());
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        setHeaderRoutesArr(genHeaderRoutesArr());
    }, [user]);


    //Metodo che definisce le voci dell'headers in base al ruolo dell'utente loggato
    function genHeaderRoutesArr() {

        const homeRoute = {type: "nav-link", label: "Home", path: "/tyb/home"};
        const welcomeRoute = {type: "nav-link", label: "Welcome", path: "/tyb"};
        const statisticheRoute = {type: "nav-link", label: "Statistiche", path: "/tyb/statistics"};
        const addQuiz = {type: "nav-link", label: "Aggiungi Quiz", path: "/tyb/add-quiz"};
        const addAdmin = {type: "nav-link", label: "Nomina Admin", path: "/tyb/add-admin"};

        const headerRoutesArrStudents: headerRoute[] = [homeRoute, statisticheRoute];
        //const headerRoutesArrProfessors: headerRoute[] = [homeRoute, statisticheRoute, addQuiz];
        const headerRoutesArrAdmin: headerRoute[] = [homeRoute, statisticheRoute,addQuiz, addAdmin];
        const initialRoutes: headerRoute[] = [welcomeRoute];



        if (isInRole("S")) {
            return headerRoutesArrStudents;
        }
        //else if (isInRole("P")) {
        //    return headerRoutesArrProfessors;
        //}
        else if (isInRole("A")) {
            return headerRoutesArrAdmin;
        } else {
            return initialRoutes;
        }
    }

    return [headerRoutesArr];
};
