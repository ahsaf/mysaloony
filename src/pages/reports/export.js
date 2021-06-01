import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Moment from 'moment';
import { Get_date } from 'mycomponent/general';
//home pricce  slot
export const export_xls = (s) => {
    let date = new Date();

    let file = [
        [],
        ["Booking Report"],
        [],
        ['Generated Date', Moment(date).format('DD MMM YYYY')],
        ["Date From",Moment(s.from).format('DD MMM YYYY')],
        ["Date To",Moment(s.to).format('DD MMM YYYY')],
        [],
        [],
        ['SL', 'Customer Name', 'Contact Number', 'Booking Time', 'Saloon', 'Saloon Contact',"Total Price","Time slot" ,"Place",'Status']

    ]
    s.data.map((itd, i) => {
        let it = itd.data();
        file.push([i + 1, it.user_name, it.user_contact, Get_date(it.booking_time.toDate(),'DD/MM/YYYY HH:MM'), it.saloon_name, it.saloon_contact,it.total_price,it.slot,it.atHome?'Home':"Shop" , it.status])
    });
    

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(file);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'MySalonyBookingReport' + fileExtension);

}