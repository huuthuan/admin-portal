import notify from 'devextreme/ui/notify';

export class Notify {
  static getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static notifySuccess(message: string) {
    notify(message, 'success', 4000);
  }

  static notifyError(message: string = 'An error has occurred') {
    notify(message, 'error', 4000);
  }

  static notifyWarning(message: string) {
    notify(message, 'warning', 4000);
  }
}
