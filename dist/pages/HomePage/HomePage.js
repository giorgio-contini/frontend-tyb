import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
/**
 * Locals
 */
import "./HomePage.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import PageTitle from "../../components/PageTitle/PageTitle";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import { showDialogFailed } from "../../utils/DialogUtils";
/**
 *  ENUM_CARD_STATUS
 *  @description Enum object, set of cards status
 */
export var CardStatusEnum;
(function (CardStatusEnum) {
    CardStatusEnum["HIDDEN"] = "Hidden";
    CardStatusEnum["LOCKED"] = "Locked";
    CardStatusEnum["ACTIVE"] = "Active";
    CardStatusEnum["ERROR"] = "Error";
    CardStatusEnum["COMPLETED"] = "Completed";
    CardStatusEnum["WARNING"] = "Warning";
})(CardStatusEnum || (CardStatusEnum = {}));
const HomePage = () => {
    const navigate = useNavigate();
    const { isInRole } = useContext(AuthContext);
    const [topics, setTopics] = useState([]);
    const getQuizzes = () => {
        QuizClient.getQuizUsingGet("all").then((res) => {
            const data = res.data.result;
            const topicsFromDB = data.filter((value, index, self) => self.indexOf(value) === index);
            setTopics([...topicsFromDB]);
        }).catch((error) => {
            var _a;
            showDialogFailed((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data.error);
        });
    };
    useEffect(() => {
        getQuizzes();
    }, []);
    // Array di dati delle card
    const cardData = topics.map((el, index) => {
        return {
            status: el.isHidden ? CardStatusEnum.LOCKED : CardStatusEnum.ACTIVE,
            id: el.id || "",
            title: el.topic,
            description: el.topicDescription,
            image: el.imageFile,
            isHidden: el.isHidden || false,
            button1: {
                label: "Procedi",
                onClick: () => {
                    navigate("/quiz", {
                        replace: true,
                        state: {
                            topic: el.topic,
                            idQuiz: el.id
                        }
                    });
                }
            },
            onHidden: getQuizzes,
            onDelete: getQuizzes
        };
    });
    return _jsxs("div", { children: [_jsx(PageTitle, { title: "Homepage" }), _jsx("div", { className: "container p-2", children: _jsx("div", { className: "row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5 mt-3 ", children: cardData.filter((card) => ((isInRole("S") && !card.isHidden) || isInRole("A"))).map((card, index) => (_jsx("div", { className: "col", children: _jsx(CardComponent, { config: Object.assign(Object.assign({}, card), { key: card.id }) }) }, index))) }) })] });
};
export default HomePage;
