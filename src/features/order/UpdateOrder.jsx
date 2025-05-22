import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

const UpdateOrder = ({ order }) => {

    const fetcher = useFetcher()
    console.log(fetcher)
    return (
        <fetcher.Form method='PATCH' className='text-right'>
            <Button type='primary'>Önceliği Güncelle</Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

export const action = async ({ request, params }) => {
    const data = { priority: true }
    await updateOrder(params.orderId, data)
    return null
}