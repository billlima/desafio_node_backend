import moment from "moment";
moment.locale('pt-br');

export class DateUtils {

    static toFormatDB(date: any = new Date()) {
        return moment(date).format();
    }
}