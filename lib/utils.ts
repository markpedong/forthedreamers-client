import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const dateTimeFormatter = (date: number, format = 'MM-DD-YYYY') => dayjs(date).format(format)