import { serializeHash } from '@holochain-open-dev/common';
import { importModuleFromFile } from './import-module-from-file';
export async function fetchRenderersForZome(compositoryService, cellId, zomeIndex) {
    const dnaHash = serializeHash(cellId[0]);
    const template = await compositoryService.getTemplateForDna(dnaHash);
    const zomeDefHash = template.dnaTemplate.zome_defs[zomeIndex].zome_def_hash;
    return internalFetchRenderersForZome(compositoryService, cellId, zomeDefHash);
}
export async function fetchRenderersForAllZomes(compositoryService, cellId) {
    const dnaHash = serializeHash(cellId[0]);
    const template = await compositoryService.getTemplateForDna(dnaHash);
    const promises = template.dnaTemplate.zome_defs.map(zome_def => internalFetchRenderersForZome(compositoryService, cellId, zome_def.zome_def_hash));
    return await Promise.all(promises);
}
async function internalFetchRenderersForZome(compositoryService, cellId, zomeDefHash) {
    // Fetch the appropriate elements bundle for this zome
    const zomeDef = await compositoryService.getZomeDef(zomeDefHash);
    if (!zomeDef.components_bundle_file)
        throw new Error('This zome does not have any elements bundle file');
    const file = await compositoryService.downloadFile(zomeDef.components_bundle_file);
    const module = await importModuleFromFile(file);
    const renderers = await module.default(compositoryService.appWebsocket, cellId);
    return {
        renderers,
        def: zomeDef,
    };
}
//# sourceMappingURL=fetch-renderers.js.map