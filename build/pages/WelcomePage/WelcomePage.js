import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './WelcomePage.scss';
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (_jsx("div", Object.assign({ className: "welcome-container" }, { children: _jsxs("main", Object.assign({ className: "welcome-main" }, { children: [_jsx("h2", { children: "Benvenuto su TrainYourBrain" }), _jsx("p", { children: "Le app di quiz stanno rivoluzionando il modo in cui le giovani menti acquisiscono e assimilano il sapere. Unisciti a noi per esplorare una vasta gamma di quiz che stimolano il pensiero critico e migliorano le capacita' di apprendimento attraverso sfide continuative e analisi approfondite delle performance." }), _jsxs("div", Object.assign({ className: "feature-description" }, { children: [_jsx("h3", { children: "Esplora Quiz" }), _jsx("p", { children: "Scopri nuovi quiz ogni giorno, creati per migliorare le tue conoscenze in modo divertente e coinvolgente." })] })), _jsxs("div", Object.assign({ className: "feature-description" }, { children: [_jsx("h3", { children: "Monitora il Progresso" }), _jsx("p", { children: "Visualizza statistiche dettagliate per tracciare i tuoi miglioramenti e le competenze acquisite nel tempo." })] })), _jsxs("div", Object.assign({ className: "feature-description" }, { children: [_jsx("h3", { children: "Condividi i Risultati" }), _jsx("p", { children: "Condividi i tuoi successi e avanzamenti con amici e insegnanti, promuovendo un apprendimento collaborativo." })] })), _jsx("div", Object.assign({ className: "navigation-link" }, { children: _jsxs("h3", { children: ["Vuoi iniziare subito? Accedi o registrati ", _jsx("span", Object.assign({ className: "link", onClick: () => handleNavigation("/login") }, { children: "qui" })), "."] }) }))] })) })));
};
export default WelcomePage;
