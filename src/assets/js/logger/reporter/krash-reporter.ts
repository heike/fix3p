import { LogReporter, LogReporterResponse, LogReporterOptions } from ".";
import Item from "../item";
import axios from "axios";

const KRASH_REPORT_URL = "https://krash.brigh.id/report";

export default class KrashReporter implements LogReporter {
    private version: string;

    constructor(options: LogReporterOptions) {
        this.version = options.version;
    }
    
    async report(log: Item[]): Promise<LogReporterResponse> {
        let xhrResponse = await axios.post(
            KRASH_REPORT_URL, 
            {
                repo: "fix3p",
                log,
                version: this.version,
            },
            {
                validateStatus: status => status === 200,
            }
        );
        
        let data = xhrResponse.data;
        if(!("id" in data) || !("htmlUrl" in data)) {
            throw new Error("Received invalid response from Krash.");
        }
        
        return {
            id: data.id,
            url: data.htmlUrl,
        };
    }
}