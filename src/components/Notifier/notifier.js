import * as notifier from 'node-notifier'

export default function notification(data) {
    console.log("Notification");
    notifier.notify(
        {
          title: 'Stock Tracker Note',
          message: `${data.tradingsymbol} is at ${data.position}ing position. @ ${data.target} . Now it's current Price ${data.ltp}`,
          sound: true, // Only Notification Center or Windows Toasters
          wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },
        function (err, response, metadata) {
          // Response is response from notification
          // Metadata contains activationType, activationAt, deliveredAt
        }
      );
      
      notifier.on('click', function (notifierObject, options, event) {
        // Triggers if `wait: true` and user clicks notification
      });
      
      notifier.on('timeout', function (notifierObject, options) {
        // Triggers if `wait: true` and notification closes
      });

  
}
