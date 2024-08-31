import { TableColumnType } from "antd";

export type TableAntProps<T> = {
    columns: TableColumnType<T>[];
    dataSource: T[];
    currentPage: number,
    total: number;
    handlePageChange: (page: number) => void;
};
