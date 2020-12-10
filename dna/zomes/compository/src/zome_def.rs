use hc_utils::WrappedEntryHash;
use hdk3::prelude::*;
use holo_hash::WasmHash;

use crate::utils;

#[hdk_entry(id = "zome")]
pub struct ZomeDef {
    wasm_file: WrappedEntryHash,
    components_bundle_file: Option<WrappedEntryHash>,
    wasm_hash: WasmHash,
    entry_defs: Vec<String>,
    required_properties: Vec<String>, // TODO: change to map, with property types
    required_membrane_proof: bool,
}

#[hdk_extern]
pub fn publish_zome(zome: ZomeDef) -> ExternResult<WrappedEntryHash> {
    create_entry(&zome)?;

    let zome_hash = hash_entry(&zome)?;

    Ok(WrappedEntryHash(zome_hash))
}

#[hdk_extern]
pub fn get_zome_def(zome_def_hash: WrappedEntryHash) -> ExternResult<ZomeDef> {
    let zome_def = utils::try_get_and_convert(zome_def_hash.0)?;

    Ok(zome_def)
}