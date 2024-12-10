export class Logger {
  static debug(message: string) {
    console.debug(`🐛 ${message}`);
  }

  static info(message: string) {
    console.info(`ℹ️ ${message}`);
  }

  static warn(message: string) {
    console.warn(`⚠️ ${message}`);
  }

  static error(message: string) {
    console.error(`❌ ${message}`);
  }
}
