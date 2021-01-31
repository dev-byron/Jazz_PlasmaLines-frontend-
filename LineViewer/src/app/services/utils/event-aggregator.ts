import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FeaturedSchedules } from "../../models/featured-schedules.model";

@Injectable()
export class EventAggregator {
    public featuredSchedules = new BehaviorSubject<FeaturedSchedules>(null);

    reset(): void {
        this.featuredSchedules.next(null);
    }
}