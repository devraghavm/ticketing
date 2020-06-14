import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@rmtickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
