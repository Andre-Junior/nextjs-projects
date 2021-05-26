import { parseISO, format } from 'date-fns';


export default function Date({dateSting}) {
    const date = parseISO(dateSting)
    return <time dateTime={dateSting}>{format(date, 'LLLL d, yyyy')}</time>
}