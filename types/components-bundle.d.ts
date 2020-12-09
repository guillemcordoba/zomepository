import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { Constructor } from 'lit-element';
import { TemplateResult } from 'lit-html';
export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface ComponentDefinition {
    tag: string;
    component: Constructor<HTMLElement>;
}
export interface ComponentsBundle {
    components: Array<ComponentDefinition>;
    standalone: Array<StandaloneRenderer>;
    entryRenderers: Dictionary<EntryRenderer>;
    entryAttachments: Array<AttachmentRenderer>;
}
export declare type SetupComponents = (appWebsocket: AppWebsocket, cellId: CellId) => Promise<ComponentsBundle>;
export interface Renderer {
    name: string;
}
export interface StandaloneRenderer extends Renderer {
    render: () => TemplateResult;
}
export interface EntryRenderer extends Renderer {
    render: (entryHash: string) => TemplateResult;
}
export interface AttachmentRenderer extends Renderer {
    render: (entryHash: string) => TemplateResult;
}