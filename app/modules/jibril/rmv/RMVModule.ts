import {ShuviModule} from "../../base/ShuviModule";
import SearchCluster, {Source} from "../../../model/searchcluster/SearchCluster";
import Shibi from "../../../model/shibi/Shibi";
import axios from "axios";

export class RMVModule extends ShuviModule {
    source: Source = Source.RMV;

    obtainShibiData(
        search: SearchCluster,
        timeout: number,
        API_URL: string
    ): Promise<Shibi | null> {
        return axios.get(API_URL + "rmv.shibi",
            {
                timeout: timeout,
                params: {
                    latFrom: search.from.latitude,
                    lonFrom: search.from.longitude,
                    latTo: search.to.latitude,
                    lonTo: search.to.longitude,
                    date: new Date(search.date).toISOString()
                }
            }).then((result => {
            try {
                if (typeof result.data != "string") {
                    return result.data as Shibi;
                } else {
                    return null;
                }
            } catch (e) {
                return null;
            }
        })).catch((rejected) => {
            console.error("Error occurred on getRMVSearch: " + rejected);
            return null;
        });
    }
}
