import userManager from "./userManager";
import {validateAll, validateUserProfile} from '@foerderfunke/matching-engine';
import { convertUserProfileToTurtle } from "@foerderfunke/matching-engine/src/profile-conversion";
import { extractDatafieldsMetadata, extractRequirementProfilesMetadata } from '@foerderfunke/matching-engine/src/extract-metadata';
import resourceService from "../services/resourceService";

const validationManager = {
    async runValidation(userId, language = "en") {

        let start = performance.now();

        // Get the active user profile
        const userProfile = userManager.retrieveUserData(userId);

        let start2 = performance.now();
        const userProfileString = await convertUserProfileToTurtle(userProfile);
        let end2 = performance.now();
        console.log(`Time elapsed in validationManager for convertUserProfileToTurtle(): ${end2 - start2} ms`);

        // load validation config
        const validationConfig = await resourceService.fetchResource('assets/data/requirement-profiles/requirement-profiles.json');

        // validate user profile against datafields
        const dataFieldsString = await resourceService.fetchResource(validationConfig['datafields']);
        if (!(await validateUserProfile(userProfileString, dataFieldsString))) {
            console.error('Invalid user profile');
        }

        // load materialization scripts
        const materializationString = await resourceService.fetchResource(validationConfig['materialization']);

        // collect requirement profiles
        let requirementProfiles = {};
        for (const requirementProfile of validationConfig['queries']) {
            const {fileUrl, rpUri} = requirementProfile;
            requirementProfiles[rpUri] = await resourceService.fetchResource(fileUrl);
        }

        let end = performance.now();
        console.log(`Time elapsed in validationManager before validateAll(): ${end - start} ms`);

        start = performance.now();

        let validateAllReport = await validateAll(
            userProfileString,
            requirementProfiles,
            dataFieldsString,
            materializationString,
            false
        );

        end = performance.now();
        console.log(`Time it took in validationManager for validateAll(): ${end - start} ms`);

        // fetch metadata
        let metadata = {
            df: await extractDatafieldsMetadata(dataFieldsString, language),
            rp: await extractRequirementProfilesMetadata(Object.values(requirementProfiles), language),
        };

        return [validateAllReport, metadata];
    }
}

export default validationManager;

