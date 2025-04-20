export interface Money {
	currencyCode: string;
	value: string;
	valueInBaseUnits: number;
}

export interface HoldInfo {
	amount: Money;
	foreignAmount: Money | null;
}

export interface RoundUp {
	amount: Money;
	boostPortion: number | null;
}

export interface CardPurchaseMethod {
	method: string;
	cardNumberSuffix: string;
}

export interface TransactionAttributes {
	status: string;
	rawText: string;
	description: string;
	message: string | null;
	isCategorizable: boolean;
	holdInfo: HoldInfo;
	roundUp: RoundUp | null;
	cashback: unknown | null;
	amount: Money;
	foreignAmount: Money | null;
	cardPurchaseMethod: CardPurchaseMethod | null;
	settledAt: string;
	createdAt: string;
	transactionType: string | null;
	note: string | null;
}

export interface Transaction {
	type: "transactions";
	id: string;
	attributes: TransactionAttributes;
	links: {
		self: string;
	};
}
