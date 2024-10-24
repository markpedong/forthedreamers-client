export const scaleSizeSm = { scale: 0.7 }

export const scaleSize = { scale: 0.9 }

export const scaleSizeBig = { scale: 1.1 }

export const STALE_TIME = 1000 * 60 * 10

export const addressTypes = [
	{
		label: '-',
		value: '0'
	},
	{
		label: 'Default Address',
		value: '1'
	},
	{
		label: 'Pickup Address',
		value: '2'
	},
	{
		label: 'Return Address',
		value: '3'
	}
]

export const PAYMENT_METHODS_VALUES = {
	COD: 1,
	CARD: 2
}

export const ORDER_STATUS = {
	0: 'Pending',
	1: 'Processing',
	2: 'In Transit',
	3: 'Delivered',
	4: 'Finished'
}

export const ORDER_METHODS = {
	1: 'COD'
}

export const NO_NAVBAR_PAGES = ['/login', '/checkout', '/forgot-password', '/signup']