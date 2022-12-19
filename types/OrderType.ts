import { ClientType } from './ClientType';
import { OrderItemsType } from './OrderItemType';
import { TableType } from './TableType';

export type OrderType = {
  id: string;
  date: Date;
  total_value: number;
  paid_value: number;
  is_closed: boolean,
  client_id: number,
  table_id: number,
  client: ClientType
  table: TableType
  orderItems: OrderItemsType[]
};
