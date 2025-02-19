const userService  = {
    updateOrAddField(data, value, dataField, entityData) {
        if (data['@id'] === entityData.id && data['@type'] === entityData.type) {
            data[dataField] = value;
            return true;
        }

        if (data['@id'] === entityData.parentId && data['@type'] === entityData.parentType) {
            if (Array.isArray(data[entityData.parentDatafield])) {
                for (let item of data[entityData.parentDatafield]) {
                    if (userService.updateOrAddField(item, value, dataField, entityData)) {
                        return true;
                    }
                }
            } else {
                data[entityData.parentDatafield] = [];
            }
            const newChild = {
                '@id': entityData.id,
                '@type': entityData.type,
                [dataField]: value,
            };
            data[entityData.parentDatafield].push(newChild);
            return true;
        }

        for (const key in data) {
            if (Array.isArray(data[key])) {
                for (let item of data[key]) {
                    if (userService.updateOrAddField(item, value, dataField, entityData)) {
                        return true;
                    }
                }
            }
        }

        return false;
    },

    removeObjectFromFieldAux(data, objectId, datafield, entityData) {
        if (data['@id'] === entityData.id && data['@type'] === entityData.type) {
            if (Array.isArray(data[datafield])) {
                data[datafield] = data[datafield].filter(child => child['@id'] !== objectId);
                return true;
            }
            return false;
        }

        if (data['@id'] === entityData.parentId && data['@type'] === entityData.parentType) {
            if (Array.isArray(data[entityData.parentDatafield])) {
                for (let item of data[entityData.parentDatafield]) {
                    if (userService.removeObjectFromFieldAux(item, objectId, datafield, entityData)) {
                        return true;
                    }
                }
            }
            return false;
        }

        for (const key in data) {
            if (Array.isArray(data[key])) {
                for (let item of data[key]) {
                    if (userService.removeObjectFromFieldAux(item, objectId, datafield, entityData)) {
                        return true;
                    }
                }
            }
        }

        return false;
    },

    retrieveField(data, dataField, entityData) {
        if (data['@id'] === entityData.id && data['@type'] === entityData.type) {
            if (data.hasOwnProperty(dataField)) {
                return data[dataField];
            }
        }

        for (const key in data) {
            if (Array.isArray(data[key])) {
                for (let item of data[key]) {
                    const result = userService.retrieveField(item, dataField, entityData);
                    if (result !== null && result !== undefined) {
                        return result;
                    }
                }
            }
        }

        return null;
    },
}

export default userService;
