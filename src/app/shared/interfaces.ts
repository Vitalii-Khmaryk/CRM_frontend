export interface IUser {
    email: string,
    password: string;
}
export interface ICategory {
    name: string,
    imageSrc?: string,
    user?: string,
    _id: string;
}
export interface IMessage {
    message: string;
}
export interface IPosition {
    name: string,
    cost: number,
    user?: string,
    category: string,
    _id?: string,
    quantity?: number;
}

export interface IOrder {
    date?: Date,
    order?: number,
    user?: string,
    list: IOrderPosition[],
    _id?: string;
}
export interface IOrderPosition {
    name: string,
    cost: number,
    quantity: number | any,
    _id?: string | undefined;
}

export interface IFilter {
    start?: Date,
    end?: Date,
    order?: number;
}

export interface OverviewPage {
    orders: OverviewPageItem,
    gain: OverviewPageItem;
}
export interface OverviewPageItem {
    percent: number,
    compare: number,
    yesterday: number,
    isHigher: boolean;
}

export interface AnalyticsPage{
average:number,
chart:AnalyticsChartItem[]
}
export interface AnalyticsChartItem{
    gain:number,
    order:number,
    label:string,
}