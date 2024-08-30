import {useEffect, useState} from "react";
import {RuleType, transformRulesFromRequirementProfile} from "@foerderfunke/matching-engine/src/prematch";
import readJson from "../../../utilities/readJson";
import {fetchTurtleResource} from "../../../services/githubService";
import {useMetadataStore, useUserStore, useValidationReportStore} from "../../../storage/zustand";
import {ValidationResult} from "@foerderfunke/matching-engine";
import {UserModel} from "../../../models/UserModel";
import dayjs from "dayjs";

const BenefitPageRules = ({benefitId}) => {
    const [loaded, setLoaded] = useState(false);
    const [rulesData, setRulesData] = useState({});
    const metadata = useMetadataStore((state) => state.metadata);
    const validationReport = useValidationReportStore((state) => state.validationReport);
    const [benefitReport, setBenefitReport] = useState({});
    const activeUser = useUserStore((state) => state.activeUserId);
    const userProfile = UserModel.retrieveUserData(activeUser);

    const expand = (uri) => {
        return uri.startsWith("ff:") ? "https://foerderfunke.org/default#" + uri.split(":")[1] : uri;
    }

    const getChoiceLabel = (value, dfObj) => {
        if (value === "true") return "yes";
        if (value === "false") return "no";
        return dfObj.choices.find(choice => expand(choice.value) === expand(value)).label;
    }

    const trim = (str) => {
        return str.substring(0, str.length - 2);
    }

    const buildSingleRuleOutput = (rulesObj, dfObj) => {
        let msg = "";
        switch(rulesObj.type) {
            case RuleType.EXISTENCE:
                return "Needs to exist";
            case RuleType.VALUE_IN:
                msg += "Must be " + (rulesObj.values.length === 1 ? "exactly: " : "one of: ");
                for (let value of rulesObj.values) {
                    msg += getChoiceLabel(value, dfObj) + ", ";
                }
                return trim(msg);
            case RuleType.VALUE_NOT_IN:
                msg += "Must not be " + (rulesObj.values.length === 1 ? "exactly: " : "one of: ");
                for (let value of rulesObj.values) {
                    msg += getChoiceLabel(value, dfObj) + ", ";
                }
                return trim(msg);
            case RuleType.OR:
                msg += "One or both of the following must be true: ";
                for (let element of rulesObj.elements) {
                    // this is pretty hardcoded for the very limited OR-cases we support for now, compare the respective code in matching-engine TODO
                    msg += metadata.df[element.path].label + ": " + getChoiceLabel(element.valueIn[0], null) + ", ";
                }
                return trim(msg);
            default:
                return "Unknown rule type";
        }
    }

    const buildSingleRuleReportOutput = (dfObj, isValid = false) => {
        if (isValid) {
            return ["green", "Valid"];
        }
        if (benefitReport.missingUserInput.find(missing => missing.dfUri === dfObj.uri)) {
            return ["gray", "Missing"];
        }
        if (benefitReport.violations.find(violation => violation.path === dfObj.uri)) {
            return ["red", "Invalid"];
        }
        return [];
    }

    const convertUserValueRaw = (raw, dfObj) => {
        if (Array.isArray(raw)) {
            return raw.map(r => getChoiceLabel(r, dfObj)).join(", ");
        }
        if (raw.startsWith("ff:")) {
            return getChoiceLabel(raw, dfObj);
        }
        if (dayjs(raw).isValid()) {
            return dayjs(raw).format("YYYY-MM-DD");
        }
        return raw;
    }

    const showUserValue = (dfObj) => {
        if (dfObj.datafield && userProfile[dfObj.datafield]) { // ff:pensionable and ff:age don't have it, they will also not show up in the profile as they are materialized on the fly
            let userValueRaw = userProfile[dfObj.datafield];
            return convertUserValueRaw(userValueRaw, dfObj);
        }
        return "-";
    }

    const buildRulesOutput = () => {
        const elements = [];
        for (let dfUri of Object.keys(rulesData)) {
            let rulesObj = rulesData[dfUri];
            let dfObj = metadata.df[dfUri];
            let td1 = <h3>{dfObj?.label ?? "Or-Rule"}</h3>;
            let td2 = <div>{buildSingleRuleOutput(rulesObj, dfObj)}</div>;
            let td3, td4;
            if (dfObj) { // for or-cases this is undefined
                dfObj.uri = dfUri;
                const [color, msg] = buildSingleRuleReportOutput(dfObj, benefitReport.result === ValidationResult.ELIGIBLE);
                td3 = <small>{showUserValue(dfObj)}</small>;
                td4 = <div style={{ color: color }}>{msg}</div>;
            }
            elements.push(
                <tr key={dfUri}>
                    <td style={{border: "1px solid black"}}>{td1}</td>
                    <td style={{border: "1px solid black"}}>{td2}</td>
                    <td style={{border: "1px solid black"}}>{td3 ?? "-"}</td>
                    <td style={{border: "1px solid black"}}>{td4 ?? "-"}</td>
                </tr>
            );
        }
        return elements
    }

    useEffect(() => {
        if (loaded) return;
        let rpUri = benefitId.startsWith("ff:") ? "https://foerderfunke.org/default#" + benefitId.split(":")[1] : benefitId;
        const fetchRulesData = async () => {
            const validationConfig = await readJson('assets/data/requirement-profiles/requirement-profiles.json');
            let query = validationConfig['queries'].find(query => query['rpUri'] === rpUri);
            let rpTurtleStr = await fetchTurtleResource(query.fileUrl);
            let results = await transformRulesFromRequirementProfile(rpTurtleStr);
            setRulesData(results.rulesByDf);
            setBenefitReport(validationReport.reports.find(report => report.rpUri === rpUri));
            setLoaded(true);
        };
        fetchRulesData();
    }, [benefitId, rulesData, metadata, loaded, validationReport]);

    return (
        <>
            {loaded &&
                <table style={{border: "1px solid black"}}>
                    <th style={{border: "1px solid black"}}>Data field</th>
                    <th style={{border: "1px solid black"}}>Rule</th>
                    <th style={{border: "1px solid black"}}>Your value</th>
                    <th style={{border: "1px solid black"}}>Validity</th>
                    {buildRulesOutput()}
                </table>
            }
        </>
    );
}

export default BenefitPageRules;
