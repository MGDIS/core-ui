import 'jest';
declare global {
  namespace NodeJS {
    interface Global {}
    interface InspectOptions {}

    interface ConsoleConstructor extends console.ConsoleConstructor {}
  }
}
