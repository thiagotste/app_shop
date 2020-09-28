import moment from 'moment';
import 'moment/locale/pt-br';

class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        moment.locale('pt-br');
        return moment(this.date).format('lll');
    }
};

export default Order;