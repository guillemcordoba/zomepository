export async function installDna(adminWebsocket, compositoryService, dnaHash) {
    const template = await compositoryService.getTemplateForDna(dnaHash);
    // TODO
    return [[], []];
}
//# sourceMappingURL=install-dna.js.map