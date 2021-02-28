
import { Event } from './event.model';

export interface Section {
    name: string,
    bannerUrl: string,
    advertisingUrl: string,
    events: Event[]
}