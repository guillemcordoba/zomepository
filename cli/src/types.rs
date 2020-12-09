use holo_hash::WasmHash;
use holochain_serialized_bytes::prelude::*;
use holochain_types::dna::wasm::DnaWasm;

#[derive(Debug, Clone)]
pub struct ZomeWithCode {
    pub components_bundle: Option<Vec<u8>>,
    pub wasm_code: DnaWasm,
    pub wasm_hash: WasmHash,
    pub entry_defs: Vec<String>, // Entry definition ID ordered by position in the zome
    pub required_properties: Vec<String>,
    pub required_membrane_proof: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, SerializedBytes)]
pub struct ZomeToPublish {
    pub wasm_file: String, // Hash of the uploaded file
    pub components_bundle: Option<String>,
    pub wasm_hash: WasmHash,
    pub entry_defs: Vec<String>, // Entry definition ID ordered by position in the zome
    pub required_properties: Vec<String>,
    pub required_membrane_proof: bool,
}

#[derive(Debug, Serialize, SerializedBytes, Deserialize, Clone)]
pub struct ZomeReference {
    pub name: String,
    pub zome_def_hash: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, SerializedBytes)]
pub struct DnaTemplate {
    pub name: String,
    pub zomes: Vec<ZomeReference>,
}

#[derive(Serialize, SerializedBytes, Deserialize, Clone)]
pub struct PublishInstantiatedDnaInput {
    pub dna_template_hash: String,
    pub instantiated_dna_hash: String,
    pub uuid: String,
    pub properties: SerializedBytes, // TODO: fix this
}
