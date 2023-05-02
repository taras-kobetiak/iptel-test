import { IvrEntity } from "./ivr-entity";

export class Ivr {
    id: number;
    name: string;
    description: string;
    announcement: string;
    timeout: number;
    invalidRetries: number;
    appendInvalidRetryRecording: boolean;
    appendAnnouncementToTimeout: boolean;
    timeoutRetries: number;
    timeoutRetryRecording: string;
    timeoutRecording: string;
    timeoutDestination: string;
    ivrEntityList: IvrEntity[];
}
