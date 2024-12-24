import { Logger, ILogs } from "./logger";

const logger = Logger.getInstance();

let a: number = 5;

console.log(logger.getLogs());

logger.log(`a = ${a}`);

console.log(logger.getLogs());

a += 10;

logger.log(`a = ${a}`);

console.log(logger.getLogs());